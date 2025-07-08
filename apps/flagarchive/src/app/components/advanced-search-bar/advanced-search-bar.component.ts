import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FlagCategory, NATIONAL_CATEGORIES } from '@flagarchive/advanced-search';
import {
  DropdownComponent,
  HyphenatePipe,
  IconComponent,
  SidepanelService,
  YearNavigatorComponent,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AdvancedSearchStore, EntitiesStore } from '../../store';
import { FilterSidepanelComponent } from '../filter-sidepanel';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DropdownComponent,
    FilterSidepanelComponent,
    HyphenatePipe,
    IconComponent,
    TranslatePipe,
    YearNavigatorComponent,
  ],
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
  activeCategory = this.#advancedSearchStore.flagCategory;
  isDesktop = this.#advancedSearchStore.isDesktop;

  categories = signal(this.#setCategories());
  isCategoryDropdownOpen = signal(false);

  showCategoryDropdown = computed(() => {
    return ![FlagCategory.CommunityFlag, FlagCategory.InstitutionalFlag].includes(
      this.activeCategory(),
    );
  });

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

  selectCategory(category: FlagCategory) {
    this.#advancedSearchStore.setFlagCategory(category);
    this.isCategoryDropdownOpen.set(false);
  }

  setSelectedYear(selectedYear: number) {
    this.#advancedSearchStore.setSelectedYear(selectedYear);
  }

  #setCategories() {
    return Object.values(FlagCategory).filter((category) => NATIONAL_CATEGORIES.includes(category));
  }
}
