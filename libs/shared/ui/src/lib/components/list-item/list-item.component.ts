import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'flag-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'listitem',
    '[class.disabled]': 'disabled()',
  },
})
export class ListItemComponent {
  disabled = input(false);
}
