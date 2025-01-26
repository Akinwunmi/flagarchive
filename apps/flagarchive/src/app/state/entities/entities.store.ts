import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { Entity, EntityFlagRange, EntityRange, EntityType } from '../../models';
import { EntityService } from '../../services';
import { getActiveRange } from '../../utils';
import { AdvancedSearchStore } from '../advanced-search';
import { ErrorsStore } from '../errors';
import { initialState } from '../state';

import { setFilteredEntities, setYears } from './entities.utils';
import { TranslateService } from '@ngx-translate/core';

export const EntitiesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState.entities),
  withComputed(
    (
      store,
      advancedSearchStore = inject(AdvancedSearchStore),
      translateService = inject(TranslateService),
    ) => ({
      filteredEntities: computed(() =>
        setFilteredEntities(store.current(), advancedSearchStore, translateService),
      ),
      selected: computed(() => {
        const entity = store.foundEntity();
        const flagCategory = advancedSearchStore.flagCategory();
        const flagRanges = entity?.flags?.[flagCategory]?.ranges;
        const selectedYear = advancedSearchStore.selectedYear();

        return {
          entity: setFilteredEntities(entity ? [entity] : [], advancedSearchStore)[0] ?? undefined,
          flag: entity?.flags?.[flagCategory],
          flagRange: getActiveRange(selectedYear, flagRanges) as EntityFlagRange | undefined,
          range: getActiveRange(selectedYear, entity?.ranges) as EntityRange | undefined,
        };
      }),
    }),
  ),
  withMethods(
    (
      store,
      advancedSearchStore = inject(AdvancedSearchStore),
      entityService = inject(EntityService),
      errorsStore = inject(ErrorsStore),
    ) => ({
      addEntities: rxMethod<Entity[]>(
        pipe(
          switchMap(entities =>
            entityService.addEntities(entities).pipe(
              tapResponse({
                next: () => {
                  patchState(store, {
                    all: [...store.all(), ...entities],
                  });
                },
                error: error => errorsStore.addError(error),
              }),
            ),
          ),
        ),
      ),
      getEntities: rxMethod<string>(
        pipe(
          tap(selectedId => patchState(store, { selectedId })),
          switchMap(id =>
            entityService.getEntityById(id).pipe(
              tapResponse({
                next: foundEntity => patchState(store, { foundEntity }),
                error: error => errorsStore.addError(error),
              }),
            ),
          ),
          switchMap(parentEntity =>
            entityService.getEntitiesByParentId(parentEntity.id).pipe(
              tapResponse({
                next: current => {
                  patchState(store, { current });
                  setYears(current, parentEntity, advancedSearchStore);
                },
                error: error => errorsStore.addError(error),
              }),
            ),
          ),
        ),
      ),
      getMainEntities: rxMethod<void>(
        pipe(
          switchMap(() =>
            entityService.getEntitiesByType([EntityType.Continent, EntityType.Organization]).pipe(
              tapResponse({
                next: main => patchState(store, { main }),
                error: error => errorsStore.addError(error),
              }),
            ),
          ),
        ),
      ),
      updateSelectedEntityId(selectedId: string) {
        patchState(store, { selectedId });
      },
    }),
  ),
);
