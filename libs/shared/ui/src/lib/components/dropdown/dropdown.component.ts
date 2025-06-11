import { CdkTrapFocus } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, effect, input, model, viewChild } from '@angular/core';

import { BadgeComponent } from '../badge';
import { CardComponent } from '../card';
import { IconComponent } from '../icon';
import { ListComponent } from '../list';
import { DropdownDirective } from './dropdown.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BadgeComponent,
    CardComponent,
    CdkTrapFocus,
    DropdownDirective,
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

  flagCategoriesMenu = viewChild.required(DropdownDirective);

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
