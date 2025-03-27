import { TestBed } from '@angular/core/testing';

import { AdvancedSearchStore } from './advanced-search.store';

describe('AdvancedSearchStore', () => {
  let store: InstanceType<typeof AdvancedSearchStore>;

  beforeEach(() => {
    store = TestBed.inject(AdvancedSearchStore);
  });

  it('should update max year', () => {
    store.updateMaxYear(2025);
    expect(store.maxYear()).toEqual(2025);
  });

  it('should update min year', () => {
    store.updateMinYear(2000);
    expect(store.minYear()).toEqual(2000);
  });
});
