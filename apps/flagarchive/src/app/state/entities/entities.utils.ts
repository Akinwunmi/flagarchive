import { TranslateService } from '@ngx-translate/core';

import { Entity, EntityRange } from '../../models';
import { sortBy } from '../../utils';
import { AdvancedSearchStore } from '../advanced-search';

export function setFilteredEntities(
  entities: Entity[],
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
  translateService?: TranslateService,
): Entity[] {
  const filteredEntities = entities.filter(entity => isEntityInRange(entity, advancedSearchStore));
  return sortBy<Entity, 'translationKey'>(
    filteredEntities.map(entity => setEntityByActiveRange(entity, advancedSearchStore)),
    'translationKey',
    advancedSearchStore.sortDirection(),
    translateService,
  );
}

export function setYears(
  entities: Entity[],
  parentEntity: Entity,
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
) {
  const currentYear = new Date().getFullYear();
  const entityRanges = entities.map(entity => entity.ranges);
  const selectedYear = advancedSearchStore.selectedYear;
  let maxYear = currentYear;
  let minYear = currentYear;

  if (entityRanges.length) {
    maxYear = Math.max(...entityRanges.map(ranges => getLastYear(currentYear, ranges)));
    minYear = Math.min(...entityRanges.map(ranges => getFirstYear(maxYear, ranges)));
  }

  if (maxYear === currentYear && minYear === currentYear) {
    maxYear = getLastYear(currentYear, parentEntity.ranges);
    minYear = getFirstYear(maxYear, parentEntity.ranges);
  }

  advancedSearchStore.updateMaxYear(maxYear);
  advancedSearchStore.updateMinYear(minYear);

  if (selectedYear() < minYear) {
    advancedSearchStore.updateSelectedYear(minYear);
  }

  if (selectedYear() > maxYear) {
    advancedSearchStore.updateSelectedYear(maxYear);
  }
}

function getLastYear(defaultYear: number, ranges?: EntityRange[]): number {
  return ranges?.slice(-1)[0]?.end ?? defaultYear;
}

function getFirstYear(defaultYear: number, ranges?: EntityRange[]): number {
  return ranges?.[0]?.start ?? defaultYear;
}

function isEntityInRange(
  entity: Entity,
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
): boolean {
  const maxYear = advancedSearchStore.maxYear;
  const selectedYear = advancedSearchStore.selectedYear;

  if (!entity.ranges) {
    return true;
  }

  return entity.ranges.some(range => {
    const start = range.start;
    const end = range.end ?? maxYear();

    return selectedYear() >= start && selectedYear() <= end;
  });
}

function setEntityByActiveRange(
  entity: Entity,
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
): Entity {
  if (!entity.ranges) {
    return entity;
  }

  const selectedYear = advancedSearchStore.selectedYear;
  const activeRange = entity.ranges.find(range => {
    const end = range.end ?? Infinity; // Treat open-ended ranges as infinite
    return selectedYear() >= range.start && selectedYear() <= end;
  });

  // TODO - Check if this copy is still necessary after upgrading to @angular/fire 19
  const ranges = [...entity.ranges].sort((a, b) => a.start - b.start);
  return {
    ...entity,
    altParentId: activeRange?.altParentId ?? entity.altParentId,
    flags: entity.flags,
    parentId: activeRange?.parentId ?? entity.parentId,
    ranges,
    translationKey: activeRange?.translationKey ?? entity.translationKey,
    type: activeRange?.type ?? entity.type,
  };
}
