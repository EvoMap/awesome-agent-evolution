# Contributing

We welcome contributions from the community. Here's how you can help:

## Suggest a Project

The easiest way to suggest a project is to [open an issue](https://github.com/EvoMap/awesome-agent-evolution/issues/new?template=project-submission.yml) using the project submission template.

## Criteria for Inclusion

Projects should meet the following criteria:

- **Relevant**: Directly related to AI Agent self-evolution, memory systems, A2A/MCP protocols, agent coding, prompt optimization, agent safety, or embodied AI. Multi-agent orchestration and swarm frameworks belong in [awesome-agent-swarm](https://github.com/EvoMap/awesome-agent-swarm)
- **Active**: Has received commits within the last 6 months
- **Open source**: Source code is publicly available
- **Documented**: Has a README with clear description and usage instructions
- **Minimum traction**: At least 50 GitHub stars (exceptions for novel/unique projects)

## Submit a Pull Request

1. Fork this repository
2. Add the project to `data/projects.json` following the schema below
3. Run `node scripts/generate-readme.js` to regenerate the README
4. Submit a pull request with a brief description of the project

## Project JSON Schema

Each entry in `data/projects.json` should follow this format:

```json
{
  "name": "Project Name",
  "repo": "owner/repo",
  "description": "One-line description of the project",
  "category": "evolution|memory|protocols|platforms|coding|prompt-optimization|safety|embodied|community",
  "maintainer": "github-username",
  "tags": ["tag1", "tag2", "tag3"],
  "stars": 0,
  "paper": "https://arxiv.org/abs/... (optional)"
}
```

### Categories

| Category | Description |
|----------|-------------|
| `evolution` | Agent self-evolution and self-improvement |
| `memory` | Memory systems for persistent agent cognition |
| `protocols` | A2A, MCP, and inter-agent communication protocols |
| `platforms` | Agent development and deployment platforms |
| `coding` | Agent coding and software engineering tools |
| `prompt-optimization` | Prompt and behaviour optimization frameworks |
| `safety` | Agent safety, guardrails, and alignment |
| `embodied` | Embodied AI, robotics, and device control |
| `community` | Community resources, learning materials, and surveys |

### Tags

Use 2-3 descriptive tags per project. Reuse existing tags where possible:

`autonomous` `self-evolving` `self-improving` `production-ready` `mcp` `a2a`
`multi-agent` `orchestration` `research` `lightweight` `open-source`

## Research Papers

To suggest a research paper, either:
1. Open an issue describing the paper and its contribution
2. Submit a PR adding the paper to the appropriate table in README.md

Papers should be:
- Published in a recognized venue (top conferences, journals, or notable arXiv preprints)
- Directly related to agent evolution, memory, multi-agent systems, or related topics
- Accompanied by a one-line description of the key contribution

## Scripts

| Script | Purpose |
|--------|---------|
| `node scripts/generate-readme.js` | Regenerate README.md from projects.json |
| `node scripts/update-stars.js` | Fetch latest star counts from GitHub |
| `node scripts/check-links.js` | Validate all repository links |
| `bash scripts/search-repos.sh [query]` | Search GitHub for relevant projects |

## Code of Conduct

Be respectful. Provide constructive feedback. Help build a useful resource for the AI Agent community.
