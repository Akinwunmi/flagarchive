import { computed, effect, inject } from '@angular/core';
import { sortBy } from '@flagarchive/advanced-search';
import { Entity, EntityType } from '@flagarchive/entities';
import { ToastService } from '@flagarchive/ui';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { pipe, switchMap } from 'rxjs';

import { Breadcrumb } from '../models';
import { EntityService } from '../services';
import { AdvancedSearchStore } from './advanced-search.store';
import { setCurrentRange, setFilteredEntities } from './entities.utils';

interface EntitiesState {
  breadcrumbs: Breadcrumb[];
  entities: Entity[];
  flagOfTheDay: Entity | undefined;
  mainEntities: Entity[];
  newestAdditions: Entity[];
  selectedEntity: Entity | undefined;
}

const INITIAL_STATE: EntitiesState = {
  breadcrumbs: [],
  entities: [],
  flagOfTheDay: undefined,
  mainEntities: [],
  newestAdditions: [],
  selectedEntity: undefined,
};

export const EntitiesStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withProps(() => ({
    _advancedSearchStore: inject(AdvancedSearchStore),
    _entityService: inject(EntityService),
    _toastService: inject(ToastService),
    _translateService: inject(TranslateService),
  })),
  withComputed((store) => ({
    continents: computed(() =>
      store.mainEntities().filter((entity) => entity.type === EntityType.Continent),
    ),
    currentRange: computed(() =>
      setCurrentRange(store.selectedEntity()?.ranges ?? [], store.entities()),
    ),
    filteredEntities: computed(() =>
      setFilteredEntities(
        store._advancedSearchStore,
        store.entities(),
        store.selectedEntity(),
        store._translateService,
      ),
    ),
    globalEntities: computed(() =>
      store.mainEntities().filter((entity) => entity.type === EntityType.Organization),
    ),
    isMainEntity: computed(
      () =>
        store.selectedEntity()?.type === EntityType.Continent ||
        store.selectedEntity()?.type === EntityType.Organization,
    ),
  })),
  withMethods((store) => ({
    loadBreadcrumbs: rxMethod<string[]>(
      pipe(
        switchMap((uniqueIds) =>
          store._entityService.getEntitiesByUniqueIds(uniqueIds).pipe(
            tapResponse({
              next: (entities) => {
                const breadcrumbs = entities.map((entity) => ({
                  id: entity.unique_id,
                  label: entity.name,
                }));
                patchState(store, { breadcrumbs });
              },
              error: (error: Error) => store._toastService.open(error.message),
            }),
          ),
        ),
      ),
    ),
    loadEntities: rxMethod<string>(
      pipe(
        switchMap((uniqueId) =>
          store._entityService.getEntityById(uniqueId).pipe(
            tapResponse({
              next: (selectedEntity) => patchState(store, { selectedEntity }),
              error: (error: Error) => store._toastService.open(error.message),
            }),
          ),
        ),
        switchMap((entity) =>
          store._entityService.getEntitiesByParentId(entity?.unique_id ?? '', true).pipe(
            tapResponse({
              next: (entities) =>
                patchState(store, {
                  entities: sortBy(
                    entities,
                    'name',
                    store._advancedSearchStore.sortDirection(),
                    store._translateService,
                  ),
                }),
              error: (error: Error) => store._toastService.open(error.message),
            }),
          ),
        ),
      ),
    ),
    loadFlagOfTheDay: rxMethod<void>(
      pipe(
        switchMap(() =>
          store._entityService.getFlagOfTheDay().pipe(
            tapResponse({
              next: (flagOfTheDay) => patchState(store, { flagOfTheDay }),
              error: (error: Error) => store._toastService.open(error.message),
            }),
          ),
        ),
      ),
    ),
    loadMainEntities: rxMethod<void>(
      pipe(
        switchMap(() =>
          store._entityService.getEntitiesByType(['continent', 'organization']).pipe(
            tapResponse({
              next: (mainEntities) =>
                patchState(store, {
                  mainEntities: sortBy(
                    mainEntities,
                    'name',
                    store._advancedSearchStore.sortDirection(),
                    store._translateService,
                  ),
                }),
              error: (error: Error) => store._toastService.open(error.message),
            }),
          ),
        ),
      ),
    ),
    loadNewestAdditions: rxMethod<void>(
      pipe(
        switchMap(() =>
          store._entityService.getRecentEntities().pipe(
            tapResponse({
              next: (newestAdditions) => patchState(store, { newestAdditions }),
              error: (error: Error) => store._toastService.open(error.message),
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const selectedEntity = store.selectedEntity();
        let ids = selectedEntity?.parent_ids ?? [];
        if (selectedEntity?.alt_parent_id) {
          ids = [...ids, selectedEntity.alt_parent_id];
        }

        if (ids) {
          store.loadBreadcrumbs(ids);
        }
      });
    },
  }),
);
