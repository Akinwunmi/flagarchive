import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent, YearNavigatorComponent } from '@flagarchive/ui';

import { AdvancedSearchStore, EntitiesStore } from '../../store';
import { FiltersAndSortingPanelService } from '../filters-and-sorting-panel';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, YearNavigatorComponent],
  selector: 'app-advanced-search-bar',
  styleUrl: './advanced-search-bar.component.css',
  templateUrl: './advanced-search-bar.component.html',
})
export class AdvancedSearchBarComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #filtersAndSortingPanelService = inject(FiltersAndSortingPanelService);

  #selectedYear = this.#advancedSearchStore.selectedYear;
  currentRange = this.#entitiesStore.currentRange;
  isFilterPanelOpen = this.#filtersAndSortingPanelService.isOpen;

  getSelectedYear(): number {
    const [firstYear, lastYear] = this.currentRange();
    const selectedYear = this.#selectedYear();

    if (selectedYear < firstYear) {
      return firstYear;
    }

    if (selectedYear > lastYear) {
      return lastYear;
    }

    return selectedYear;
  }

  openFilterSidePanel() {
    this.#filtersAndSortingPanelService.open();
  }

  setSelectedYear(selectedYear: number) {
    this.#advancedSearchStore.setSelectedYear(selectedYear);
  }
}
