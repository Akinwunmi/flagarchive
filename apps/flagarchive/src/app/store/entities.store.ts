import { computed, inject } from '@angular/core';
import { Entity, EntityType } from '@flagarchive/entities';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

import { EntityService } from '../services';
import { AdvancedSearchStore } from './advanced-search.store';
import { setCurrentRange, setFilteredEntities, sortEntities } from './entities.utils';

interface EntitiesState {
  entities: Entity[];
  mainEntities: Entity[];
  selectedEntity: Entity | undefined;
}

const INITIAL_STATE: EntitiesState = {
  entities: [],
  mainEntities: [],
  selectedEntity: undefined,
};

export const EntitiesStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withComputed((state, advancedSearchStore = inject(AdvancedSearchStore)) => ({
    continents: computed(() =>
      state.mainEntities().filter((entity) => entity.type === EntityType.Continent),
    ),
    currentRange: computed(() =>
      setCurrentRange(state.selectedEntity()?.ranges ?? [], state.entities()),
    ),
    filteredEntities: computed(() =>
      setFilteredEntities(advancedSearchStore, state.entities(), state.selectedEntity()),
    ),
    globalEntities: computed(() =>
      state.mainEntities().filter((entity) => entity.type === EntityType.Organization),
    ),
    isMainEntity: computed(
      () =>
        state.selectedEntity()?.type === EntityType.Continent ||
        state.selectedEntity()?.type === EntityType.Organization,
    ),
  })),
  withMethods((store, entityService = inject(EntityService)) => ({
    loadEntities: rxMethod<string>(
      pipe(
        switchMap((id) =>
          entityService.getEntityById(id).pipe(
            tapResponse({
              next: (selectedEntity) => patchState(store, { selectedEntity }),
              error: (error) => console.error({ error }),
            }),
          ),
        ),
        switchMap((entity) =>
          entityService.getEntitiesByParentId(entity.id, true).pipe(
            tapResponse({
              next: (entities) => patchState(store, { entities: sortEntities(entities) }),
              error: (error) => console.error({ error }),
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
                patchState(store, { mainEntities: sortEntities(mainEntities) }),
              error: (error) => console.error({ error }),
            }),
          ),
        ),
      ),
    ),
  })),
);
