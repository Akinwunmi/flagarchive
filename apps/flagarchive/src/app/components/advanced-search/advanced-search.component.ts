import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DropdownTriggerDirective, IconComponent } from '@flagarchive/ui';

import { EntityType } from '../../models';
import { AdvancedSearchStore, EntitiesStore } from '../../state';
import { AdvancedSearchMenuComponent } from '../advanced-search-menu/advanced-search-menu.component';
import { FlagCategoriesButtonComponent } from '../flag-categories-button/flag-categories-button.component';
import { YearNavigatorComponent } from '../year-navigator/year-navigator.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchMenuComponent,
    FlagCategoriesButtonComponent,
    DropdownTriggerDirective,
    IconComponent,
    YearNavigatorComponent,
  ],
  selector: 'app-advanced-search',
  styleUrl: './advanced-search.component.css',
  templateUrl: './advanced-search.component.html',
})
export class AdvancedSearchComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  selected = this.#entitiesStore.selected;
  maxYear = this.#advancedSearchStore.maxYear;
  minYear = this.#advancedSearchStore.minYear;

  isMainEntity = computed(() => {
    const selected = this.selected();
    return (
      selected?.entity?.type &&
      Object.values(EntityType).includes(selected.entity.type as EntityType)
    );
  });
}
