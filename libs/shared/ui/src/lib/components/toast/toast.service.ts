import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap, timer } from 'rxjs';

import { ToastComponent } from './toast.component';
import { ToastType } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly #destroyRef = inject(DestroyRef);
  readonly #overlay = inject(Overlay);

  #overlayRef?: OverlayRef;

  displaying = new BehaviorSubject(false);

  close() {
    this.displaying.next(false);
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

    const toastPortal = new ComponentPortal(ToastComponent);
    const toastComponentRef = this.#overlayRef.attach(toastPortal);

    toastComponentRef.setInput('message', message);
    if (type) {
      toastComponentRef.setInput('type', type);
    }

    this.displaying.next(true);
    this.displaying
      .pipe(
        switchMap(() => timer(5000)),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe(() => {
        this.close();
      });
  }
}
