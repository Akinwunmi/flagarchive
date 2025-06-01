import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  filter,
  interval,
  scan,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { ToastComponent } from './toast.component';
import { ToastType } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly #overlay = inject(Overlay);

  #overlayRef?: OverlayRef;
  #remainingTime = 5000;

  #paused$ = new BehaviorSubject(false);
  #active$ = new BehaviorSubject(false);
  completed$ = this.#paused$.pipe(
    switchMap((paused) => {
      // If paused, do not emit anything
      if (paused || !this.#active$.value) {
        return EMPTY;
      }

      return interval(50).pipe(
        startWith(0),
        // Start the timer with the remaining time
        scan(
          (acc) => {
            const now = Date.now();
            // Delta is the time since the last emission
            const delta = now - acc.previous;
            const remaining = acc.remaining - delta;
            return { previous: now, remaining };
          },
          // Initialize the accumulator with the current time and remaining time
          { previous: Date.now(), remaining: this.#remainingTime },
        ),
        tap((state) => (this.#remainingTime = state.remaining)),
        filter((state) => state.remaining <= 0),
        take(1),
      );
    }),
  );

  close() {
    this.#active$.next(false);
    this.#overlayRef?.detach();
  }

  open(message: string, type?: ToastType) {
    if (!this.#overlayRef) {
      this.#overlayRef = this.#overlay.create({
        positionStrategy: this.#overlay.position().global().top('1rem').centerHorizontally(),
      });
    }

    if (this.#overlayRef.hasAttached()) {
      this.close();
    }

    const portal = new ComponentPortal(ToastComponent);
    const componentRef = this.#overlayRef.attach(portal);

    componentRef.setInput('message', message);
    if (type) {
      componentRef.setInput('type', type);
    }

    this.#remainingTime = 5000;
    this.#paused$.next(false);
    this.#active$.next(true);
  }

  pause() {
    this.#paused$.next(true);
  }

  resume() {
    this.#paused$.next(false);
  }
}
