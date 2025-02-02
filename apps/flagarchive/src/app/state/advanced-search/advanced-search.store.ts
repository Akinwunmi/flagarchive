import {
  FlagCategory,
  Layout,
  SortDirection,
} from '@flagarchive/advanced-search';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { initialState } from '../state';

export const AdvancedSearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState.advancedSearch),
  withMethods((store) => ({
    triggerSortDirection() {
      Array.from({ length: 2 }).forEach(() => {
        patchState(store, {
          sortDirection:
            store.sortDirection() === SortDirection.Asc
              ? SortDirection.Desc
              : SortDirection.Asc,
        });
      });
    },
    updateFlagCategory(flagCategory: FlagCategory) {
      patchState(store, { flagCategory });
    },
    updateLayout(layout: Layout) {
      patchState(store, { layout });
    },
    updateMaxYear(maxYear: number) {
      patchState(store, { maxYear });
    },
    updateMinYear(minYear: number) {
      patchState(store, { minYear });
    },
    updateSelectedYear(selectedYear: number) {
      patchState(store, { selectedYear });
    },
    updateSortDirection(sortDirection: SortDirection) {
      patchState(store, { sortDirection });
    },
  }))
);
