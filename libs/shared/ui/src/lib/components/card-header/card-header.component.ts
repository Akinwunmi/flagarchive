import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-card-header',
  imports: [],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {}
