import { Routes } from '@angular/router';
import { Portfolio } from './portfolio/portfolio/portfolio';

export const routes: Routes = [
  { path: '', component: Portfolio },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./portfolio/case-study/case-study').then((m) => m.CaseStudy),
  },
  { path: '**', redirectTo: '' },
];
