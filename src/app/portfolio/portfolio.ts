import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Sidebar } from './sidebar';
import { About } from './about';
import { Services } from './services';
import { Tools } from './tools';
import { PORTFOLIO } from './portfolio.data';

@Component({
  selector: 'app-portfolio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Sidebar, About, Services, Tools],
  template: `
    <div class="min-h-screen bg-base-100 text-base-content">
      <div class="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <!-- Brand -->
        <header class="mb-10 border-b border-base-content/10 pb-5">
          <h1 class="text-4xl font-extrabold tracking-tight">{{ data.brand }}</h1>
        </header>

        <!-- Two-column layout -->
        <div class="grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside>
            <app-sidebar [data]="data" />
          </aside>

          <main class="flex flex-col gap-12">
            <app-about [data]="data" />
            <app-services [items]="data.services" />
            <app-tools [items]="data.tools" />
          </main>
        </div>
      </div>
    </div>
  `,
})
export class Portfolio {
  protected readonly data = PORTFOLIO;
}
