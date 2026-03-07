#!/usr/bin/env node

/**
 * GitHub monitoring script for discovering relevant issues and discussions
 * across the AI Agent ecosystem. Searches for topics where evolver/evomap
 * could provide value, outputs candidates for human review.
 *
 * Usage:
 *   node scripts/monitor-github.js [--output results.json] [--max-age-days 7]
 *
 * Requires: gh CLI authenticated
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SEARCH_QUERIES = [
  'agent memory system',
  'agent evolution self-improvement',
  'multi-agent framework',
  'agent-to-agent protocol a2a',
  'mcp server agent',
  'agent self-evolving',
  'LLM agent long-term memory',
  'agent genome evolution',
];

const EXCLUDE_REPOS = [
  'EvoMap/evolver',
  'EvoMap/awesome-agent-evolution',
];

const MAX_RESULTS_PER_QUERY = 10;

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    output: path.join(__dirname, '..', 'data', 'monitor-results.json'),
    maxAgeDays: 7,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1]) {
      config.output = args[++i];
    } else if (args[i] === '--max-age-days' && args[i + 1]) {
      config.maxAgeDays = parseInt(args[++i], 10);
    }
  }

  return config;
}

function ghSearch(query, maxAgeDays = 7) {
  const since = new Date();
  since.setDate(since.getDate() - maxAgeDays);
  const dateStr = since.toISOString().split('T')[0];

  const fullQuery = `${query} is:open created:>=${dateStr} type:issue`;

  try {
    const cmd = `gh api search/issues --method GET -f q="${fullQuery}" -f sort=created -f order=desc -f per_page=${MAX_RESULTS_PER_QUERY} --jq '.items'`;
    const result = execSync(cmd, { encoding: 'utf-8', timeout: 30000 });
    return JSON.parse(result || '[]');
  } catch (e) {
    console.error(`Search failed for "${query}": ${e.message}`);
    return [];
  }
}

function filterResults(items) {
  return items.filter(item => {
    const repoUrl = item.repository_url || '';
    const repoName = repoUrl.replace('https://api.github.com/repos/', '');
    if (EXCLUDE_REPOS.includes(repoName)) return false;
    if (item.pull_request) return false;
    return true;
  });
}

function dedup(items) {
  const seen = new Set();
  return items.filter(item => {
    if (seen.has(item.html_url)) return false;
    seen.add(item.html_url);
    return true;
  });
}

function scoreItem(item) {
  let score = 0;
  const title = (item.title || '').toLowerCase();
  const body = (item.body || '').toLowerCase();
  const text = title + ' ' + body;

  const highValueTerms = ['evolution', 'self-evolving', 'memory system', 'a2a', 'agent-to-agent', 'genome'];
  const mediumValueTerms = ['multi-agent', 'mcp', 'agent framework', 'long-term memory'];
  const lowValueTerms = ['help', 'how to', 'question', 'looking for'];

  for (const term of highValueTerms) {
    if (text.includes(term)) score += 3;
  }
  for (const term of mediumValueTerms) {
    if (text.includes(term)) score += 2;
  }
  for (const term of lowValueTerms) {
    if (text.includes(term)) score += 1;
  }

  if (item.comments === 0) score += 2;

  return score;
}

function formatForReview(items) {
  return items.map(item => {
    const repoUrl = item.repository_url || '';
    const repoName = repoUrl.replace('https://api.github.com/repos/', '');

    return {
      title: item.title,
      url: item.html_url,
      repo: repoName,
      author: item.user?.login || 'unknown',
      comments: item.comments || 0,
      created: item.created_at,
      score: scoreItem(item),
      labels: (item.labels || []).map(l => l.name),
    };
  }).sort((a, b) => b.score - a.score);
}

function main() {
  const config = parseArgs();
  console.log(`Monitoring GitHub for relevant discussions (max age: ${config.maxAgeDays} days)`);

  let allItems = [];

  for (const query of SEARCH_QUERIES) {
    process.stdout.write(`  Searching: "${query}" ... `);
    const items = ghSearch(query, config.maxAgeDays);
    const filtered = filterResults(items);
    console.log(`${filtered.length} results`);
    allItems.push(...filtered);
  }

  const unique = dedup(allItems);
  const ranked = formatForReview(unique);

  console.log(`\nTotal unique results: ${ranked.length}`);
  console.log(`Top 10 by relevance score:\n`);

  const top = ranked.slice(0, 10);
  for (const item of top) {
    console.log(`  [${item.score}] ${item.title}`);
    console.log(`      ${item.url}`);
    console.log(`      repo: ${item.repo} | comments: ${item.comments} | by: @${item.author}`);
    console.log();
  }

  const outputDir = path.dirname(config.output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(config.output, JSON.stringify({
    generated_at: new Date().toISOString(),
    query_count: SEARCH_QUERIES.length,
    total_results: ranked.length,
    items: ranked,
  }, null, 2));

  console.log(`Full results saved to: ${config.output}`);
}

main();
