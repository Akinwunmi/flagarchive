import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';

import { AccordionService } from '../accordion';
import { BadgeComponent } from '../badge';
import { IconComponent } from '../icon';
import { COLLAPSIBLE_ANIMATION } from './collapsible.animation';

@Component({
  animations: [COLLAPSIBLE_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, IconComponent],
  selector: 'flag-collapsible',
  styleUrl: './collapsible.component.css',
  templateUrl: './collapsible.component.html',
})
export class CollapsibleComponent {
  readonly #accordionService = inject(AccordionService);

  icon = input.required<string>();
  label = input.required<string>();
  count = input<number>();
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
