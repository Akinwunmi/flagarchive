import { SortDirection } from '@flagarchive/advanced-search';
import { ENTITIES_STUB } from '@flagarchive/entities';

import { sortBy } from './advanced-search.util';

describe('AdvancedSearchUtil', () => {
  it('should sort entities by name in descending order', () => {
    const sortedList = sortBy(ENTITIES_STUB, 'name', SortDirection.Desc);
    expect(sortedList[0].name).toBe('zuidwolde');
  });

  it('should sort entities by name in ascending order', () => {
    const sortedList = sortBy(ENTITIES_STUB, 'name', SortDirection.Asc);
    expect(sortedList[0].name).toBe('africa');
  });
});
