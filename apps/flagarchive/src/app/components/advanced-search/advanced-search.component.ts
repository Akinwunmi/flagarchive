import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { EntityType } from '@flagarchive/entities';
import {
  DropdownTriggerDirective,
  IconComponent,
  YearNavigatorComponent,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AdvancedSearchStore, EntitiesStore } from '../../state';
import { AdvancedSearchMenuComponent } from '../advanced-search-menu/advanced-search-menu.component';
import { FlagCategoriesDropdownComponent } from '../flag-categories-dropdown/flag-categories-dropdown.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchMenuComponent,
    DropdownTriggerDirective,
    FlagCategoriesDropdownComponent,
    IconComponent,
    TranslatePipe,
    YearNavigatorComponent,
  ],
  selector: 'app-advanced-search',
  styleUrl: './advanced-search.component.css',
  templateUrl: './advanced-search.component.html',
})
export class AdvancedSearchComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  maxYear = this.#advancedSearchStore.maxYear;
  minYear = this.#advancedSearchStore.minYear;
  selected = this.#entitiesStore.selected;
  selectedYear = this.#advancedSearchStore.selectedYear;

  isMainEntity = computed(() => {
    const selected = this.selected();
    return (
      selected?.entity?.type &&
      Object.values(EntityType).includes(selected.entity.type as EntityType)
    );
  });

  setSelectedYear(year: number) {
    this.#advancedSearchStore.updateSelectedYear(year);
  }
}
