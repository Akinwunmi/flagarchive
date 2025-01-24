import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PillTheme, PillType } from './pill.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'getClass()',
  },
  selector: 'flag-pill',
  styleUrl: './pill.component.css',
  templateUrl: './pill.component.html',
})
export class PillComponent {
  theme = input<PillTheme>('light');
  type = input<PillType>('primary');

  getClass(): string {
    return `${this.theme()} ${this.type()}`;
  }
}
