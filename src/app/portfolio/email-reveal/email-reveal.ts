import { Component, ChangeDetectionStrategy, input, signal, computed } from '@angular/core';
import { Icon } from '../icon/icon';

/**
 * Shows a "Show email" button and only assembles `user@domain` on click, so the
 * full address never sits in the static DOM/bundle for harvesters to scrape.
 */
@Component({
  selector: 'app-email-reveal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // `contents` makes this host transparent so the inner card is the grid item.
  host: { class: 'contents' },
  imports: [Icon],
  templateUrl: './email-reveal.html',
})
export class EmailReveal {
  readonly user = input.required<string>();
  readonly domain = input.required<string>();

  protected readonly revealed = signal(false);
  protected readonly address = computed(() => `${this.user()}@${this.domain()}`);

  protected reveal(): void {
    this.revealed.set(true);
  }
}
