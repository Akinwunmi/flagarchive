import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { computed, inject, Injectable, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { combineLatest, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidepanelService {
  readonly #overlay = inject(Overlay);

  readonly #isOpen = signal(false);

  isOpen = computed(() => this.#isOpen());

  #overlayRef?: OverlayRef;

  close() {
    this.#isOpen.set(false);
    this.#overlayRef?.detach();
  }

  open(
    templateRef: TemplateRef<unknown>,
    viewContainerRef: ViewContainerRef,
  ): Observable<[MouseEvent, KeyboardEvent]> {
    this.#isOpen.set(true);

    if (!this.#overlayRef) {
      this.#overlayRef = this.#overlay.create({
        hasBackdrop: true,
        positionStrategy: this.#overlay.position().global().right().top(),
        scrollStrategy: this.#overlay.scrollStrategies.block(),
      });
    }

    const portal = new TemplatePortal(templateRef, viewContainerRef);
    this.#overlayRef.attach(portal);

    return combineLatest([
      this.#overlayRef.backdropClick().pipe(tap(() => this.close())),
      this.#overlayRef.keydownEvents().pipe(
        tap((event) => {
          if (event.key === 'Escape') {
            this.close();
          }
        }),
      ),
    ]);
  }
}
