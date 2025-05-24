import { TestBed } from '@angular/core/testing';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../mocks';
import { SupabaseService } from './supabase.service';
import { UserService } from './user.service';

jest.mock('../../environments/environment', () => ENVIRONMENT_STUB);

describe(UserService.name, () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SupabaseService,
          useClass: MockSupabaseService,
        },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
