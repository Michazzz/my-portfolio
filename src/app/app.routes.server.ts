import { RenderMode, ServerRoute } from '@angular/ssr';
import { PORTFOLIO } from './portfolio/portfolio.data';

export const serverRoutes: ServerRoute[] = [
  {
    // Prerender one static page per Selected Project that has a slug.
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      PORTFOLIO.selectedProjects
        .filter((p) => p.slug)
        .map((p) => ({ slug: p.slug as string })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
