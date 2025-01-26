import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flag-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
