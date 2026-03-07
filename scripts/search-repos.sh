#!/usr/bin/env bash
set -euo pipefail

# Search GitHub for AI Agent related repos and output JSON for projects.json
# Usage: ./scripts/search-repos.sh [query] [min_stars]

QUERY="${1:-ai agent}"
MIN_STARS="${2:-50}"

echo "Searching for: $QUERY (min stars: $MIN_STARS)" >&2

gh api search/repositories \
  --method GET \
  -f q="$QUERY stars:>=$MIN_STARS" \
  -f sort=stars \
  -f order=desc \
  -f per_page=30 \
  --jq '.items[] | {
    name: .name,
    repo: .full_name,
    description: (.description // ""),
    stars: .stargazers_count,
    maintainer: .owner.login,
    url: .html_url
  }'
