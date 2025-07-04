import { FlagCategory, sortBy } from '@flagarchive/advanced-search';
import {
  COMMUNITY_ENTITY_TYPES,
  Entity,
  EntityRange,
  EntityType,
  getActiveRange,
  INSTITUTIONAL_ENTITY_TYPES,
} from '@flagarchive/entities';
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

    const isChild =
      !entity.alt_parent_id || entity.parent_ids?.includes(selectedEntity?.unique_id || '');
    const isOverseasRegion = advancedSearchStore.showOverseasRegions() && entity.alt_parent_id;
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

export function setFlagCategory(
  advancedSearchStore: InstanceType<typeof AdvancedSearchStore>,
  type: EntityType,
  id: string,
) {
  if (COMMUNITY_ENTITY_TYPES.includes(type)) {
    return advancedSearchStore.setFlagCategory(FlagCategory.CommunityFlag);
  }

  if (INSTITUTIONAL_ENTITY_TYPES.includes(type)) {
    return advancedSearchStore.setFlagCategory(FlagCategory.InstitutionalFlag);
  }

  if (type === EntityType.Organization) {
    const category = id === 'oo' ? FlagCategory.InstitutionalFlag : FlagCategory.CommunityFlag;
    return advancedSearchStore.setFlagCategory(category);
  }

  // Reset to NationalFlag if currently set to Community or Institutional
  const current = advancedSearchStore.flagCategory();
  if (current === FlagCategory.CommunityFlag || current === FlagCategory.InstitutionalFlag) {
    advancedSearchStore.setFlagCategory(FlagCategory.NationalFlag);
  }
}
