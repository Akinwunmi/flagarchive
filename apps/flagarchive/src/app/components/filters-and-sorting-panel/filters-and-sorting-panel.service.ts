import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersAndSortingPanelService {
  readonly #isOpen = signal(false);

  isOpen = computed(() => this.#isOpen());

  close() {
    this.#isOpen.set(false);
  }

  open() {
    this.#isOpen.set(true);
  }
}
