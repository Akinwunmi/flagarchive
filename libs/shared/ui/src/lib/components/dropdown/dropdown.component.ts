import { CdkTrapFocus } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, effect, input, model, viewChild } from '@angular/core';

import { DropdownTriggerDirective } from '../../directives';
import { BadgeComponent } from '../badge';
import { CardComponent } from '../card';
import { IconComponent } from '../icon';
import { ListComponent } from '../list';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BadgeComponent,
    CardComponent,
    CdkTrapFocus,
    DropdownTriggerDirective,
    IconComponent,
    ListComponent,
  ],
  selector: 'flag-dropdown',
  styleUrl: './dropdown.component.css',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  label = input.required();
  amountSelected = input(0);
  extraSmall = input(false);
  icon = input();
  hideChevron = input(false);
  secondary = input(false);
  small = input(false);

  isOpen = model(false);

  flagCategoriesMenu = viewChild.required(DropdownTriggerDirective);

  constructor() {
    effect(() => {
      if (!this.isOpen()) {
        this.flagCategoriesMenu().close();
      }
    });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isOpen.set(false);
    }
  }
}
