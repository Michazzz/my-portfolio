import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Portfolio } from '../portfolio/portfolio.model';

/** Canonical site origin (no trailing slash). Used for absolute OG/canonical URLs. */
const SITE_URL = 'https://wojtal.dev';
/** Social share image (1200×630), served from `public/`. */
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_HEADLINE = 'Principal Engineer & Tech Lead';

/** High-signal areas of expertise for the Person schema (`knowsAbout`). */
const KNOWS_ABOUT = [
  '.NET Core',
  'Angular',
  'TypeScript',
  'Node.js',
  'Distributed Systems',
  'Microservices',
  'Software Architecture',
  'Technical Leadership',
  'CI/CD',
  'Azure',
];

/**
 * Sets the document title and meta tags (description, Open Graph, Twitter Card)
 * plus the canonical link. Runs during prerendering, so every tag is baked into
 * the static HTML that crawlers and link-preview scrapers read.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /** Populate all SEO tags for the single-page portfolio from its content. */
  setForHome(data: Portfolio): void {
    const headline = data.headline?.trim() || DEFAULT_HEADLINE;
    const pageTitle = `${data.name} — ${headline}`;
    const description = data.seoDescription?.trim() || truncate(data.about, 155);
    const url = `${SITE_URL}/`;

    this.meta.updateTag({ name: 'author', content: data.name });
    this.applyMeta(pageTitle, description, url, 'website', data.name);
    this.setStructuredData(data, description, url);
  }

  /** Set title/description/OG/canonical for a sub-page (e.g. a case study). */
  setPage(page: { title: string; description: string; path: string; siteName: string }): void {
    const url = `${SITE_URL}${page.path}`;
    this.applyMeta(page.title, page.description, url, 'article', page.siteName);
  }

  /** Shared title + description + Open Graph + Twitter + canonical writer. */
  private applyMeta(
    title: string,
    description: string,
    url: string,
    type: 'website' | 'article',
    siteName: string,
  ): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph (LinkedIn, Slack, Facebook, …)
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: title });

    // Twitter / X
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: OG_IMAGE });

    this.setCanonical(url);
  }

  /**
   * Emit a Person + WebSite JSON-LD graph so Google can build rich results and a
   * Knowledge Panel. `sameAs` is derived from the http(s) social links in the data.
   */
  private setStructuredData(data: Portfolio, description: string, url: string): void {
    const sameAs = data.links
      .map((l) => l.url)
      .filter((u) => u.startsWith('http'));
    const image = data.avatarImage ? `${SITE_URL}${data.avatarImage}` : OG_IMAGE;

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${url}#person`,
          name: data.name,
          jobTitle: data.headline?.trim() || DEFAULT_HEADLINE,
          description,
          url,
          image,
          sameAs,
          knowsAbout: KNOWS_ABOUT,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Szczecin',
            addressCountry: 'PL',
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${url}#website`,
          url,
          name: data.name,
          description,
          inLanguage: 'en',
          author: { '@id': `${url}#person` },
        },
      ],
    };

    const head = this.document.head;
    let script = head.querySelector<HTMLScriptElement>('script#ld-json');
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.id = 'ld-json';
      head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }

  /** Create or update the single `<link rel="canonical">` in the document head. */
  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}

/** Trim `text` to at most `max` chars on a word boundary, adding an ellipsis. */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const clipped = text.slice(0, max);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}
