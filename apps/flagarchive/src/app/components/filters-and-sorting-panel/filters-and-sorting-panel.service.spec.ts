import { TestBed } from '@angular/core/testing';

import { FilterSidePanelService } from './filters-and-sorting-panel.service';

describe('FilterSidePanelService', () => {
  let service: FilterSidePanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSidePanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
