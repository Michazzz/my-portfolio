import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { CvTimeline } from '../cv-timeline/cv-timeline';
import { EmailReveal } from '../email-reveal/email-reveal';
import { CV_ENTRIES } from '../cv.data';
import { Portfolio } from '../portfolio.model';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, CvTimeline, EmailReveal],
  templateUrl: './about.html',
})
export class About {
  readonly data = input.required<Portfolio>();
  protected readonly cv = CV_ENTRIES;
}
