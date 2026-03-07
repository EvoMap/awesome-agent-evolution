#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DATA_DIR="$SCRIPT_DIR/../data"

mkdir -p "$DATA_DIR"

echo "=== GitHub Monitor: $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
echo

node "$SCRIPT_DIR/monitor-github.js" --output "$DATA_DIR/monitor-results.json" --max-age-days 7

echo
echo "Done. Review results in $DATA_DIR/monitor-results.json"
echo "Use 'node $SCRIPT_DIR/respond-template.js <issue-url>' to generate a response draft."
