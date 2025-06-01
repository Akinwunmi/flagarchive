import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-tab-group',
  styleUrl: './tab-group.component.css',
  templateUrl: './tab-group.component.html',
})
export class TabGroupComponent {}
