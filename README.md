# Portfolio

Angular 21 + Tailwind CSS v4 + DaisyUI 5, containerized with Docker.

## Run with Docker (recommended)

Development server with hot-reload:

```bash
docker compose --profile dev up          # -> http://localhost:4200
```

Production preview (built app served by nginx, localhost only):

```bash
docker compose --profile prod up --build angular-ui-prod   # -> http://localhost:8080
```

## Deploy to a VPS (Caddy + auto-HTTPS)

Caddy terminates TLS and reverse-proxies to the nginx container. Point the domain's
DNS A record at the VPS and open ports 80/443, then:

```bash
# on the VPS, in the repo dir, after the gitignored files are in place (see below)
echo "PORTFOLIO_DOMAIN=your.domain" > .env
docker compose --profile deploy up -d --build
```

Caddy provisions and renews the certificate automatically. See "Editing content" for the
gitignored data/asset files that must be `scp`'d into the build context first.

## Run locally (without Docker)

```bash
npm install
npm start                  # dev server -> http://localhost:4200
npm run build              # production build -> dist/my-portfolio/browser
```

## Editing content

Page content lives in two **gitignored** JSON files (kept out of the repo), imported at build time:

- `src/app/portfolio/portfolio-data.json` — name, bio, location, links, email, "what I do",
  grouped skills, certifications, languages, education, projects, selected projects, highlights.
- `src/app/portfolio/cv-data.json` — CV / experience timeline.

Because they're imported (compiled into the bundle), each file must exist wherever you build,
and updating content requires a rebuild. On a fresh clone, create them from the committed templates:

```bash
cp src/app/portfolio/portfolio-data.example.json src/app/portfolio/portfolio-data.json
cp src/app/portfolio/cv-data.example.json src/app/portfolio/cv-data.json
```

On deploy, upload your real `*.json` files to the build host (e.g. via `scp`) before building.

### Email (anti-harvesting)

The email is stored as parts (`{ "user", "domain" }`) and assembled client-side only when the
visitor clicks **Show email** — so the full `user@domain` never appears in the static DOM or the
bundle for scrapers to grab. Using a dedicated alias address adds another layer.

## Structure

```
src/app/portfolio/
  portfolio.model.ts          # content types
  portfolio-data.json         # <-- your public content (gitignored)
  portfolio-data.example.json # committed template for portfolio-data.json
  portfolio.data.ts           # typed import of portfolio-data.json
  cv-data.json                # CV entries (gitignored — your real data)
  cv-data.example.json        # committed template for cv-data.json
  cv.data.ts                  # typed import of cv-data.json
  portfolio/                  # page shell: header + tabs + two-column layout
    portfolio.ts
    portfolio.html
  sidebar/                    # avatar, location, certifications, languages, education
    sidebar.ts
    sidebar.html
  skills/                     # Skills tab: grouped skills with tech logos
    skills.ts
    skills.html
  tech-icon/                  # brand logos for skills (via simple-icons)
    tech-icon.ts
  about/                      # About Me tab: bio + links + email + CV timeline
    about.ts
    about.html
  email-reveal/               # click-to-reveal email (anti-harvesting)
    email-reveal.ts
    email-reveal.html
  cv-timeline/             # vertical experience timeline
    cv-timeline.ts
    cv-timeline.html
  achievements/            # Achievements tab: selected projects + leadership
    achievements.ts
    achievements.html
  projects/                # Projects tab: project cards with tech badges
    projects.ts
    projects.html
  icon/                    # inline-SVG icon set (no external icon dependency)
    icon.ts
    icon.html
```

## Theme

DaisyUI's `dark` theme is the default (set via `data-theme="dark"` on `<html>` in
[`src/index.html`](src/index.html)). Themes are configured in
[`src/styles.css`](src/styles.css) — `light` is also enabled if you want to add a toggle.

## License

[MIT](LICENSE) © Michał Wojtalewicz @ wojtal
