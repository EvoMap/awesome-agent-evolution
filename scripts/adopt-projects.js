#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECTS_PATH = path.join(__dirname, '..', 'data', 'projects.json');
const DISCOVERED_PATH = path.join(__dirname, '..', 'data', 'discovered.json');

function main() {
  if (!fs.existsSync(DISCOVERED_PATH)) {
    console.log('No discovered.json found. Run discover-projects.js first.');
    return;
  }

  const projects = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf-8'));
  const discovered = JSON.parse(fs.readFileSync(DISCOVERED_PATH, 'utf-8'));
  const existingRepos = new Set(projects.map(p => p.repo.toLowerCase()));

  const approved = discovered.filter(d => d.status === 'approved');

  if (approved.length === 0) {
    console.log('No approved candidates in discovered.json.');
    console.log('Set "status": "approved" on candidates you want to add.');
    return;
  }

  let added = 0;

  for (const candidate of approved) {
    if (existingRepos.has(candidate.repo.toLowerCase())) {
      console.log(`  SKIP (already exists): ${candidate.repo}`);
      continue;
    }

    const owner = candidate.repo.split('/')[0];
    const newProject = {
      name: candidate.name || candidate.repo.split('/')[1],
      repo: candidate.repo,
      description: candidate.description || '',
      category: candidate.suggestedCategory || 'community',
      maintainer: owner,
      tags: (candidate.topics || []).slice(0, 3),
      stars: candidate.stars || 0,
    };

    projects.push(newProject);
    existingRepos.add(candidate.repo.toLowerCase());
    candidate.status = 'added';
    added++;
    console.log(`  ADDED: ${candidate.repo} -> ${newProject.category} (${newProject.stars} stars)`);
  }

  if (added > 0) {
    fs.writeFileSync(PROJECTS_PATH, JSON.stringify(projects, null, 2) + '\n', 'utf-8');
    fs.writeFileSync(DISCOVERED_PATH, JSON.stringify(discovered, null, 2) + '\n', 'utf-8');
    console.log(`\n${added} projects added to projects.json`);
    console.log('Run "node scripts/generate-readme.js" to update README.md');
  } else {
    console.log('No new projects to add.');
  }
}

main();
