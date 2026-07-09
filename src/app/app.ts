import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Portfolio } from './portfolio/portfolio/portfolio';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Portfolio],
  templateUrl: './app.html',
})
export class App {}
