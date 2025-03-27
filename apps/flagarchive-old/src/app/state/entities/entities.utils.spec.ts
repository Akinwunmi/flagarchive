import { signal } from '@angular/core';
import { SortDirection } from '@flagarchive/advanced-search';
import { ENTITIES_STUB } from '@flagarchive/entities';

import { AdvancedSearchStore } from '../advanced-search/advanced-search.store';

import { setFilteredEntities } from './entities.utils';

describe('EntitiesUtils', () => {
  const advancedSearchStore = {
    minYear: signal(2000),
    maxYear: signal(2024),
    selectedYear: signal(2020),
    sortDirection: signal(SortDirection.Asc),
  } as unknown as InstanceType<typeof AdvancedSearchStore>;

  it('should set filtered entities', () => {
    const entities = ENTITIES_STUB;
    const filteredEntities = setFilteredEntities(entities, advancedSearchStore);

    expect(filteredEntities.length).toBe(entities.length);
  });
});
