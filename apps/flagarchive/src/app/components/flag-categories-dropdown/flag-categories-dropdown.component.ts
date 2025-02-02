import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DropdownComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { FlagCategory } from '@flagarchive/advanced-search';
import { TranslationKeyPipe } from '../../pipes';
import { AdvancedSearchStore } from '../../state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownComponent, TranslatePipe, TranslationKeyPipe],
  selector: 'app-flag-categories-dropdown',
  styleUrl: './flag-categories-dropdown.component.css',
  templateUrl: './flag-categories-dropdown.component.html',
})
export class FlagCategoriesDropdownComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  flagCategory = this.#advancedSearchStore.flagCategory;

  flagCategories = Object.values(FlagCategory);

  isOpen = signal(false);

  updateFlagCategory(category: FlagCategory) {
    this.#advancedSearchStore.updateFlagCategory(category);
    this.isOpen.set(false);
  }
}
