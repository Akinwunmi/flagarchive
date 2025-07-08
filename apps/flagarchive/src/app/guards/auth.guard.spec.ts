import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { ENVIRONMENT_STUB, MockAuthService } from '../mocks';
import { authGuard } from './auth.guard';
import { AuthService } from '../services';
import { ToastService } from '@flagarchive/ui';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';

jest.mock('../../environments/environment', () => ENVIRONMENT_STUB);

describe(authGuard.name, () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  let mockAuthService: MockAuthService;
  let mockRouter: Partial<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;
  let mockToastService: Partial<ToastService>;

  beforeEach(() => {
    mockAuthService = new MockAuthService();
    mockRoute = {} as ActivatedRouteSnapshot;
    mockRouter = {
      navigate: jest.fn(),
    };
    mockState = {} as RouterStateSnapshot;
    mockToastService = {
      open: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideTranslateService({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ToastService,
          useValue: mockToastService,
        },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true when user is authenticated', () => {
    const authenticated = executeGuard(mockRoute, mockState);

    expect(authenticated).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(mockToastService.open).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not authenticated', () => {
    mockAuthService.currentUser.set(null);
    const authenticated = executeGuard(mockRoute, mockState);

    expect(authenticated).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(mockToastService.open).toHaveBeenCalledWith(
      'notifications.not-logged-in.page',
      'warning',
    );
  });
});
