import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Portfolio } from '../portfolio.model';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly data = input.required<Portfolio>();
}
