import { ChangeDetectionStrategy, Component, contentChildren, effect, inject } from '@angular/core';

import { AccordionService } from './accordion.service';
import { CollapsibleComponent } from '../collapsible';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-accordion',
  templateUrl: './accordion.component.html',
})
export class AccordionComponent {
  readonly #accordionService = inject(AccordionService);

  collapsibles = contentChildren(CollapsibleComponent);

  constructor() {
    effect(() => {
      this.collapsibles().forEach((collapsible) => {
        this.#accordionService.registerCollapsible(collapsible.uuid);

        collapsible.expanded.set(collapsible.uuid === this.#accordionService.expandedCollapsible());
      });
    });
  }
}
