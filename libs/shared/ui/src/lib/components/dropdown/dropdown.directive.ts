import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, merge, Observable } from 'rxjs';

import { CONNECTED_POSITIONS } from '../../constants';

@Directive({
  selector: '[flagDropdown]',
  host: {
    '(click)': 'handleClick()',
  },
})
export class DropdownDirective implements OnDestroy {
  #destroyRef = inject(DestroyRef);
  #elementRef = inject(ElementRef<HTMLElement>);
  #overlay = inject(Overlay);
  #viewContainerRef = inject(ViewContainerRef);

  flagDropdown = input.required<TemplateRef<unknown>>();

  isOpen = model(false);

  #overlayRef?: OverlayRef;

  ngOnDestroy() {
    this.isOpen.set(false);
    this.#overlayRef?.dispose();
  }

  close() {
    this.isOpen.set(false);
    this.#overlayRef?.detach();
  }

  handleClick() {
    this.isOpen.set(!this.isOpen());
    this.#toggle();
  }

  open() {
    const templatePortal = new TemplatePortal(this.flagDropdown(), this.#viewContainerRef);

    this.#overlayRef = this.#overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.#overlay.scrollStrategies.reposition(),
      positionStrategy: this.#overlay
        .position()
        .flexibleConnectedTo(this.#elementRef)
        .withPositions(CONNECTED_POSITIONS),
    });
    this.#overlayRef.attach(templatePortal);

    this.#actions()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.isOpen.set(false);
        this.#toggle();
      });
  }

  #actions(): Observable<MouseEvent | void> {
    if (!this.#overlayRef) {
      return EMPTY;
    }

    const backdropClick$ = this.#overlayRef.backdropClick();
    const detachments$ = this.#overlayRef.detachments();

    return merge(backdropClick$, detachments$);
  }

  #toggle() {
    if (this.isOpen()) {
      this.open();
    } else {
      this.close();
    }
  }
}
