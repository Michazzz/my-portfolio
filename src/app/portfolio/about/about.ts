import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { Portfolio } from '../portfolio.model';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './about.html',
})
export class About {
  readonly data = input.required<Portfolio>();
}
