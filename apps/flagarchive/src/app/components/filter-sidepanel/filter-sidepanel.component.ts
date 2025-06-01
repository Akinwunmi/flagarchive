import { CdkTrapFocus } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FlagCategory, Layout, SortDirection } from '@flagarchive/advanced-search';
import { EntityTypeItem } from '@flagarchive/entities';
import {
  AccordionComponent,
  CheckboxComponent,
  CollapsibleComponent,
  HyphenatePipe,
  IconComponent,
  ListItemComponent,
  SidepanelComponent,
  SidepanelService,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { Item } from '../../models';
import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AccordionComponent,
    CdkTrapFocus,
    CheckboxComponent,
    CollapsibleComponent,
    HyphenatePipe,
    IconComponent,
    ListItemComponent,
    SidepanelComponent,
    TranslatePipe,
  ],
  selector: 'app-filter-sidepanel',
  styleUrl: './filter-sidepanel.component.css',
  templateUrl: './filter-sidepanel.component.html',
})
export class FilterSidepanelComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #sidepanelService = inject(SidepanelService);

  #entities = this.#entitiesStore.entities;
  #entityTypes = this.#advancedSearchStore.entityTypes;
  activeFlagCategory = this.#advancedSearchStore.flagCategory;
  activeSortDirection = this.#advancedSearchStore.sortDirection;
  layout = this.#advancedSearchStore.layout;
  showOverseasRegions = this.#advancedSearchStore.showOverseasRegions;

  flagCategories = Object.values(FlagCategory);
  layoutOptions: Item[] = [
    { label: Layout.List, icon: 'splitscreen' },
    { label: Layout.Grid, icon: 'grid_view' },
  ];
  sortDirections = Object.values(SortDirection);

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
  isPartialEntityTypeSelection = computed(
    () =>
      this.amountOfSelectedEntityTypes() > 0 &&
      this.amountOfSelectedEntityTypes() < this.currentEntityTypes().length,
  );
  selectAllTranslation = computed(() =>
    this.amountOfSelectedEntityTypes() === this.currentEntityTypes().length
      ? 'deselect-all'
      : 'select-all',
  );

  close() {
    this.#sidepanelService.close();
  }

  isSelectedEntityType(label: string): boolean {
    return this.currentEntityTypes().find((type) => type.label === label)?.checked ?? false;
  }

  setFlagCategory(flagCategory: FlagCategory) {
    this.#advancedSearchStore.setFlagCategory(flagCategory);
  }

  setLayout(layout: string) {
    this.#advancedSearchStore.setLayout(layout as Layout);
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
