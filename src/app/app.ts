import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Portfolio } from './portfolio/portfolio';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Portfolio],
  template: `<app-portfolio />`,
})
export class App {}
