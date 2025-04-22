import { computed, inject } from '@angular/core';
import { sortBy } from '@flagarchive/advanced-search';
import { Entity, EntityType } from '@flagarchive/entities';
import { ToastService } from '@flagarchive/ui';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { pipe, switchMap } from 'rxjs';

import { EntityService } from '../services';
import { AdvancedSearchStore } from './advanced-search.store';
import { setCurrentRange, setFilteredEntities } from './entities.utils';

interface EntitiesState {
  entities: Entity[];
  flagOfTheDay: Entity | undefined;
  mainEntities: Entity[];
  newestAdditions: Entity[];
  selectedEntity: Entity | undefined;
}

const INITIAL_STATE: EntitiesState = {
  entities: [],
  flagOfTheDay: undefined,
  mainEntities: [],
  newestAdditions: [],
  selectedEntity: undefined,
};

export const EntitiesStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withComputed(
    (
      state,
      advancedSearchStore = inject(AdvancedSearchStore),
      translateService = inject(TranslateService),
    ) => ({
      continents: computed(() =>
        state.mainEntities().filter((entity) => entity.type === EntityType.Continent),
      ),
      currentRange: computed(() =>
        setCurrentRange(state.selectedEntity()?.ranges ?? [], state.entities()),
      ),
      filteredEntities: computed(() =>
        setFilteredEntities(
          advancedSearchStore,
          state.entities(),
          state.selectedEntity(),
          translateService,
        ),
      ),
      globalEntities: computed(() =>
        state.mainEntities().filter((entity) => entity.type === EntityType.Organization),
      ),
      isMainEntity: computed(
        () =>
          state.selectedEntity()?.type === EntityType.Continent ||
          state.selectedEntity()?.type === EntityType.Organization,
      ),
    }),
  ),
  withMethods(
    (
      store,
      advancedSearchStore = inject(AdvancedSearchStore),
      entityService = inject(EntityService),
      toastService = inject(ToastService),
      translateService = inject(TranslateService),
    ) => ({
      loadEntities: rxMethod<string>(
        pipe(
          switchMap((id) =>
            entityService.getEntityById(id).pipe(
              tapResponse({
                next: (selectedEntity) => patchState(store, { selectedEntity }),
                error: (error: Error) => toastService.open(error.message),
              }),
            ),
          ),
          switchMap((entity) =>
            entityService.getEntitiesByParentId(entity?.id ?? '', true).pipe(
              tapResponse({
                next: (entities) =>
                  patchState(store, {
                    entities: sortBy(
                      entities,
                      'name',
                      advancedSearchStore.sortDirection(),
                      translateService,
                    ),
                  }),
                error: (error: Error) => toastService.open(error.message),
              }),
            ),
          ),
        ),
      ),
      loadFlagOfTheDay: rxMethod<void>(
        pipe(
          switchMap(() =>
            entityService.getFlagOfTheDay().pipe(
              tapResponse({
                next: (flagOfTheDay) => patchState(store, { flagOfTheDay }),
                error: (error: Error) => toastService.open(error.message),
              }),
            ),
          ),
        ),
      ),
      loadMainEntities: rxMethod<void>(
        pipe(
          switchMap(() =>
            entityService.getEntitiesByType(['continent', 'organization']).pipe(
              tapResponse({
                next: (mainEntities) =>
                  patchState(store, {
                    mainEntities: sortBy(
                      mainEntities,
                      'name',
                      advancedSearchStore.sortDirection(),
                      translateService,
                    ),
                  }),
                error: (error: Error) => toastService.open(error.message),
              }),
            ),
          ),
        ),
      ),
      loadNewestAdditions: rxMethod<void>(
        pipe(
          switchMap(() =>
            entityService.getEntitiesByCreatedOn().pipe(
              tapResponse({
                next: (newestAdditions) => patchState(store, { newestAdditions }),
                error: (error: Error) => toastService.open(error.message),
              }),
            ),
          ),
        ),
      ),
    }),
  ),
);
