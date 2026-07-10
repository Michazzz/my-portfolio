import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { Portfolio } from '../portfolio.model';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly data = input.required<Portfolio>();

  /** Splits the greeting around the name so the name can be rendered in bold. */
  protected readonly greetingParts = computed(() => this.data().greeting.split(this.data().name));
}
