# Contributing

We welcome contributions from the community. Here's how you can help:

## Suggest a Project

The easiest way to suggest a project is to [open an issue](https://github.com/EvoMap/awesome-agent-evolution/issues/new?template=project-submission.yml) using the project submission template.

## Criteria for Inclusion

Projects should meet the following criteria:

- **Relevant**: Directly related to AI Agent evolution, memory, multi-agent systems, A2A protocols, or embodied AI
- **Active**: Has received commits within the last 6 months
- **Open source**: Source code is publicly available
- **Documented**: Has a README with clear description and usage instructions
- **Minimum traction**: At least 50 GitHub stars (exceptions for novel/unique projects)

## Submit a Pull Request

1. Fork this repository
2. Add the project to `data/projects.json` following the existing schema
3. Run `node scripts/generate-readme.js` to regenerate the README
4. Submit a pull request with a brief description of the project

## Project JSON Schema

Each entry in `data/projects.json` should follow this format:

```json
{
  "name": "Project Name",
  "repo": "owner/repo",
  "description": "One-line description of the project",
  "category": "evolution|memory|multi-agent|protocols|platforms|embodied|community",
  "maintainer": "github-username",
  "tags": ["tag1", "tag2"],
  "stars": 0
}
```

## Code of Conduct

Be respectful. Provide constructive feedback. Help build a useful resource for the AI Agent community.
