#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECTS_PATH = path.join(__dirname, '..', 'data', 'projects.json');
const README_PATH = path.join(__dirname, '..', 'README.md');

const CATEGORY_SECTIONS = {
  'evolution': 'evolution',
  'memory': 'memory',
  'multi-agent': 'multi-agent',
  'protocols': 'protocols',
  'platforms': 'platforms',
  'embodied': 'embodied',
  'community': 'community',
};

function formatProject(p) {
  const stars = p.stars ? ` (${p.stars} stars)` : '';
  const maintainer = p.maintainer ? ` by [@${p.maintainer}](https://github.com/${p.maintainer})` : '';
  const tags = p.tags && p.tags.length ? ` \`${p.tags.join('` `')}\`` : '';
  return `- [**${p.name}**](https://github.com/${p.repo}) -- ${p.description}${maintainer}${stars}${tags}`;
}

function main() {
  if (!fs.existsSync(PROJECTS_PATH)) {
    console.error('data/projects.json not found');
    process.exit(1);
  }

  const projects = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf-8'));
  let readme = fs.readFileSync(README_PATH, 'utf-8');

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
    readme = readme.replace(regex, `$1\n${content}\n$3`);
  }

  fs.writeFileSync(README_PATH, readme, 'utf-8');
  console.log(`README.md updated with ${projects.length} projects`);
}

main();
