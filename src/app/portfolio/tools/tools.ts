import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CardItem } from '../portfolio.model';

@Component({
  selector: 'app-tools',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tools.html',
})
export class Tools {
  readonly items = input.required<CardItem[]>();
}
