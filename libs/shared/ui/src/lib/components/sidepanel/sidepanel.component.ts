import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { IconComponent } from '../icon';
import { SidepanelService } from './sidepanel.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.large]': 'large()',
  },
  imports: [IconComponent],
  selector: 'flag-sidepanel',
  styleUrl: './sidepanel.component.css',
  templateUrl: './sidepanel.component.html',
})
export class SidepanelComponent {
  readonly #sidepanelService = inject(SidepanelService);

  title = input.required<string>();
  icon = input<string>();
  large = input(false);

  close() {
    this.#sidepanelService.close();
  }
}
