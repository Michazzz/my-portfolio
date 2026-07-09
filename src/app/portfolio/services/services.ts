import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CardItem } from '../portfolio.model';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
})
export class Services {
  readonly items = input.required<CardItem[]>();

  protected readonly toolbarGlyphs = [
    { icon: '⚙️', label: 'Filter' },
    { icon: '↕️', label: 'Sort' },
    { icon: '⚡', label: 'Automations' },
    { icon: '🔍', label: 'Search' },
    { icon: '⤢', label: 'Expand' },
  ];
}
