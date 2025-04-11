import { UpperCasePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, signal, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Entity, EntityFlagRange, EntityRange, getActiveRange } from '@flagarchive/entities';
import { FlagImageComponent, IconComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagImageComponent, IconComponent, RouterLink, TranslatePipe, UpperCasePipe],
  selector: 'app-entity',
  styleUrl: './entity.component.css',
  templateUrl: './entity.component.html',
})
export class EntityComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  entity = input.required<Entity>();
  cardView = input(true);

  #flagCategory = this.#advancedSearchStore.flagCategory;
  #selectedEntity = this.#entitiesStore.selectedEntity;
  #selectedYear = this.#advancedSearchStore.selectedYear;

  isReversed = signal(false);

  #activeFlagCategory = computed(() => this.entity().flags?.[this.#flagCategory()]);
  activeAltParentId = computed(() => this.activeRange()?.altParentId ?? this.entity().altParentId);
  activeFlagRange = computed(() => this.#setActiveFlagRange());
  activeRange = computed(() => this.#setActiveRange());
  flagImageSrc = computed(() => this.#setFlagImageSrc());
  hasAltParentId = computed(() => {
    const altParentId = this.activeAltParentId();
    return !!altParentId && altParentId !== this.#selectedEntity()?.id;
  });

  basePath = '/flags';

  handleClickEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  toggleReversed(event: Event) {
    this.handleClickEvent(event);
    this.isReversed.update((isReversed) => (isReversed = !isReversed));
  }

  #setActiveFlagRange(): EntityFlagRange | undefined {
    return getActiveRange(this.#selectedYear(), this.#activeFlagCategory()?.ranges);
  }

  #setActiveRange(): EntityRange | undefined {
    return getActiveRange(this.#selectedYear(), this.entity().ranges);
  }

  #setFlagImageSrc() {
    const activeFlagCategory = this.#activeFlagCategory();
    const activeFlagRange = this.activeFlagRange();

    return this.isReversed()
      ? (activeFlagRange?.reverseUrl ?? activeFlagCategory?.reverseUrl)
      : (activeFlagRange?.url ?? activeFlagCategory?.url);
  }
}
