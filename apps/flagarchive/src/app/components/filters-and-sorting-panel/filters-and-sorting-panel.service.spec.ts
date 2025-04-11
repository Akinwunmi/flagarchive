import { TestBed } from '@angular/core/testing';

import { FiltersAndSortingPanelService } from './filters-and-sorting-panel.service';

describe('FiltersAndSortingPanelService', () => {
  let service: FiltersAndSortingPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersAndSortingPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
