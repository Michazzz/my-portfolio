import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { About } from '../about/about';
import { Services } from '../services/services';
import { Tools } from '../tools/tools';
import { PORTFOLIO } from '../portfolio.data';

@Component({
  selector: 'app-portfolio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Sidebar, About, Services, Tools],
  templateUrl: './portfolio.html',
})
export class Portfolio {
  protected readonly data = PORTFOLIO;
}
