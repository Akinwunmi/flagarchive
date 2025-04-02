import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-card',
  styleUrl: './card.component.css',
  templateUrl: './card.component.html',
})
export class CardComponent {}
