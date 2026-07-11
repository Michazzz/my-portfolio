import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Project } from '../portfolio.model';
import { TechIcon } from '../tech-icon/tech-icon';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  imports: [TechIcon, Icon],
})
export class Projects {
  readonly items = input.required<Project[]>();
  readonly gitHub = 'GitHub';
}
