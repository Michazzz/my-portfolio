#!/usr/bin/env bash
# One-command deploy: pull the latest pushed code + content on the VPS, rebuild, verify.
#
# Prereqs:
#   - your code/content is already pushed (main repo + portfolio-content submodule)
#   - `portfolio-vps` SSH alias is configured in ~/.ssh/config
#
# Usage:  bash deploy.sh
set -euo pipefail

REMOTE="portfolio-vps"
DIR="/opt/my-portfolio"
DOMAIN="${PORTFOLIO_DOMAIN:-wojtal.dev}"

echo "▶ Deploying latest to ${REMOTE}:${DIR} …"
ssh "$REMOTE" "cd '$DIR' \
  && git pull --ff-only \
  && git submodule update --init --remote \
  && docker compose --profile deploy up -d --build"

echo "▶ Verifying https://${DOMAIN} …"
root=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://${DOMAIN}/" || echo 000)
avatar=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://${DOMAIN}/avatar.png" || echo 000)
echo "  root: ${root}   avatar: ${avatar}"
if [ "$root" = "200" ]; then
  echo "✅ Live at https://${DOMAIN}"
else
  echo "⚠ Unexpected status — check 'ssh ${REMOTE} \"cd ${DIR} && docker compose --profile deploy logs\"'"
  exit 1
fi
