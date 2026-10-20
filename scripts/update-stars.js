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

const { execFileSync } = require('child_process');
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
    const result = execFileSync('gh', ['api', `repos/${repo}`, '--jq', '.stargazers_count'], { encoding: 'utf-8', timeout: 15000 }).trim();
    const stars = Number.parseInt(result, 10);
    return Number.isInteger(stars) && stars >= 0 ? stars : null;
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

  if (failed > 0) {
    console.error('Star refresh incomplete; refusing to write a partial snapshot.');
    process.exitCode = 1;
    return;
  }

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
