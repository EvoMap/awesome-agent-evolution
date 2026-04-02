#!/usr/bin/env node

/**
 * Fetch real-time star counts from GitHub API and update projects.json.
 * Uses the gh CLI for authentication.
 *
 * Usage:
 *   node scripts/update-stars.js [--dry-run]
 *
 * Requires: gh CLI authenticated
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECTS_PATH = path.join(__dirname, '..', 'data', 'projects.json');
const BATCH_SIZE = 10;
const DELAY_MS = 1000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchStars(repo) {
  try {
    const cmd = `gh api repos/${repo} --jq '.stargazers_count'`;
    const result = execSync(cmd, { encoding: 'utf-8', timeout: 15000 }).trim();
    return parseInt(result, 10);
  } catch (e) {
    console.warn(`  Failed to fetch ${repo}: ${e.message.split('\n')[0]}`);
    return null;
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  if (!fs.existsSync(PROJECTS_PATH)) {
    console.error('data/projects.json not found');
    process.exit(1);
  }

  const projects = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf-8'));
  console.log(`Updating star counts for ${projects.length} projects${dryRun ? ' (dry run)' : ''}...\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    process.stdout.write(`  [${i + 1}/${projects.length}] ${p.repo} ... `);

    const stars = fetchStars(p.repo);

    if (stars !== null && !isNaN(stars)) {
      const diff = stars - (p.stars || 0);
      const diffStr = diff > 0 ? `+${diff}` : `${diff}`;
      console.log(`${stars} (${diffStr})`);
      p.stars = stars;
      updated++;
    } else {
      console.log('FAILED');
      failed++;
    }

    if ((i + 1) % BATCH_SIZE === 0 && i < projects.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\nResults: ${updated} updated, ${failed} failed`);

  if (!dryRun && updated > 0) {
    fs.writeFileSync(PROJECTS_PATH, JSON.stringify(projects, null, 2) + '\n', 'utf-8');
    console.log('projects.json saved');
    console.log('Run "node scripts/generate-readme.js" to update README.md');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
