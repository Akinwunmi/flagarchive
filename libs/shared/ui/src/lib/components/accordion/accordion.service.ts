import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccordionService {
  #expandedCollapsible = signal<string | undefined>(undefined);
  #collapsibles = signal<string[]>([]);

  expandedCollapsible = computed(() => this.#expandedCollapsible());

  registerCollapsible(uuid: string) {
    this.#collapsibles.update((collapsibles) => {
      if (collapsibles.includes(uuid)) {
        return collapsibles;
      }

      return [...collapsibles, uuid];
    });
  }

  setExpandedCollapsible(uuid: string) {
    this.#expandedCollapsible.set(uuid);
  }
}
