import { Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FlagCategory, Layout, SortDirection } from '@flagarchive/advanced-search';
import { EntityTypeItem } from '@flagarchive/entities';
import {
  CheckboxComponent,
  DropdownComponent,
  HyphenatePipe,
  IconComponent,
  ListItemComponent,
  YearNavigatorComponent,
} from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Item } from '../../models';
import { AdvancedSearchStore, EntitiesStore } from '../../store';
import { tap } from 'rxjs';

@Component({
  imports: [
    CheckboxComponent,
    DropdownComponent,
    HyphenatePipe,
    IconComponent,
    ListItemComponent,
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
  readonly #translate = inject(TranslateService);

  #entities = this.#entitiesStore.entities;
  #entityTypes = this.#advancedSearchStore.entityTypes;
  #selectedYear = this.#advancedSearchStore.selectedYear;
  activeFlagCategory = this.#advancedSearchStore.flagCategory;
  activeSortDirection = this.#advancedSearchStore.sortDirection;
  currentRange = this.#entitiesStore.currentRange;
  isMainEntity = this.#entitiesStore.isMainEntity;
  layout = this.#advancedSearchStore.layout;
  showOverseasRegions = this.#advancedSearchStore.showOverseasRegions;

  // TODO: This should be moved to the advanced search store
  amountOfSelectedEntityTypes = computed(
    () => this.currentEntityTypes().filter((type) => type.checked).length,
  );
  currentEntityTypes = computed(() =>
    this.#entityTypes().filter((type) =>
      this.#entities()
        .map((entity) => entity.type)
        .includes(type.label),
    ),
  );
  selectAllTranslation = computed(() =>
    this.amountOfSelectedEntityTypes() === this.currentEntityTypes().length
      ? 'deselect-all'
      : 'select-all',
  );

  layoutOptions: Item[] = [
    { label: Layout.List, icon: 'splitscreen' },
    { label: Layout.Grid, icon: 'grid_view' },
  ];

  flagCategories = Object.values(FlagCategory);
  sortDirections = Object.values(SortDirection);

  getCurrentLanguage(): string {
    return this.#translate.currentLang;
  }

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

  isPartialEntityTypeSelection(): boolean {
    return (
      this.amountOfSelectedEntityTypes() > 0 &&
      this.amountOfSelectedEntityTypes() < this.currentEntityTypes().length
    );
  }

  isSelectedEntityType(label: string): boolean {
    return this.currentEntityTypes().find((type) => type.label === label)?.checked ?? false;
  }

  setFlagCategory(flagCategory: FlagCategory) {
    this.#advancedSearchStore.setFlagCategory(flagCategory);
  }

  setLanguage(language: string) {
    this.#translate
      .use(language)
      .pipe(
        tap(() => this.#advancedSearchStore.triggerSortDirection()),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }

  setLayout(layout: string) {
    this.#advancedSearchStore.setLayout(layout as Layout);
  }

  setSelectedYear(selectedYear: number) {
    this.#advancedSearchStore.setSelectedYear(selectedYear);
  }

  setSortDirection(sortDirection: SortDirection) {
    this.#advancedSearchStore.setSortDirection(sortDirection);
  }

  toggleAllEntityTypes(checked: boolean) {
    this.#entityTypes().forEach((type) => {
      this.#advancedSearchStore.toggleEntityType(type, checked);
    });
  }

  toggleEntityType(type: EntityTypeItem, checked: boolean) {
    this.#advancedSearchStore.toggleEntityType(type, checked);
  }

  toggleShowOverseasRegions() {
    this.#advancedSearchStore.toggleShowOverseasRegions();
  }
}
