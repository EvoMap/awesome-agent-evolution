#!/usr/bin/env node

/** Validate the curated project data and generated README. */
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROJECTS_PATH = path.join(ROOT, 'data', 'projects.json');
const README_PATH = path.join(ROOT, 'README.md');
const GENERATOR_PATH = path.join(ROOT, 'scripts', 'generate-readme.js');
const CATEGORY_SECTIONS = {
  evolution: 'evolution',
  memory: 'memory',
  protocols: 'protocols',
  platforms: 'platforms',
  coding: 'coding',
  'multi-agent': 'multi-agent',
  'prompt-optimization': 'prompt-optimization',
  safety: 'safety',
  embodied: 'embodied',
  community: 'community',
};
const PLACEHOLDER_RE = /(?:xxxxx|owner\/repo|example\.com|TODO|FIXME)/i;
const errors = [];
const warn = message => console.warn(`WARN: ${message}`);
const fail = (message, index) => errors.push(index === undefined ? message : `projects[${index}]: ${message}`);

function loadJson(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { fail(`${path.relative(ROOT, file)} is not valid JSON: ${error.message}`); return null; }
}

function validateProjects(projects) {
  if (!Array.isArray(projects)) { fail('data/projects.json must contain an array'); return; }
  const seen = new Map();
  for (const [index, project] of projects.entries()) {
    if (!project || typeof project !== 'object' || Array.isArray(project)) { fail('must be an object', index); continue; }
    for (const key of ['name', 'repo', 'description', 'category', 'maintainer', 'tags', 'stars']) {
      if (!(key in project)) fail(`missing ${key}`, index);
    }
    if (typeof project.name !== 'string' || !project.name.trim()) fail('name must be a non-empty string', index);
    if (typeof project.repo !== 'string' || !/^[^/\s]+\/[^/\s]+$/.test(project.repo)) fail('repo must be owner/name', index);
    const repoKey = String(project.repo).toLowerCase();
    if (seen.has(repoKey)) fail(`duplicate repo (also projects[${seen.get(repoKey)}])`, index); else seen.set(repoKey, index);
    if (typeof project.category !== 'string' || !(project.category in CATEGORY_SECTIONS)) fail(`unknown category ${project.category}`, index);
    if (typeof project.maintainer !== 'string' || !project.maintainer.trim()) fail('maintainer must be a non-empty string', index);
    else if (typeof project.repo === 'string' && project.maintainer.toLowerCase() !== project.repo.split('/')[0].toLowerCase()) fail(`maintainer must match repo owner (${project.repo.split('/')[0]})`, index);
    if (!Array.isArray(project.tags) || project.tags.length < 2 || project.tags.length > 3 || project.tags.some(tag => typeof tag !== 'string' || !tag.trim())) fail('tags must contain 2-3 non-empty strings', index);
    if (typeof project.description !== 'string' || !/^[A-Z]/.test(project.description.trim()) || !/[.!?。]$/.test(project.description.trim()) || PLACEHOLDER_RE.test(project.description)) fail('description must start uppercase, end punctuation, and contain no placeholder', index);
    if (!Number.isInteger(project.stars) || project.stars < 0) fail('stars must be a non-negative integer', index);
    if (project.paper !== undefined && (typeof project.paper !== 'string' || !/^https:\/\//.test(project.paper) || PLACEHOLDER_RE.test(project.paper))) fail('paper must be a real HTTPS URL', index);
  }
}

function validateReadme(projects, readme) {
  if (typeof readme !== 'string') return;
  if (PLACEHOLDER_RE.test(readme)) fail('README contains a placeholder token or example URL');
  for (const [category, section] of Object.entries(CATEGORY_SECTIONS)) {
    const regex = new RegExp(`<!-- AUTOGEN:${section} -->([\\s\\S]*?)<!-- /AUTOGEN:${section} -->`);
    const match = readme.match(regex);
    if (!match) { fail(`README is missing AUTOGEN:${section} markers`); continue; }
    const expected = projects.filter(project => project.category === category).sort((a, b) => (b.stars || 0) - (a.stars || 0));
    const actualRepos = [...match[1].matchAll(/^- \[\*\*[^\n]+?\*\*\]\(https:\/\/github\.com\/([^\)#]+)(?:#readme)?\)/gm)].map(m => m[1].toLowerCase());
    const expectedRepos = expected.map(project => project.repo.toLowerCase());
    if (actualRepos.length !== expectedRepos.length || actualRepos.some((repo, index) => repo !== expectedRepos[index])) fail(`README category ${category} does not match generated project order`);
  }
  for (const [lineNumber, line] of readme.split('\n').entries()) {
    for (const url of line.matchAll(/https?:\/\/[^\s)]+/g)) {
      if (!/^https:\/\//.test(url[0])) warn(`README line ${lineNumber + 1} uses a non-HTTPS URL: ${url[0]}`);
      if (PLACEHOLDER_RE.test(url[0])) fail(`README line ${lineNumber + 1} contains placeholder URL ${url[0]}`);
    }
  }
}

function validateGeneratedOutput() {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'awesome-validate-'));
  try {
    const tempReadme = path.join(temp, 'README.md');
    fs.copyFileSync(README_PATH, tempReadme);
    const tempDataDir = path.join(temp, 'data'); fs.mkdirSync(tempDataDir);
    fs.copyFileSync(PROJECTS_PATH, path.join(tempDataDir, 'projects.json'));
    const tempScriptDir = path.join(temp, 'scripts'); fs.mkdirSync(tempScriptDir);
    const generator = fs.readFileSync(GENERATOR_PATH, 'utf8').replace(/path\.join\(__dirname, '..', 'data', 'projects\.json'\)/g, "path.join(__dirname, '..', 'data', 'projects.json')");
    fs.writeFileSync(path.join(tempScriptDir, 'generate-readme.js'), generator);
    execFileSync(process.execPath, [path.join(tempScriptDir, 'generate-readme.js')], { cwd: temp, stdio: 'pipe' });
    if (fs.readFileSync(tempReadme, 'utf8') !== fs.readFileSync(README_PATH, 'utf8')) fail('README is not reproducible from data/projects.json');
  } catch (error) { fail(`generator failed: ${error.message}`); }
  finally { fs.rmSync(temp, { recursive: true, force: true }); }
}

const projects = loadJson(PROJECTS_PATH);
const readme = fs.existsSync(README_PATH) ? fs.readFileSync(README_PATH, 'utf8') : (fail('README.md is missing'), null);
validateProjects(projects);
validateReadme(projects || [], readme);
validateGeneratedOutput();
console.log(`Validated ${projects?.length || 0} projects across ${Object.keys(CATEGORY_SECTIONS).length} categories`);
if (errors.length) { console.error(`Validation failed with ${errors.length} error(s):`); errors.forEach(error => console.error(`- ${error}`)); process.exit(1); }
console.log('Validation passed.');
