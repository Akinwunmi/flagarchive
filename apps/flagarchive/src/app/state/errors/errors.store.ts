import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { initialState } from '../state';

export const ErrorsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState.errors),
  withMethods(store => ({
    addError(error: unknown) {
      patchState(store, state => ({
        all: [...state.all, error],
      }));
    },
  })),
);
