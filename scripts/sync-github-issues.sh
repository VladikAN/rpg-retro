#!/usr/bin/env bash
# Apply docs/github-issues/*.md to GitHub issues #4–#9.
# Requires: gh auth with issues write (owner PAT or gh auth login).
set -euo pipefail

REPO="${GITHUB_REPOSITORY:-VladikAN/rpg-retro}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ISSUES_DIR="$ROOT/docs/github-issues"

if ! command -v gh >/dev/null 2>&1; then
  echo "error: gh CLI not found" >&2
  exit 1
fi

for num in 4 5 6 7 8 9; do
  file="$ISSUES_DIR/$(printf '%03d.md' "$num")"
  if [[ ! -f "$file" ]]; then
    echo "error: missing $file" >&2
    exit 1
  fi
  echo "Updating issue #$num from $(basename "$file") ..."
  gh issue edit "$num" --repo "$REPO" --body-file "$file"
done

echo "Closing issue #4 (E1 merged in PR #12) ..."
gh issue close 4 --repo "$REPO" --comment "E1 завершён: [PR #12](https://github.com/VladikAN/rpg-retro/pull/12) в \`main\`. Описание обновлено из \`docs/github-issues/004.md\`. \`Store.GetByCode\` — в scope [#6](https://github.com/VladikAN/rpg-retro/issues/6) (E3)."

echo "Done. Open: https://github.com/$REPO/issues"
