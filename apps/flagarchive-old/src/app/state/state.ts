import {
  FlagCategory,
  Layout,
  SortDirection,
} from '@flagarchive/advanced-search';

import { DefaultMainEntity } from '../models';

import { AppState } from './state.model';

const currentYear = new Date().getFullYear();

export const initialState: AppState = {
  advancedSearch: {
    flagCategory: FlagCategory.Official,
    layout: Layout.Grid,
    maxYear: currentYear,
    minYear: currentYear,
    selectedYear: currentYear,
    sortDirection: SortDirection.Asc,
  },
  entities: {
    all: [],
    current: [],
    foundEntity: undefined,
    main: [],
    selectedId: DefaultMainEntity.Continents,
  },
  errors: {
    all: [],
  },
};
