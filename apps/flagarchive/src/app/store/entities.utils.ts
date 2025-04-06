import { sortBy } from '@flagarchive/advanced-search';
import { Entity, EntityRange, getActiveRange } from '@flagarchive/entities';
import { CURRENT_YEAR } from '@flagarchive/ui';
import { TranslateService } from '@ngx-translate/core';

import { AdvancedSearchStore } from './advanced-search.store';

export function setCurrentRange(ranges: EntityRange[], entities: Entity[]) {
  if (ranges?.length) {
    return [ranges[0].start, ranges.slice(-1)[0]?.end ?? CURRENT_YEAR];
  }

  const startYears = entities.map((entity) => entity.ranges?.[0]?.start ?? CURRENT_YEAR);
  const endYears = entities.map((entity) => entity.ranges?.slice(-1)[0]?.end ?? CURRENT_YEAR);

  const firstStart = startYears.length ? Math.min(...startYears) : CURRENT_YEAR;
  const lastEnd = endYears.length ? Math.max(...endYears) : CURRENT_YEAR;

  return [firstStart, lastEnd];
}

export function setFilteredEntities(
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
  entities: Entity[],
  selectedEntity?: Entity,
  translateService?: TranslateService,
) {
  const filteredEntities = entities.filter((entity) => {
    const activeRange = getActiveRange(advancedSearchStore.selectedYear(), entity.ranges);

    const isChild = !entity.altParentId || entity.parentIds?.includes(selectedEntity?.id || '');
    const isOverseasRegion = advancedSearchStore.showOverseasRegions() && entity.altParentId;
    const isSelectedEntityType = advancedSearchStore
      .entityTypes()
      .find((type) => type.label === entity.type)?.checked;
    const isWithinRange = !entity.ranges || activeRange;

    return isSelectedEntityType && isWithinRange && (isChild || isOverseasRegion);
  });

  return sortBy<Entity, 'name'>(
    filteredEntities,
    'name',
    advancedSearchStore.sortDirection(),
    translateService,
  );
}
