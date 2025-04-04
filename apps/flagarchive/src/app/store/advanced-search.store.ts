import { FlagCategory, Layout, SortDirection } from '@flagarchive/advanced-search';
import { EntityType, EntityTypeItem } from '@flagarchive/entities';
import { CURRENT_YEAR } from '@flagarchive/ui';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface AdvancedSearchState {
  entityTypes: EntityTypeItem[];
  flagCategory: FlagCategory;
  layout: Layout;
  selectedYear: number;
  showOverseasRegions: boolean;
  sortDirection: SortDirection;
}

const INITIAL_STATE: AdvancedSearchState = {
  entityTypes: Object.values(EntityType).map((type) => ({
    checked: true,
    label: type,
  })),
  flagCategory: FlagCategory.Official,
  layout: Layout.Grid,
  selectedYear: CURRENT_YEAR,
  showOverseasRegions: false,
  sortDirection: SortDirection.Asc,
};

export const AdvancedSearchStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withMethods((state) => ({
    setFlagCategory(flagCategory: FlagCategory) {
      patchState(state, { flagCategory });
    },
    setLayout(layout: Layout) {
      patchState(state, { layout });
    },
    setSelectedYear(selectedYear: number) {
      patchState(state, { selectedYear });
    },
    setSortDirection(sortDirection: SortDirection) {
      patchState(state, { sortDirection });
    },
    toggleEntityType(currentType: EntityTypeItem, checked: boolean) {
      patchState(state, {
        entityTypes: state
          .entityTypes()
          .map((type) => (type.label === currentType.label ? { ...type, checked } : type)),
      });
    },
    toggleShowOverseasRegions() {
      patchState(state, { showOverseasRegions: !state.showOverseasRegions() });
    },
  })),
);
