import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { SelectedProject } from '../portfolio.model';

@Component({
  selector: 'app-achievements',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './achievements.html',
})
export class Achievements {
  readonly items = input.required<SelectedProject[]>();
  readonly highlights = input.required<string[]>();
}
