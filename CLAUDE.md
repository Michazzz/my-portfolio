# CLAUDE.md — my-portfolio

Angular 21 portfolio (standalone components, Tailwind v4 + DaisyUI 5), Dockerized.
**Live: https://wojtal.dev.** This file is auto-loaded by Claude Code on every machine that
has the repo — use it to keep the **two-machine workflow** in sync.

## Content & assets

Page content is JSON, **imported at build time** (compiled into the bundle → any change needs a
rebuild to show up):

- `src/app/portfolio/portfolio-data.json` — public content (bio, links, skills, certifications,
  languages, education, projects, selected projects, highlights, `avatarImage`, `locationUrl`).
- `src/app/portfolio/cv-data.json` — experience timeline (per role: `logoUrl` for the company logo).

### Committed vs gitignored — the two-machine gotcha

Git-tracked files sync across machines via `git pull`. **Gitignored files DO NOT** — they must be
moved by hand (`scp`) or pulled from **prod (the source of truth)**.

| Path | In git? | Sync |
|---|---|---|
| all code, `public/logos/*.png` | ✅ committed | `git pull` |
| `src/app/portfolio/portfolio-data.json`, `cv-data.json` | ❌ gitignored | `scp`; **prod is source of truth** |
| `public/avatar.png` | ❌ gitignored | `scp` |
| `public/certs/*.pdf` | ❌ gitignored | `scp` |

Committed templates: `portfolio-data.example.json`, `cv-data.example.json`. Fresh machine:
`cp src/app/portfolio/portfolio-data.example.json src/app/portfolio/portfolio-data.json` (same for cv).

> **Reconcile JSONs before deploy.** They get edited directly on the VPS. Always `scp` the prod
> JSONs DOWN and merge **prod as base + local changes on top** (rebase-style), then `scp` back —
> never blindly overwrite prod's JSON with a local copy.

## Deploy (VPS + Caddy)

Repo is cloned at `/opt/my-portfolio` on the VPS (ssh alias **`portfolio-vps`**), tracks
`origin/main`, served by **Caddy** (auto-HTTPS, www→apex redirect) reverse-proxying the nginx
container. Compose profiles: `dev` (:4200), `prod` (local preview :8080), `deploy` (Caddy 80/443).

- **Code change:** push to `main` → on VPS: `git pull && docker compose --profile deploy up -d --build`.
- **Data/asset change:** `scp` the gitignored file to the VPS → rebuild (same command).
- `.env` on the VPS holds `PORTFOLIO_DOMAIN=wojtal.dev` (gitignored).

## Local dev

`docker compose --profile dev up` → http://localhost:4200. **After `npm install`**, refresh the dev
container: `docker compose --profile dev up -d --build --renew-anon-volumes` — the anonymous
`/app/node_modules` volume otherwise shadows newly added deps.

## Status / open items — keep updated across machines

_Last updated: 2026-07-10 (session on machine A)._

- **avatar.png** (~685 KB, optimized 800×736) exists **locally only** — not on prod. Needs: `avatarImage`
  code on `main` (model field + sidebar `<img>`, currently uncommitted) + `scp` to prod + rebuild.
- **GL AI cert PDFs** referenced by data (`/certs/gl-ai-204b-claude-code.pdf`,
  `/certs/gl-ai-101-ai-associate-developers.pdf`) are **missing on both prod and this machine** —
  likely on the other machine. Drop them in `public/certs/`, then `scp` to prod.
- **public/logos/ncdc.png** differs: this machine 27 KB vs prod 8 KB. Logos are committed, so pick the
  intended version and commit it.
- **In-progress code:** `locationUrl` (sidebar location link) and `CvEntry.logoUrl` (company logos in
  the CV timeline) — the data already carries these fields; model/templates still being wired.
