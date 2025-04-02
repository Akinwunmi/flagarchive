import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-badge',
  styleUrl: './badge.component.css',
  templateUrl: './badge.component.html',
})
export class BadgeComponent {}
