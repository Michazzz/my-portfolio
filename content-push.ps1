# Publish a content change (data / avatar / certs) in the private portfolio-content
# submodule: commit+push it, then bump the pointer in the main repo and push.
# Afterwards run ./deploy.ps1 to go live. (Bash equivalent: content-push.sh)
#
# Usage:  ./content-push.ps1 "short message"
$ErrorActionPreference = 'Stop'

$Msg = if ($args.Count -ge 1) { $args[0] } else { 'content update' }
$Sub = 'src/app/portfolio/content'

# 1) commit + push inside the submodule
if (git -C $Sub status --porcelain) {
  git -C $Sub add -A
  git -C $Sub commit -m $Msg
  git -C $Sub push
  Write-Host "content pushed to portfolio-content"
} else {
  Write-Host "no content changes"
}

# 2) bump the submodule pointer in the main repo
if (git status --porcelain -- $Sub) {
  git add $Sub
  git commit -m "content: $Msg"
  git push
  Write-Host "main repo pointer bumped + pushed"
} else {
  Write-Host "pointer already current"
}

Write-Host "-> Now run: ./deploy.ps1"
