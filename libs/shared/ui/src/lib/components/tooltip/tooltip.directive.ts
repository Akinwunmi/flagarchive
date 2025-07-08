import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Directive, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';

import { CONNECTED_POSITIONS } from '../../constants';
import { TooltipComponent } from './tooltip.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
  },
  selector: '[flagTooltip]',
})
export class TooltipDirective implements OnDestroy, OnInit {
  readonly #elementRef = inject(ElementRef);
  readonly #overlay = inject(Overlay);

  message = input.required<string>({ alias: 'flagTooltip' });

  #overlayRef!: OverlayRef;

  ngOnInit() {
    this.#overlayRef = this.#overlay.create({
      positionStrategy: this.#overlay
        .position()
        .flexibleConnectedTo(this.#elementRef)
        .withPositions(CONNECTED_POSITIONS),
      scrollStrategy: this.#overlay.scrollStrategies.close(),
    });
  }

  ngOnDestroy() {
    this.#overlayRef?.dispose();
  }

  hide() {
    if (this.#overlayRef.hasAttached()) {
      this.#overlayRef.detach();
    }
  }

  show() {
    if (this.#overlayRef.hasAttached()) {
      return;
    }

    const portal = new ComponentPortal(TooltipComponent);
    const ref = this.#overlayRef.attach(portal);
    ref.instance.message = this.message;
  }
}
