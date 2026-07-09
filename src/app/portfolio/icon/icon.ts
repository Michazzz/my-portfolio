import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { IconKey } from '../portfolio.model';

/** Small inline-SVG icon set so the page has no external icon dependency. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.html',
})
export class Icon {
  readonly name = input.required<IconKey>();
}
