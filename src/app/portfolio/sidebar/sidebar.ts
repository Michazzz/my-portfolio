import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { Portfolio } from '../portfolio.model';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly data = input.required<Portfolio>();
}
