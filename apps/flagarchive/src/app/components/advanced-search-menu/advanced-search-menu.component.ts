import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  FilterOption,
  Layout,
  SortDirection,
} from '@flagarchive/advanced-search';
import { CardComponent, IconComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AdvancedSearchStore } from '../../state';
import { FlagCategoriesDropdownComponent } from '../flag-categories-dropdown/flag-categories-dropdown.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    FlagCategoriesDropdownComponent,
    IconComponent,
    TranslatePipe,
  ],
  selector: 'app-advanced-search-menu',
  styleUrl: './advanced-search-menu.component.css',
  templateUrl: './advanced-search-menu.component.html',
})
export class AdvancedSearchMenuComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  #layout = this.#advancedSearchStore.layout;
  #sortDirection = this.#advancedSearchStore.sortDirection;

  layoutOptions = computed<FilterOption<Layout>[]>(() =>
    Object.values(Layout)
      .map((value) => ({
        active: this.#layout() === value,
        icon: value === Layout.Grid ? 'grid_view' : 'splitscreen',
        value,
      }))
      .reverse()
  );

  sortOptions = computed<FilterOption<SortDirection>[]>(() =>
    Object.values(SortDirection).map((value) => ({
      active: this.#sortDirection() === value,
      label: 'advanced-search.sorting.name.' + value,
      value,
    }))
  );

  updateLayout(layout: Layout) {
    this.#advancedSearchStore.updateLayout(layout);
  }

  updateSortDirection(direction: SortDirection) {
    this.#advancedSearchStore.updateSortDirection(direction);
  }
}
