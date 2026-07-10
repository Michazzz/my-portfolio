#!/usr/bin/env bash
# Publish a content change (data / avatar / certs) that lives in the private
# `portfolio-content` submodule: commit+push it, then bump the pointer in the
# main repo and push. Afterwards run `bash deploy.sh` to go live.
#
# Usage:  bash content-push.sh "short message"
set -euo pipefail

MSG="${1:-content update}"
SUB="src/app/portfolio/content"

# 1) commit + push inside the submodule
if [ -n "$(git -C "$SUB" status --porcelain)" ]; then
  git -C "$SUB" add -A
  git -C "$SUB" commit -m "$MSG"
  git -C "$SUB" push
  echo "✔ content pushed to portfolio-content"
else
  echo "· no content changes"
fi

# 2) bump the submodule pointer in the main repo (keeps main pinned to the content commit)
if [ -n "$(git status --porcelain -- "$SUB")" ]; then
  git add "$SUB"
  git commit -m "content: ${MSG}"
  git push
  echo "✔ main repo pointer bumped + pushed"
else
  echo "· pointer already current"
fi

echo "→ Now run:  bash deploy.sh"
