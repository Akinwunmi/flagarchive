import { SortDirection } from '@flagarchive/advanced-search';
import { ENTITIES_STUB } from '@flagarchive/entities';

import { sortBy } from './advanced-search.util';

describe('AdvancedSearchUtil', () => {
  it('should sort entities by translationKey in descending order', () => {
    const sortedList = sortBy(
      ENTITIES_STUB,
      'translationKey',
      SortDirection.Desc
    );
    expect(sortedList[0].translationKey).toBe('zuidwolde');
  });

  it('should sort entities by translationKey in ascending order', () => {
    const sortedList = sortBy(
      ENTITIES_STUB,
      'translationKey',
      SortDirection.Asc
    );
    expect(sortedList[0].translationKey).toBe('africa');
  });
});
