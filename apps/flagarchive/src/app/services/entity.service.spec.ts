import { TestBed } from '@angular/core/testing';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../mocks';
import { EntityService } from './entity.service';
import { SupabaseService } from './supabase.service';

jest.mock('../../environments/environment', () => ENVIRONMENT_STUB);

describe('EntityService', () => {
  let service: EntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SupabaseService,
          useClass: MockSupabaseService,
        },
      ],
    });
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
