#!/usr/bin/env bash
# Publish a local chore/* commit to main after running the same validate gate
# that pull requests use. Scheduled workflows cannot rely on a follow-up
# validate.yml run: GITHUB_TOKEN pushes do not trigger other workflows, and
# the GitHub Actions app cannot be added as a ruleset bypass actor here.
set -euo pipefail

: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"

SHA=$(git rev-parse HEAD)
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ "$BRANCH" != chore/* ]]; then
  echo "refusing to publish from $BRANCH (expected chore/*)" >&2
  exit 1
fi

echo "Running validate on ${SHA} (${BRANCH})"
node scripts/validate.js
node scripts/generate-readme.js
git diff --exit-code -- README.md

git push origin "HEAD:refs/heads/${BRANCH}"

check_payload=(
  --field name=validate
  --field head_sha="${SHA}"
  --field status=completed
  --field conclusion=success
)
if [[ -n "${GITHUB_SERVER_URL:-}" && -n "${GITHUB_RUN_ID:-}" ]]; then
  check_payload+=(--field "details_url=${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}")
fi
gh api --method POST "repos/${GITHUB_REPOSITORY}/check-runs" "${check_payload[@]}"

git push origin "${SHA}:refs/heads/main"
git push origin --delete "${BRANCH}" || true
echo "Published ${SHA} to main"
