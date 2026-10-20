#!/usr/bin/env node

const assert = require('assert');
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    failed++;
    console.error(`FAIL ${name}: ${error.stack || error.message}`);
  }
}

function makeWorkspace() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'awesome-fail-closed-'));
  const bin = path.join(dir, 'bin');
  fs.mkdirSync(bin);
  const shim = path.join(bin, 'gh');
  fs.writeFileSync(shim, `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const scenario = process.env.GH_SHIM_SCENARIO || 'default';
const statePath = process.env.GH_SHIM_STATE;
const logPath = process.env.GH_SHIM_LOG;
let state = { count: 0 };
if (statePath && fs.existsSync(statePath)) state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
state.count += 1;
if (statePath) fs.writeFileSync(statePath, JSON.stringify(state));
if (logPath) fs.appendFileSync(logPath, JSON.stringify(args) + '\\n');
const count = state.count;
function fail(message) { process.stderr.write(message + '\\n'); process.exit(1); }
function repo() { return (args.find(arg => arg.startsWith('repos/')) || 'repos/unknown').slice(6); }
function okRepo(fullName = repo()) { process.stdout.write(JSON.stringify({ archived: false, disabled: false, full_name: fullName }) + '\\n'); }
function emptySearch() { process.stdout.write('[]\\n'); }
function hang() { setTimeout(() => process.exit(0), 60000); }
if (scenario === 'check-ok') okRepo();
else if (scenario === 'check-redirect') count === 1 ? okRepo('CanonicalOrg/canonical-repository') : okRepo();
else if (scenario === 'check-mixed') {
  if (count === 2) fail('HTTP 404: Not Found');
  if (count === 3) fail('HTTP 502: Bad Gateway');
  okRepo();
} else if (scenario === 'check-auth') fail('HTTP 401: Bad credentials');
else if (scenario === 'check-timeout') count === 1 ? hang() : okRepo();
else if (scenario === 'check-invalid') count === 1 ? process.stdout.write('{not-json}\\n') : okRepo();
else if (scenario === 'monitor-empty') emptySearch();
else if (scenario === 'monitor-mixed') count === 2 ? fail('HTTP 502: Bad Gateway') : emptySearch();
else if (scenario === 'monitor-auth') fail('HTTP 401: Bad credentials');
else if (scenario === 'monitor-timeout') count === 1 ? hang() : emptySearch();
else if (scenario === 'monitor-invalid') count === 1 ? process.stdout.write('{not-json}\\n') : emptySearch();
else emptySearch();
`);
  fs.chmodSync(shim, 0o755);
  return { dir, bin, statePath: path.join(dir, 'state.json'), logPath: path.join(dir, 'gh.log') };
}

function run(workspace, script, args = [], env = {}, timeout = 90000) {
  const result = spawnSync(process.execPath, [path.join(ROOT, script), ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout,
    env: {
      ...process.env,
      ...env,
      GH_SHIM_STATE: workspace.statePath,
      GH_SHIM_LOG: workspace.logPath,
      PATH: workspace.bin + path.delimiter + process.env.PATH,
    },
  });
  if (result.error) throw result.error;
  return result;
}

function withWorkspace(fn) {
  const workspace = makeWorkspace();
  try {
    fn(workspace);
  } finally {
    fs.rmSync(workspace.dir, { recursive: true, force: true });
  }
}

function reportAt(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function ghCalls(workspace) {
  return fs.existsSync(workspace.logPath) ? fs.readFileSync(workspace.logPath, 'utf8').trim() : '';
}

test('check-links accepts a fully verified catalog', () => withWorkspace(workspace => {
  const output = path.join(workspace.dir, 'issues.json');
  const result = run(workspace, 'scripts/check-links.js', [], { GH_SHIM_SCENARIO: 'check-ok', LINK_ISSUES_OUT: output });
  assert.strictEqual(result.status, 0, result.stderr);
  assert.deepStrictEqual(reportAt(output), []);
  assert.match(result.stdout, /0 failures, 0 warnings, 0 validation errors/);
}));

test('check-links keeps a canonical redirect nonfatal', () => withWorkspace(workspace => {
  const output = path.join(workspace.dir, 'issues.json');
  const result = run(workspace, 'scripts/check-links.js', [], { GH_SHIM_SCENARIO: 'check-redirect', LINK_ISSUES_OUT: output });
  assert.strictEqual(result.status, 0, result.stderr);
  const issues = reportAt(output);
  assert.strictEqual(issues.length, 1);
  assert.strictEqual(issues[0].status, 'redirected');
}));

test('check-links fails closed for mixed missing and transient results', () => withWorkspace(workspace => {
  const output = path.join(workspace.dir, 'issues.json');
  const result = run(workspace, 'scripts/check-links.js', [], { GH_SHIM_SCENARIO: 'check-mixed', LINK_ISSUES_OUT: output });
  assert.notStrictEqual(result.status, 0);
  const statuses = reportAt(output).map(issue => issue.status);
  assert.ok(statuses.includes('not_found'));
  assert.ok(statuses.includes('error'));
  assert.match(result.stdout, /validation errors/);
}));

test('check-links fails closed for authentication errors without calling them missing projects', () => withWorkspace(workspace => {
  const output = path.join(workspace.dir, 'issues.json');
  const result = run(workspace, 'scripts/check-links.js', [], { GH_SHIM_SCENARIO: 'check-auth', LINK_ISSUES_OUT: output });
  assert.notStrictEqual(result.status, 0);
  const issues = reportAt(output);
  assert.ok(issues.length > 0);
  assert.ok(issues.every(issue => issue.status === 'error'));
  assert.doesNotMatch(result.stdout, /NOT_FOUND/);
}));

test('check-links fails closed after a real child-process timeout', () => withWorkspace(workspace => {
  const output = path.join(workspace.dir, 'issues.json');
  const result = run(workspace, 'scripts/check-links.js', [], { GH_SHIM_SCENARIO: 'check-timeout', LINK_ISSUES_OUT: output }, 40000);
  assert.notStrictEqual(result.status, 0);
  assert.ok(reportAt(output).some(issue => issue.status === 'error'));
}));

test('check-links fails closed for an invalid GitHub payload', () => withWorkspace(workspace => {
  const output = path.join(workspace.dir, 'issues.json');
  const result = run(workspace, 'scripts/check-links.js', [], { GH_SHIM_SCENARIO: 'check-invalid', LINK_ISSUES_OUT: output });
  assert.notStrictEqual(result.status, 0);
  assert.ok(reportAt(output).some(issue => issue.status === 'error'));
}));

test('monitor writes a verified empty search result', () => withWorkspace(workspace => {
  const output = path.join(workspace.dir, 'monitor.json');
  const result = run(workspace, 'scripts/monitor-github.js', ['--output', output], { GH_SHIM_SCENARIO: 'monitor-empty' });
  assert.strictEqual(result.status, 0, result.stderr);
  const monitor = reportAt(output);
  assert.strictEqual(monitor.query_count, 8);
  assert.strictEqual(monitor.total_results, 0);
  assert.deepStrictEqual(monitor.items, []);
}));

for (const scenario of ['monitor-mixed', 'monitor-auth', 'monitor-timeout', 'monitor-invalid']) {
  test(`monitor preserves its previous snapshot on ${scenario.replace('monitor-', '')} failure`, () => withWorkspace(workspace => {
    const output = path.join(workspace.dir, 'monitor.json');
    const previous = '{"previous":true}\n';
    fs.writeFileSync(output, previous);
    const result = run(workspace, 'scripts/monitor-github.js', ['--output', output], { GH_SHIM_SCENARIO: scenario }, 70000);
    assert.notStrictEqual(result.status, 0);
    assert.strictEqual(fs.readFileSync(output, 'utf8'), previous);
    assert.match(result.stderr, /Previous output was not modified/);
  }));
}

test('cleanup issue sync refuses an incomplete report without invoking gh', () => withWorkspace(workspace => {
  const report = path.join(workspace.dir, 'issues.json');
  fs.writeFileSync(report, JSON.stringify([{ name: 'Example', repo: 'example/repo', status: 'error', error: 'HTTP 502: Bad Gateway' }]));
  const result = run(workspace, 'scripts/sync-link-cleanup-issue.js', [], { LINK_ISSUES_FILE: report, LINK_ISSUE_DRY_RUN: '1' });
  assert.notStrictEqual(result.status, 0);
  assert.strictEqual(ghCalls(workspace), '');
  assert.match(result.stderr, /refusing cleanup issue mutations/);
}));

test('cleanup issue sync rejects a missing completion report without invoking gh', () => withWorkspace(workspace => {
  const report = path.join(workspace.dir, 'missing.json');
  const result = run(workspace, 'scripts/sync-link-cleanup-issue.js', [], { LINK_ISSUES_FILE: report, LINK_ISSUE_DRY_RUN: '1' });
  assert.notStrictEqual(result.status, 0);
  assert.strictEqual(ghCalls(workspace), '');
}));

test('cleanup issue sync accepts a verified empty report', () => withWorkspace(workspace => {
  const report = path.join(workspace.dir, 'issues.json');
  fs.writeFileSync(report, '[]\n');
  const result = run(workspace, 'scripts/sync-link-cleanup-issue.js', [], { LINK_ISSUES_FILE: report, LINK_ISSUE_DRY_RUN: '1' });
  assert.strictEqual(result.status, 0, result.stderr);
}));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
