import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '@flagarchive/ui';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../services';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  const translate = inject(TranslateService);

  const currentUser = authService.currentUser;
  if (!currentUser()) {
    router.navigate(['/login']);
    toastService.open(translate.instant('notifications.not-logged-in.page'), 'warning');
    return false;
  }

  return true;
};
