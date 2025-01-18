import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.active]': 'active()',
    '[class.disabled]': 'disabled()',
    '[class.interactive]': 'interactive()',
  },
})
export class ListItemComponent {
  active = input(false);
  disabled = input(false);
  interactive = input(true);
}
