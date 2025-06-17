import { computed, effect, inject, resource } from '@angular/core';
import { sortBy, SortDirection } from '@flagarchive/advanced-search';
import { EntityType } from '@flagarchive/entities';
import { ToastService } from '@flagarchive/ui';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { TranslateService } from '@ngx-translate/core';

import { EntityService } from '../services';
import { sanitizeEntity } from '../utils';
import { AdvancedSearchStore } from './advanced-search.store';
import { setCurrentRange, setFilteredEntities } from './entities.utils';

interface EntitiesState {
  breadcrumbIds: string[];
  selectedEntityId: string | undefined;
}

const INITIAL_STATE: EntitiesState = {
  breadcrumbIds: [],
  selectedEntityId: undefined,
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
  withProps((store) => ({
    _breadcrumbIdsResource: resource({
      request: () => ({ ids: store.breadcrumbIds() ?? [] }),
      loader: ({ request }) => store._entityService.getEntitiesByUniqueId(request.ids),
    }),
    _entitiesByAltParentIdResource: resource({
      request: () => ({ uniqueId: store.selectedEntityId() ?? '' }),
      loader: ({ request }) => store._entityService.getEntitiesByAltParentId(request.uniqueId),
    }),
    _entitiesByParentIdResource: resource({
      request: () => ({ uniqueId: store.selectedEntityId() ?? '' }),
      loader: ({ request }) => store._entityService.getEntitiesByParentId(request.uniqueId),
    }),
    _flagOfTheDayResource: resource({
      loader: () => store._entityService.getFlagOfTheDay(),
    }),
    _mainEntitiesResource: resource({
      loader: () => store._entityService.getMainEntities(),
    }),
    _newestAdditionsResource: resource({
      loader: () => store._entityService.getRecentEntities(),
    }),
    _selectedEntityResource: resource({
      request: () => ({ uniqueId: store.selectedEntityId() ?? '' }),
      loader: ({ request }) => store._entityService.getEntityById(request.uniqueId),
    }),
  })),
  withComputed((store) => ({
    breadcrumbEntities: computed(() => {
      const rawEntities = store._breadcrumbIdsResource.value()?.data ?? [];
      return rawEntities.map((entity) => sanitizeEntity(entity));
    }),
    entities: computed(() => {
      const rawEntitiesByAltParentId = store._entitiesByAltParentIdResource.value()?.data ?? [];
      const rawEntitiesByParentId = store._entitiesByParentIdResource.value()?.data ?? [];
      const entities = [...rawEntitiesByAltParentId, ...rawEntitiesByParentId].map((entity) =>
        sanitizeEntity(entity),
      );
      return sortBy(
        entities,
        'name',
        store._advancedSearchStore.sortDirection(),
        store._translateService,
      );
    }),
    flagOfTheDay: computed(() => {
      const rawEntity = store._flagOfTheDayResource.value()?.data?.[0];
      return rawEntity ? sanitizeEntity(rawEntity) : undefined;
    }),
    mainEntities: computed(() => {
      const rawEntities = store._mainEntitiesResource.value()?.data ?? [];
      const entities = rawEntities.map((entity) => sanitizeEntity(entity));
      return sortBy(entities, 'name', SortDirection.Asc, store._translateService);
    }),
    newestAdditions: computed(() => {
      const rawEntities = store._newestAdditionsResource.value()?.data ?? [];
      return rawEntities.map((entity) => sanitizeEntity(entity));
    }),
    selectedEntity: computed(() => {
      const rawEntity = store._selectedEntityResource.value()?.data?.[0];
      return rawEntity ? sanitizeEntity(rawEntity) : undefined;
    }),
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
    setSelectedEntityId(selectedEntityId: string) {
      patchState(store, { selectedEntityId });
    },
    updateBreadcrumbIds(breadcrumbIds: string[]) {
      patchState(store, { breadcrumbIds });
    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const selectedEntity = store.selectedEntity();
        let ids = selectedEntity?.parent_ids ?? [];
        if (selectedEntity?.alt_parent_id) {
          ids = [...ids, selectedEntity.alt_parent_id];
        }

        store.updateBreadcrumbIds(ids ?? []);
      });
    },
  }),
);
