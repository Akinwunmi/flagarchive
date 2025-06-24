import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent, SidepanelService, YearNavigatorComponent } from '@flagarchive/ui';

import { AdvancedSearchStore, EntitiesStore } from '../../store';
import { FilterSidepanelComponent } from '../filter-sidepanel';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FilterSidepanelComponent, IconComponent, YearNavigatorComponent],
  selector: 'app-advanced-search-bar',
  styleUrl: './advanced-search-bar.component.css',
  templateUrl: './advanced-search-bar.component.html',
})
export class AdvancedSearchBarComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #destroyRef = inject(DestroyRef);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #sidepanelService = inject(SidepanelService);
  readonly #viewContainerRef = inject(ViewContainerRef);

  showFilterButton = input(true);

  filterSidepanel = viewChild.required<TemplateRef<FilterSidepanelComponent>>('filterSidepanel');

  #selectedYear = this.#advancedSearchStore.selectedYear;
  currentRange = this.#entitiesStore.currentRange;

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

  openFilterSidepanel() {
    this.#sidepanelService
      .open(this.filterSidepanel(), this.#viewContainerRef)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }

  setSelectedYear(selectedYear: number) {
    this.#advancedSearchStore.setSelectedYear(selectedYear);
  }
}
