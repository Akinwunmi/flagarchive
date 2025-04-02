import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'list',
  },
  selector: 'flag-list',
  styleUrl: './list.component.css',
  templateUrl: './list.component.html',
})
export class ListComponent {}
