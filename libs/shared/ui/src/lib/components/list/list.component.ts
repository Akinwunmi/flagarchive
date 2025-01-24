import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flag-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'list',
  },
})
export class ListComponent {}
