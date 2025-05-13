import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@flagarchive/ui';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { pipe, switchMap } from 'rxjs';

import { Credentials, Profile } from '../models';
import { AuthService, UserService } from '../services';

interface UserState {
  editing: boolean;
  profile: Profile;
}

const INITIAL_STATE: UserState = {
  editing: false,
  profile: {
    firstName: '',
    lastName: '',
  },
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withComputed((_, authService = inject(AuthService)) => ({
    currentUser: computed(() => authService.currentUser()),
  })),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      router = inject(Router),
      toastService = inject(ToastService),
      translate = inject(TranslateService),
      userService = inject(UserService),
    ) => ({
      loadProfile: rxMethod<void>(
        pipe(
          switchMap(() => userService.getProfile()),
          tapResponse({
            next: (rawProfile) => {
              const profile: Profile = {
                firstName: rawProfile?.first_name ?? '',
                lastName: rawProfile?.last_name ?? '',
              };
              patchState(store, { profile });
            },
            error: (error: Error) => toastService.open(error.message, 'error'),
          }),
        ),
      ),
      logIn: rxMethod<Credentials>(
        pipe(
          switchMap(({ email, password }) => authService.logIn(email, password)),
          tapResponse({
            next: ({ error }) => {
              if (!error) {
                toastService.open(translate.instant('notifications.login.success'));
                router.navigate(['/']);
                return;
              }

              toastService.open(translate.instant('notifications.login.error'), 'error');
            },
            error: () => {
              // noop
            },
          }),
        ),
      ),
      logOut() {
        authService.logOut();
        toastService.open(translate.instant('notifications.logout.success'));
        router.navigate(['/']);
      },
      sendPasswordResetEmail: rxMethod<void>(
        pipe(
          switchMap(() => authService.sendPasswordResetEmail()),
          tapResponse({
            next: () =>
              toastService.open(translate.instant('notifications.change-password.success')),
            error: () =>
              toastService.open(translate.instant('notifications.change-password.error'), 'error'),
          }),
        ),
      ),
      setEditing: (editing: boolean) => {
        patchState(store, { editing });
      },
      updateEmail: rxMethod<string>(
        pipe(
          switchMap((email) => authService.updateEmail(email)),
          tapResponse({
            next: () => {
              toastService.open(translate.instant('notifications.update-profile.success'));
              patchState(store, { editing: false });
            },
            error: () =>
              toastService.open(translate.instant('notifications.update-profile.error'), 'error'),
          }),
        ),
      ),
      updatePassword: rxMethod<string>(
        pipe(
          switchMap((password) => authService.updatePassword(password)),
          tapResponse({
            next: () => {
              toastService.open(translate.instant('notifications.update-password.success'));
              router.navigate(['/']);
            },
            error: () =>
              toastService.open(translate.instant('notifications.update-password.error'), 'error'),
          }),
        ),
      ),
    }),
  ),
);
