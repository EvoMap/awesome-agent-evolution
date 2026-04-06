#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECTS_PATH = path.join(__dirname, '..', 'data', 'projects.json');
const DISCOVERED_PATH = path.join(__dirname, '..', 'data', 'discovered.json');
const MIN_STARS = 500;
const RESULTS_PER_QUERY = 30;

const SEARCH_QUERIES = {
  evolution: [
    'self-evolving agent',
    'agent self-improvement',
    'agent evolution framework',
    'autonomous agent learning',
    'self-improving AI agent',
  ],
  memory: [
    'agent memory system',
    'llm memory framework',
    'ai agent memory',
    'long-term memory LLM',
  ],
  'multi-agent': [
    'multi-agent framework',
    'multi agent orchestration',
    'agent collaboration framework',
    'multi-agent LLM',
  ],
  protocols: [
    'agent-to-agent protocol',
    'MCP server framework',
    'agent communication protocol',
    'a2a protocol agent',
  ],
  platforms: [
    'AI agent platform open source',
    'agent development platform',
    'agentic AI framework',
  ],
  coding: [
    'AI coding agent',
    'code generation agent',
    'autonomous coding assistant',
    'software engineering agent',
  ],
  'prompt-optimization': [
    'prompt optimization framework',
    'prompt evolution',
    'automatic prompt engineering',
  ],
  safety: [
    'AI agent guardrails',
    'LLM safety framework',
    'agent safety guardrail',
  ],
  embodied: [
    'embodied AI agent',
    'robotics AI framework',
    'device control agent',
  ],
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function searchGitHub(query) {
  try {
    const escaped = query.replace(/"/g, '\\"');
    const cmd = `gh api "search/repositories?q=${encodeURIComponent(escaped)}+stars:>=${MIN_STARS}&sort=stars&order=desc&per_page=${RESULTS_PER_QUERY}" --jq '.items[] | {full_name: .full_name, description: .description, stars: .stargazers_count, topics: .topics, archived: .archived, fork: .fork}'`;
    const result = execSync(cmd, { encoding: 'utf-8', timeout: 30000 }).trim();
    if (!result) return [];
    return result.split('\n').map(line => {
      try { return JSON.parse(line); } catch { return null; }
    }).filter(Boolean);
  } catch (e) {
    console.warn(`  Search failed for "${query}": ${e.message.split('\n')[0]}`);
    return [];
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const existing = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf-8'));
  const existingRepos = new Set(existing.map(p => p.repo.toLowerCase()));

  let previouslyDiscovered = [];
  if (fs.existsSync(DISCOVERED_PATH)) {
    previouslyDiscovered = JSON.parse(fs.readFileSync(DISCOVERED_PATH, 'utf-8'));
  }
  const rejectedRepos = new Set(
    previouslyDiscovered.filter(d => d.status === 'rejected').map(d => d.repo.toLowerCase())
  );

  const candidates = new Map();

  for (const [category, queries] of Object.entries(SEARCH_QUERIES)) {
    console.log(`\n[${category}] Searching...`);

    for (const query of queries) {
      process.stdout.write(`  "${query}" ... `);
      const results = searchGitHub(query);
      console.log(`${results.length} results`);

      for (const repo of results) {
        if (!repo || repo.archived || repo.fork) continue;
        const repoName = repo.full_name;
        const repoLower = repoName.toLowerCase();

        if (existingRepos.has(repoLower)) continue;
        if (rejectedRepos.has(repoLower)) continue;
        if (candidates.has(repoLower)) {
          candidates.get(repoLower).matchedCategories.add(category);
          continue;
        }

        candidates.set(repoLower, {
          repo: repoName,
          description: (repo.description || '').slice(0, 200),
          stars: repo.stars,
          topics: repo.topics || [],
          matchedCategories: new Set([category]),
        });
      }

      await sleep(2000);
    }
  }

  const sorted = [...candidates.values()]
    .sort((a, b) => b.stars - a.stars);

  console.log(`\n========================================`);
  console.log(`Discovered ${sorted.length} new candidates (>= ${MIN_STARS} stars)`);
  console.log(`========================================\n`);

  if (sorted.length === 0) {
    console.log('No new projects found.');
    return;
  }

  const output = sorted.map(c => ({
    repo: c.repo,
    description: c.description,
    stars: c.stars,
    suggestedCategory: [...c.matchedCategories][0],
    allMatchedCategories: [...c.matchedCategories],
    topics: c.topics.slice(0, 10),
    status: 'pending',
    discoveredAt: new Date().toISOString().split('T')[0],
  }));

  const top20 = output.slice(0, 20);
  console.log('Top 20 candidates:\n');
  for (const c of top20) {
    console.log(`  ${c.stars.toLocaleString().padStart(8)} | ${c.repo}`);
    console.log(`           ${c.description.slice(0, 80)}`);
    console.log(`           categories: ${c.allMatchedCategories.join(', ')}`);
    console.log('');
  }

  if (!dryRun) {
    const merged = [...previouslyDiscovered];
    const existingDiscovered = new Set(merged.map(d => d.repo.toLowerCase()));

    for (const item of output) {
      if (!existingDiscovered.has(item.repo.toLowerCase())) {
        merged.push(item);
      }
    }

    fs.writeFileSync(DISCOVERED_PATH, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
    console.log(`\nSaved ${output.length} new candidates to data/discovered.json`);
    console.log('Review candidates and run "node scripts/adopt-projects.js" to add approved ones.');
  } else {
    console.log('\n(dry run -- not saved)');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
