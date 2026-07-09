import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Sidebar } from '../sidebar/sidebar';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Achievements } from '../achievements/achievements';
import { Projects } from '../projects/projects';
import { PORTFOLIO } from '../portfolio.data';

type TabId = 'about' | 'skills' | 'achievements' | 'projects';

@Component({
  selector: 'app-portfolio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Sidebar, About, Skills, Achievements, Projects],
  templateUrl: './portfolio.html',
})
export class Portfolio {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly data = PORTFOLIO;

  protected readonly tabs: readonly { id: TabId; label: string }[] = [
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'projects', label: 'Projects' },
  ];

  private readonly tabIds = new Set<TabId>(this.tabs.map((t) => t.id));

  /** Active tab is driven by the `?tab=` query param (shareable + back-button friendly). */
  protected readonly activeTab = toSignal(
    this.route.queryParamMap.pipe(map((params) => this.normalize(params.get('tab')))),
    { initialValue: 'about' as TabId },
  );

  protected selectTab(id: TabId): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: id },
      queryParamsHandling: 'merge',
    });
  }

  private normalize(value: string | null): TabId {
    return value && this.tabIds.has(value as TabId) ? (value as TabId) : 'about';
  }
}
