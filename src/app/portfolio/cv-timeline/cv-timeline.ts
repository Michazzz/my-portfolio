import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CvEntry } from '../portfolio.model';

@Component({
  selector: 'app-cv-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cv-timeline.html',
})
export class CvTimeline {
  readonly entries = input.required<CvEntry[]>();
}
