import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedProject } from '../portfolio.model';
import { PORTFOLIO } from '../portfolio.data';
import { SeoService } from '../../core/seo.service';

/** Full case-study page for one Selected Project, served at `/projects/:slug`. */
@Component({
  selector: 'app-case-study',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './case-study.html',
})
export class CaseStudy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  protected readonly name = PORTFOLIO.name;
  protected readonly project = this.resolve();

  /** Look up the project by slug, set its SEO tags, or bounce unknown slugs home. */
  private resolve(): SelectedProject | undefined {
    const slug = this.route.snapshot.paramMap.get('slug');
    const project = PORTFOLIO.selectedProjects.find((p) => p.slug === slug);

    if (!project) {
      this.router.navigateByUrl('/');
      return undefined;
    }

    this.seo.setPage({
      title: `${project.title} — Case Study`,
      description: project.description,
      path: `/projects/${project.slug}`,
      siteName: PORTFOLIO.name,
    });
    return project;
  }
}
