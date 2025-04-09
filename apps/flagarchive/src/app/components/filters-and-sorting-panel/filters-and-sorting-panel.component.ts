import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FlagCategory, Layout, SortDirection } from '@flagarchive/advanced-search';
import { EntityTypeItem } from '@flagarchive/entities';
import {
  AccordionComponent,
  CheckboxComponent,
  CollapsibleComponent,
  HyphenatePipe,
  IconComponent,
  ListItemComponent,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';
import { timer } from 'rxjs';

import { Item } from '../../models';
import { AdvancedSearchStore, EntitiesStore } from '../../store';
import { PANEL_ANIMATION } from './filters-and-sorting-panel.animation';
import { FiltersAndSortingPanelService } from './filters-and-sorting-panel.service';

@Component({
  animations: [PANEL_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[@panelState]': 'panelState()',
  },
  imports: [
    AccordionComponent,
    CheckboxComponent,
    CollapsibleComponent,
    HyphenatePipe,
    IconComponent,
    ListItemComponent,
    TranslatePipe,
  ],
  selector: 'app-filters-and-sorting-panel',
  styleUrl: './filters-and-sorting-panel.component.css',
  templateUrl: './filters-and-sorting-panel.component.html',
})
export class FiltersAndSortingPanelComponent implements OnInit {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #filtersAndSortingPanelService = inject(FiltersAndSortingPanelService);

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

  panelState = signal<'open' | 'closed'>('closed');

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

  ngOnInit() {
    requestAnimationFrame(() => {
      this.panelState.set('open');
    });
  }

  close() {
    this.panelState.set('closed');
    timer(400).subscribe(() => {
      this.#filtersAndSortingPanelService.close();
    });
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
