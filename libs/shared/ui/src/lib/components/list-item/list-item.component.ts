import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'listitem',
    '[attr.highlighted]': 'highlighted() || undefined',
    '[attr.secondary]': 'secondary() || undefined',
    '[class.disabled]': 'disabled()',
  },
  selector: 'flag-list-item',
  styleUrl: './list-item.component.css',
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  disabled = input(false);
  highlighted = input(false);
  secondary = input(false);
}
