import { computed, effect, inject } from '@angular/core';
import { FlagCategory, Layout, SortDirection } from '@flagarchive/advanced-search';
import { EntityType, EntityTypeItem } from '@flagarchive/entities';
import { CURRENT_YEAR, Device, ResizeObserverService } from '@flagarchive/ui';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

interface AdvancedSearchState {
  currentDevice: Device;
  entityTypes: EntityTypeItem[];
  flagCategory: FlagCategory;
  layout: Layout;
  selectedYear: number;
  showOverseasRegions: boolean;
  sortDirection: SortDirection;
}

const INITIAL_STATE: AdvancedSearchState = {
  currentDevice: 'desktop',
  entityTypes: Object.values(EntityType).map((type) => ({
    checked: true,
    label: type,
  })),
  flagCategory: FlagCategory.NationalFlag,
  layout: Layout.Grid,
  selectedYear: CURRENT_YEAR,
  showOverseasRegions: false,
  sortDirection: SortDirection.Asc,
};

export const AdvancedSearchStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withProps(() => ({
    _resizeObserverService: inject(ResizeObserverService),
  })),
  withComputed((store) => ({
    isDesktop: computed(() => store.currentDevice() === 'desktop'),
    isMobile: computed(() => store.currentDevice() === 'mobile'),
    isTablet: computed(() => store.currentDevice() === 'tablet'),
  })),
  withMethods((store) => ({
    setCurrentDevice(currentDevice: Device) {
      patchState(store, { currentDevice });
    },
    setFlagCategory(flagCategory: FlagCategory) {
      patchState(store, { flagCategory });
    },
    setLayout(layout: Layout) {
      patchState(store, { layout });
    },
    setSelectedYear(selectedYear: number) {
      patchState(store, { selectedYear });
    },
    setSortDirection(sortDirection: SortDirection) {
      patchState(store, { sortDirection });
    },
    toggleEntityType(currentType: EntityTypeItem, checked: boolean) {
      patchState(store, {
        entityTypes: store
          .entityTypes()
          .map((type) => (type.label === currentType.label ? { ...type, checked } : type)),
      });
    },
    toggleShowOverseasRegions() {
      patchState(store, { showOverseasRegions: !store.showOverseasRegions() });
    },
    triggerSortDirection() {
      Array.from({ length: 2 }).forEach(() => {
        patchState(store, {
          sortDirection:
            store.sortDirection() === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc,
        });
      });
    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const device = store._resizeObserverService.device();
        if (device !== store.currentDevice()) {
          store.setCurrentDevice(device);
        }
      });
    },
  }),
);
