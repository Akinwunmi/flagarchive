import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, effect, inject, input, ViewContainerRef } from '@angular/core';

import { CONNECTED_POSITIONS } from '../../constants';
import { InputService } from '../input';
import { AutocompleteComponent } from './autocomplete.component';

@Directive({
  host: {
    role: 'combobox',
    autocomplete: 'off',
    'aria-autocomplete': 'list',
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'panelOpen',
    '[attr.aria-owns]': 'panelOpen ? flagAutocomplete()?.id : null',
    '(input)': 'onInput($event)',
    '(valueChange)': 'onValueChange($event)',
  },
  selector: '[flagAutocomplete]',
})
export class AutocompleteDirective {
  readonly #inputService = inject(InputService);
  readonly #overlay = inject(Overlay);
  readonly #viewContainerRef = inject(ViewContainerRef);

  readonly flagAutocomplete = input.required<AutocompleteComponent>();

  #overlayRef?: OverlayRef;
  #portal?: TemplatePortal<AutocompleteComponent>;

  get panelOpen(): boolean {
    return this.#overlayRef?.hasAttached() ?? false;
  }

  constructor() {
    effect(() => {
      this.flagAutocomplete().selectedOption.subscribe((option) => {
        if (option) {
          this.#inputService.value.set(option.label);
        }

        this.#disposeOverlay();
      });
    });
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (!value) {
      this.#disposeOverlay();
      return;
    }

    if (!this.#overlayRef) {
      const positionStrategy = this.#overlay
        .position()
        .flexibleConnectedTo(input)
        .withPositions(CONNECTED_POSITIONS);
      this.#overlayRef = this.#overlay.create({ positionStrategy });
      this.#portal = new TemplatePortal(this.flagAutocomplete().template(), this.#viewContainerRef);
      this.#overlayRef.attach(this.#portal);
    }
  }

  onValueChange(value: string) {
    if (!value) {
      this.#disposeOverlay();
      return;
    }

    this.flagAutocomplete().searchValue.set(value);
  }

  #disposeOverlay() {
    this.#overlayRef?.dispose();
    this.#overlayRef = undefined;
  }
}
