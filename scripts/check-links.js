#!/usr/bin/env node

/**
 * Check all GitHub repository links in projects.json for validity.
 * Reports broken links (404, redirected, or archived repos).
 *
 * Usage:
 *   node scripts/check-links.js
 *
 * Requires: gh CLI authenticated
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECTS_PATH = path.join(__dirname, '..', 'data', 'projects.json');

function checkRepo(repo) {
  try {
    const cmd = `gh api repos/${repo} --jq '{archived: .archived, disabled: .disabled, full_name: .full_name}'`;
    const result = JSON.parse(execSync(cmd, { encoding: 'utf-8', timeout: 15000 }));

    if (result.archived) return { status: 'archived', repo };
    if (result.disabled) return { status: 'disabled', repo };
    if (result.full_name !== repo) return { status: 'redirected', repo, target: result.full_name };
    return { status: 'ok', repo };
  } catch (e) {
    const msg = e.message || '';
    if (msg.includes('404') || msg.includes('Not Found')) {
      return { status: 'not_found', repo };
    }
    return { status: 'error', repo, error: msg.split('\n')[0] };
  }
}

function main() {
  if (!fs.existsSync(PROJECTS_PATH)) {
    console.error('data/projects.json not found');
    process.exit(1);
  }

  const projects = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf-8'));
  console.log(`Checking ${projects.length} repository links...\n`);

  const issues = [];
  let ok = 0;

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    process.stdout.write(`  [${i + 1}/${projects.length}] ${p.repo} ... `);

    const result = checkRepo(p.repo);

    if (result.status === 'ok') {
      console.log('OK');
      ok++;
    } else {
      console.log(result.status.toUpperCase());
      issues.push({ name: p.name, ...result });
    }
  }

  const FAIL_STATUSES = new Set(['not_found', 'archived', 'disabled']);
  const failures = issues.filter(i => FAIL_STATUSES.has(i.status));
  const warnings = issues.filter(i => !FAIL_STATUSES.has(i.status));

  console.log(`\nResults: ${ok} ok, ${failures.length} failures, ${warnings.length} warnings`);

  if (warnings.length > 0) {
    console.log('\nWarnings (non-fatal, please review when convenient):');
    for (const issue of warnings) {
      console.log(`  [${issue.status}] ${issue.name} (${issue.repo})`);
      if (issue.target) console.log(`    -> redirected to: ${issue.target}`);
    }
  }

  if (failures.length > 0) {
    console.log('\nFailures:');
    for (const issue of failures) {
      console.log(`  [${issue.status}] ${issue.name} (${issue.repo})`);
      if (issue.error) console.log(`    -> ${issue.error}`);
    }
    process.exit(1);
  }
}

main();
