import { ChangeDetectionStrategy, Component, effect, input, model, viewChild } from '@angular/core';

import { DropdownTriggerDirective } from '../../directives';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '../icon/icon.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'flag-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownTriggerDirective, CardComponent, IconComponent, ListComponent],
})
export class DropdownComponent {
  label = input.required();
  extraSmall = input(false);
  icon = input();
  hideChevron = input(false);
  secondary = input(false);

  isOpen = model(false);

  flagCategoriesMenu = viewChild.required(DropdownTriggerDirective);

  constructor() {
    effect(() => {
      if (!this.isOpen()) {
        this.flagCategoriesMenu().close();
      }
    });
  }
}
