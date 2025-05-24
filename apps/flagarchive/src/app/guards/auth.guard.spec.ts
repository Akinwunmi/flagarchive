import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ENVIRONMENT_STUB } from '../mocks';
import { authGuard } from './auth.guard';

jest.mock('../../environments/environment', () => ENVIRONMENT_STUB);

describe(authGuard.name, () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
