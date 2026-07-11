import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { IconKey } from '../portfolio.model';

/** Small inline-SVG icon set so the page has no external icon dependency. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.html',
})
export class Icon {
  readonly name = input.required<IconKey>();
  /** `sm` (default) is the inline size; `lg` is 64px (e.g. project links). */
  readonly size = input<'sm' | 'lg'>('sm');

  protected readonly sizeClass = computed(() =>
    this.size() === 'lg' ? 'size-12 shrink-0' : 'size-4 shrink-0',
  );
}
