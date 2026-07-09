import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { TechIcon } from '../tech-icon/tech-icon';
import { SkillGroup } from '../portfolio.model';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TechIcon],
  templateUrl: './skills.html',
})
export class Skills {
  readonly groups = input.required<SkillGroup[]>();
}
