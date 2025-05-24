import { TestBed } from '@angular/core/testing';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../mocks';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

jest.mock('../../environments/environment', () => ENVIRONMENT_STUB);

describe(AuthService.name, () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SupabaseService,
          useClass: MockSupabaseService,
        },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
