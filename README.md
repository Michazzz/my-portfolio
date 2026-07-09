# Portfolio

Angular 21 + Tailwind CSS v4 + DaisyUI 5, containerized with Docker.

## Run with Docker (recommended)

Development server with hot-reload:

```bash
docker compose up          # -> http://localhost:4200
```

Production preview (built app served by nginx):

```bash
docker compose --profile prod up --build web-prod   # -> http://localhost:8080
```

## Run locally (without Docker)

```bash
npm install
npm start                  # dev server -> http://localhost:4200
npm run build              # production build -> dist/my-portfolio/browser
```

## Editing content

All page content lives in [`src/app/portfolio/portfolio.data.ts`](src/app/portfolio/portfolio.data.ts).
Change the name, bio, links, services, tools and skills there — the layout updates automatically.

## Structure

```
src/app/portfolio/
  portfolio.model.ts       # content types
  portfolio.data.ts        # <-- edit your content here
  portfolio/               # page shell: header + two-column layout
    portfolio.ts
    portfolio.html
  sidebar/                 # avatar, "Get in touch", skill set
    sidebar.ts
    sidebar.html
  about/                   # About Me + social/link cards
    about.ts
    about.html
  services/                # services grid with Notion-like toolbar
    services.ts
    services.html
  tools/                   # tools grid
    tools.ts
    tools.html
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
