import {
  FlagCategory,
  Layout,
  SortDirection,
} from '@flagarchive/advanced-search';
import { Entity } from '@flagarchive/entities';

export interface AppState {
  advancedSearch: AdvancedSearchState;
  entities: EntitiesState;
  errors: ErrorsState;
}

export interface AdvancedSearchState {
  flagCategory: FlagCategory;
  layout: Layout;
  maxYear: number;
  minYear: number;
  selectedYear: number;
  sortDirection: SortDirection;
}

export interface EntitiesState {
  all: Entity[];
  current: Entity[];
  foundEntity: Entity | undefined;
  main: Entity[];
  selectedId: string;
}

export interface ErrorsState {
  all: unknown[];
}
