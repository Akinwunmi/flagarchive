import { Component, ChangeDetectionStrategy, input, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Entity } from '@flagarchive/entities';
import { FlagImageComponent, IconComponent } from '@flagarchive/ui';

import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagImageComponent, IconComponent, RouterLink],
  selector: 'app-entity',
  styleUrl: './entity.component.css',
  templateUrl: './entity.component.html',
})
export class EntityComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  entity = input.required<Entity>();
  cardView = input(true);

  selectedEntity = this.#entitiesStore.selectedEntity;
  #flagCategory = this.#advancedSearchStore.flagCategory;

  isReversed = signal(false);

  handleClickEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  setFlagImageSrc() {
    const activeFlagCategory = this.entity().flags?.[this.#flagCategory()];
    return this.isReversed() ? activeFlagCategory?.reverseUrl : activeFlagCategory?.url;
  }

  toggleReversed(event: Event) {
    this.handleClickEvent(event);
    this.isReversed.update((isReversed) => (isReversed = !isReversed));
  }
}
