#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECTS_PATH = path.join(__dirname, '..', 'data', 'projects.json');
const README_PATH = path.join(__dirname, '..', 'README.md');

const CATEGORY_SECTIONS = {
  'evolution': 'evolution',
  'memory': 'memory',
  'protocols': 'protocols',
  'platforms': 'platforms',
  'coding': 'coding',
  'prompt-optimization': 'prompt-optimization',
  'safety': 'safety',
  'embodied': 'embodied',
  'community': 'community',
};

function formatProject(p) {
  let desc = p.description || '';
  if (desc && !/[.!?]$/.test(desc)) {
    desc += '.';
  }
  const maintainer = p.maintainer ? ` by [@${p.maintainer}](https://github.com/${p.maintainer})` : '';
  const stars = p.stars ? ` (${p.stars.toLocaleString()} stars)` : '';
  return `- [**${p.name}**](https://github.com/${p.repo}) - ${desc}${maintainer}${stars}`;
}

function main() {
  if (!fs.existsSync(PROJECTS_PATH)) {
    console.error('data/projects.json not found');
    process.exit(1);
  }

  const projects = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf-8'));
  let readme = fs.readFileSync(README_PATH, 'utf-8');

  let totalInserted = 0;

  for (const [category, sectionId] of Object.entries(CATEGORY_SECTIONS)) {
    const filtered = projects
      .filter(p => p.category === category)
      .sort((a, b) => (b.stars || 0) - (a.stars || 0));

    const content = filtered.length
      ? filtered.map(formatProject).join('\n')
      : '_No projects yet. [Submit one!](https://github.com/EvoMap/awesome-agent-evolution/issues/new?template=project-submission.yml)_';

    const regex = new RegExp(
      `(<!-- AUTOGEN:${sectionId} -->)([\\s\\S]*?)(<!-- /AUTOGEN:${sectionId} -->)`,
      'g'
    );

    if (regex.test(readme)) {
      regex.lastIndex = 0;
      readme = readme.replace(regex, `$1\n${content}\n$3`);
      totalInserted += filtered.length;
    } else {
      console.warn(`Section marker not found: AUTOGEN:${sectionId}`);
    }
  }

  fs.writeFileSync(README_PATH, readme, 'utf-8');

  const categoryStats = {};
  for (const p of projects) {
    categoryStats[p.category] = (categoryStats[p.category] || 0) + 1;
  }

  console.log(`README.md updated with ${projects.length} projects across ${Object.keys(categoryStats).length} categories`);
  for (const [cat, count] of Object.entries(categoryStats).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`);
  }
}

main();
