## Cursor Cloud specific instructions

This is a curated awesome-list repository (not a web application). There is no build step, no npm dependencies, no web server, and no `package.json`. All scripts use only Node.js built-in modules.

### Required runtime

- **Node.js v24** (matches CI). Installed via NodeSource APT repo.
- **GitHub CLI (`gh`)** -- pre-installed and authenticated in the cloud agent environment. Used by `update-stars.js`, `check-links.js`, `discover-projects.js`, `monitor-github.js`, and shell helpers.

### Key scripts (see `CONTRIBUTING.md` for the full table)

| Command | gh required | Purpose |
|---|---|---|
| `node scripts/generate-readme.js` | No | Regenerate `README.md` from `data/projects.json` |
| `node scripts/update-stars.js [--dry-run]` | Yes | Fetch latest star counts from GitHub API |
| `node scripts/check-links.js` | Yes | Validate all repository links (exits 1 on broken links) |
| `node scripts/discover-projects.js [--dry-run]` | Yes | Search GitHub for new projects to curate |
| `node scripts/adopt-projects.js` | No | Move discovered projects into `projects.json` |

### Linting / testing

There are no lint tools, test frameworks, or type checkers configured. The effective "test" is:

1. `node scripts/generate-readme.js` -- must succeed and produce a clean `git diff` (idempotent).
2. `node scripts/check-links.js` -- must exit 0 with 0 failures (requires `gh` auth).

### Contribution workflow

1. Edit `data/projects.json`.
2. Run `node scripts/generate-readme.js`.
3. Verify `README.md` diff looks correct.
4. Commit both `data/projects.json` and `README.md`.
