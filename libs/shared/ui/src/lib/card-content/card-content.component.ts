import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-card-content',
  imports: [],
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent {}