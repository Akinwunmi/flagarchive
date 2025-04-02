import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-card-header',
  styleUrl: './card-header.component.css',
  templateUrl: './card-header.component.html',
})
export class CardHeaderComponent {}
