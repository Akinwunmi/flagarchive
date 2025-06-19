import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@flagarchive/ui';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
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
  withProps(() => ({
    _authService: inject(AuthService),
    _router: inject(Router),
    _toastService: inject(ToastService),
    _translate: inject(TranslateService),
    _userService: inject(UserService),
  })),
  withComputed((store) => ({
    currentUser: computed(() => store._authService.currentUser()),
  })),
  withMethods((store) => ({
    loadProfile: rxMethod<void>(
      pipe(
        switchMap(() => store._userService.getProfile()),
        tapResponse({
          next: (rawProfile) => {
            const profile: Profile = {
              firstName: rawProfile?.first_name ?? '',
              lastName: rawProfile?.last_name ?? '',
            };
            patchState(store, { profile });
          },
          error: (error: Error) => store._toastService.open(error.message, 'error'),
        }),
      ),
    ),
    logIn: rxMethod<Credentials>(
      pipe(
        switchMap(({ email, password }) => store._authService.logIn(email, password)),
        tapResponse({
          next: ({ error }) => {
            if (!error) {
              store._toastService.open(store._translate.instant('notifications.login.success'));
              store._router.navigate(['/']);
              return;
            }

            store._toastService.open(
              store._translate.instant('notifications.login.error'),
              'error',
            );
          },
          error: () => {
            // noop
          },
        }),
      ),
    ),
    logOut() {
      store._authService.logOut();
      store._toastService.open(store._translate.instant('notifications.logout.success'));
      store._router.navigate(['/']);
    },
    sendPasswordResetEmail: rxMethod<void>(
      pipe(
        switchMap(() => store._authService.sendPasswordResetEmail()),
        tapResponse({
          next: () =>
            store._toastService.open(
              store._translate.instant('notifications.change-password.success'),
            ),
          error: () =>
            store._toastService.open(
              store._translate.instant('notifications.change-password.error'),
              'error',
            ),
        }),
      ),
    ),
    setEditing: (editing: boolean) => {
      patchState(store, { editing });
    },
    updateEmail: rxMethod<string>(
      pipe(
        switchMap((email) => store._authService.updateEmail(email)),
        tapResponse({
          next: () => {
            store._toastService.open(
              store._translate.instant('notifications.update-profile.success'),
            );
            patchState(store, { editing: false });
          },
          error: () =>
            store._toastService.open(
              store._translate.instant('notifications.update-profile.error'),
              'error',
            ),
        }),
      ),
    ),
    updatePassword: rxMethod<string>(
      pipe(
        switchMap((password) => store._authService.updatePassword(password)),
        tapResponse({
          next: () => {
            store._toastService.open(
              store._translate.instant('notifications.update-password.success'),
            );
            store._router.navigate(['/']);
          },
          error: () =>
            store._toastService.open(
              store._translate.instant('notifications.update-password.error'),
              'error',
            ),
        }),
      ),
    ),
  })),
);
