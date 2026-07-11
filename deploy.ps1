# One-command deploy from Windows/PowerShell: pull the latest pushed code + content
# on the VPS, rebuild, and verify. (Bash equivalent: deploy.sh)
#
# Prereqs: code/content already pushed; `portfolio-vps` SSH alias in ~/.ssh/config.
# Usage:   ./deploy.ps1
$ErrorActionPreference = 'Stop'

$Remote = 'portfolio-vps'
$Dir    = '/opt/my-portfolio'
$Domain = if ($env:PORTFOLIO_DOMAIN) { $env:PORTFOLIO_DOMAIN } else { 'wojtal.dev' }

Write-Host "==> Deploying latest to ${Remote}:${Dir} ..."
ssh $Remote "cd '$Dir' && git pull --ff-only && git submodule update --init --remote && docker compose --profile deploy up -d --build"
if ($LASTEXITCODE -ne 0) { throw "Remote deploy failed (exit $LASTEXITCODE)" }

Write-Host "==> Verifying https://$Domain ..."
try { $root = (Invoke-WebRequest -UseBasicParsing "https://$Domain/" -TimeoutSec 20).StatusCode }
catch { $root = 0 }
Write-Host "    root: $root"
if ($root -eq 200) {
  Write-Host "OK - live at https://$Domain"
} else {
  Write-Host "WARN - unexpected status; check: ssh $Remote `"cd $Dir && docker compose --profile deploy logs`""
  exit 1
}
