import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import {
  CardComponent,
  DropdownTriggerDirective,
  IconComponent,
} from '@flagarchive/ui';
import { TranslateModule } from '@ngx-translate/core';

import { FlagCategory } from '../../models';
import { TranslationKeyPipe } from '../../pipes';
import { AdvancedSearchStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    DropdownTriggerDirective,
    IconComponent,
    TranslateModule,
    TranslationKeyPipe,
  ],
  selector: 'app-flag-categories-button',
  styleUrl: './flag-categories-button.component.css',
  templateUrl: './flag-categories-button.component.html',
})
export class FlagCategoriesButtonComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  flagCategoriesMenu = viewChild.required(DropdownTriggerDirective);

  flagCategory = this.#advancedSearchStore.flagCategory;

  flagCategories = Object.values(FlagCategory);

  updateFlagCategory(category: FlagCategory) {
    this.#advancedSearchStore.updateFlagCategory(category);
    this.flagCategoriesMenu().close();
  }
}
