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

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECTS_PATH = path.join(__dirname, '..', 'data', 'projects.json');
const FAIL_STATUSES = new Set(['not_found', 'archived', 'disabled']);

function errorMessage(error) {
  const stderr = error.stderr ? String(error.stderr).trim() : '';
  const message = stderr || String(error.message || 'Unknown GitHub API error').trim();
  return message.split('\n')[0];
}

function checkRepo(repo) {
  try {
    const output = execFileSync('gh', ['api', `repos/${repo}`, '--jq', '{archived: .archived, disabled: .disabled, full_name: .full_name}'], { encoding: 'utf-8', timeout: 15000 });
    const result = JSON.parse(output);

    if (
      !result ||
      typeof result !== 'object' ||
      typeof result.archived !== 'boolean' ||
      typeof result.disabled !== 'boolean' ||
      typeof result.full_name !== 'string' ||
      !/^[^/\s]+\/[^/\s]+$/.test(result.full_name)
    ) {
      return { status: 'error', repo, error: 'Invalid response from GitHub API' };
    }
    if (result.archived) return { status: 'archived', repo };
    if (result.disabled) return { status: 'disabled', repo };
    if (result.full_name !== repo) return { status: 'redirected', repo, target: result.full_name };
    return { status: 'ok', repo };
  } catch (error) {
    const message = errorMessage(error);
    if (/(?:HTTP\s+404\b|\b404:\s*Not Found\b)/i.test(message)) {
      return { status: 'not_found', repo };
    }
    return { status: 'error', repo, error: message };
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

  const failures = issues.filter(issue => FAIL_STATUSES.has(issue.status));
  const warnings = issues.filter(issue => issue.status === 'redirected');
  const validationErrors = issues.filter(issue => issue.status === 'error');

  console.log(`\nResults: ${ok} ok, ${failures.length} failures, ${warnings.length} warnings, ${validationErrors.length} validation errors`);

  const issuesOut = process.env.LINK_ISSUES_OUT;
  if (issuesOut) {
    fs.writeFileSync(issuesOut, JSON.stringify(issues, null, 2) + '\n');
    console.log(`\nWrote ${issues.length} issue(s) to ${issuesOut}`);
  }

  if (warnings.length > 0) {
    console.log('\nWarnings (non-fatal, please review when convenient):');
    for (const issue of warnings) {
      console.log(`  [${issue.status}] ${issue.name} (${issue.repo})`);
      if (issue.target) console.log(`    -> redirected to: ${issue.target}`);
    }
  }

  if (validationErrors.length > 0) {
    console.log('\nValidation errors (link validation incomplete):');
    for (const issue of validationErrors) {
      console.log(`  [${issue.status}] ${issue.name} (${issue.repo})`);
      if (issue.error) console.log(`    -> ${issue.error}`);
    }
  }

  if (failures.length > 0) {
    console.log('\nFailures:');
    for (const issue of failures) {
      console.log(`  [${issue.status}] ${issue.name} (${issue.repo})`);
      if (issue.error) console.log(`    -> ${issue.error}`);
    }
  }

  if (failures.length > 0 || validationErrors.length > 0) {
    process.exit(1);
  }
}

main();
