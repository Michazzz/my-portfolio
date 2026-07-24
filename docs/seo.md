# SEO — implementacja i checklista

Stan po wdrożeniu Faz 1–6. Kod robi resztę automatycznie przy każdym buildzie
(prerender + meta). Poniżej to, co wymaga jednorazowej akcji po stronie usług
zewnętrznych lub przy zmianie treści.

## Co jest zautomatyzowane w kodzie

- **Prerendering (SSG)** — `outputMode: static` w `angular.json`; treść wpiekana w
  `index.html` (boty i podglądy linków nie renderują JS).
- **Meta / Open Graph / Twitter / canonical** — `src/app/core/seo.service.ts`,
  wołane z `Portfolio` podczas prerenderu. Wartości z `portfolio-data.json`
  (`headline`, `seoDescription`) z fallbackiem.
- **JSON-LD** — schemat `Person` + `WebSite` (rich results / Knowledge Panel).
- **robots.txt / sitemap.xml / site.webmanifest / ikony** — w `public/`
  (committowane, synchronizują się przez `git pull`).
- **Nagłówki bezpieczeństwa** — `Caddyfile` (HSTS, nosniff, Referrer-Policy…).

## Checklista po deployu (jednorazowo)

1. **Google Search Console** — https://search.google.com/search-console
   - Dodaj property typu **Domain** `wojtal.dev` → weryfikacja rekordem **TXT w DNS**.
   - Prześlij sitemap: `https://wojtal.dev/sitemap.xml`.
   - „Request indexing" dla strony głównej.
2. **Bing Webmaster Tools** — https://www.bing.com/webmasters
   - Dodaj witrynę (można zaimportować z GSC), prześlij sitemap.
3. **Podgląd linków** — po każdej zmianie OG:
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/ (odświeża cache OG).
   - Google Rich Results Test: https://search.google.com/test/rich-results (waliduje JSON-LD).
4. **Core Web Vitals** — PageSpeed Insights: https://pagespeed.web.dev/ (cel: zielone LCP/CLS/INP).

## Krok manualny — optymalizacja avatara (perf/LCP)

`content/assets/avatar.png` (~685 KB) warto podać jako WebP. Brak konwertera w repo,
więc jednorazowo lokalnie (np. `cwebp` lub Squoosh):

```bash
cwebp -q 82 avatar.png -o avatar.webp   # ~10x mniejszy plik
```

Następnie w `content/portfolio-data.json` ustaw `"avatarImage": "/avatar.webp"`,
wgraj plik do `content/assets/` i wypchnij submoduł (`content-push`). Element `<img>`
ma już `width/height` + `fetchpriority="high"`.

## Analityka (opcjonalnie, RODO-friendly)

Zamiast Google Analytics rozważ self-hosted **Plausible** lub **Umami** na VPS
(bez cookies → bez baneru zgody). Dodaje się jako jeden `<script>` w `index.html`.
