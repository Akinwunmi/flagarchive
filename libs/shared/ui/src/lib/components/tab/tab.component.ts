import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-tab',
  styleUrl: './tab.component.css',
  templateUrl: './tab.component.html',
})
export class TabComponent {}
