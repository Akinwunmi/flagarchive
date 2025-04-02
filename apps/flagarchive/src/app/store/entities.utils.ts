import { Entity } from '@flagarchive/entities';

import { AdvancedSearchStore } from './advanced-search.store';
import { SortDirection } from '@flagarchive/advanced-search';

export function setFilteredEntities(
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
  entities: Entity[],
  selectedEntity?: Entity,
) {
  const filteredEntities = entities.filter((entity) => {
    const isSelectedEntityType = advancedSearchStore
      .entityTypes()
      .find((type) => type.label === entity.type)?.checked;

    return (
      isSelectedEntityType &&
      (!entity.altParentId ||
        entity.parentIds?.includes(selectedEntity?.id || '') ||
        (advancedSearchStore.showOverseasRegions() && entity.altParentId))
    );
  });
  return sortEntities(filteredEntities, advancedSearchStore.sortDirection());
}

export function sortEntities(entities: Entity[], sortDirection?: SortDirection) {
  return entities.sort((a, b) => {
    if (!sortDirection || sortDirection === SortDirection.Asc) {
      return a.name.localeCompare(b.name);
    }

    return b.name.localeCompare(a.name);
  });
}
