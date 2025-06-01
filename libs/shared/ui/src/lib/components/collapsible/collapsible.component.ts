import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';

import { AccordionService } from '../accordion';
import { BadgeComponent } from '../badge';
import { IconComponent } from '../icon';
import { PillComponent } from '../pill';
import { COLLAPSIBLE_ANIMATION } from './collapsible.animation';

@Component({
  animations: [COLLAPSIBLE_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, IconComponent, PillComponent],
  selector: 'flag-collapsible',
  styleUrl: './collapsible.component.css',
  templateUrl: './collapsible.component.html',
})
export class CollapsibleComponent {
  readonly #accordionService = inject(AccordionService);

  label = input.required<string>();
  count = input<number>();
  icon = input<string>();
  pillLabel = input<string>();
  secondary = input(false);

  expanded = model(false);

  uuid = crypto.randomUUID();

  toggle() {
    this.expanded.update((expanded) => !expanded);
    if (this.expanded()) {
      this.#accordionService.setExpandedCollapsible(this.uuid);
    }
  }
}
