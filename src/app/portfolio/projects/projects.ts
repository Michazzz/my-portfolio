import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Project } from '../portfolio.model';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
})
export class Projects {
  readonly items = input.required<Project[]>();
}
