import { UpperCasePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, signal, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Entity,
  EntityFlagRange,
  EntityRange,
  FlagImageComponent,
  getActiveRange,
} from '@flagarchive/entities';
import { IconComponent } from '@flagarchive/ui';
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

  flagCategory = this.#advancedSearchStore.flagCategory;
  #selectedEntity = this.#entitiesStore.selectedEntity;
  #selectedYear = this.#advancedSearchStore.selectedYear;

  isReversed = signal(false);

  activeAltParentId = computed(
    () => this.activeRange()?.alt_parent_id ?? this.entity().alt_parent_id,
  );
  activeFlag = computed(() =>
    this.entity().flags?.find((flag) => flag.categories?.includes(this.flagCategory())),
  );
  activeFlagRange = computed(() => this.#setActiveFlagRange());
  activeRange = computed(() => this.#setActiveRange());
  flagImageSrc = computed(() => this.#setFlagImageSrc());
  hasAltParentId = computed(() => {
    const altParentId = this.activeAltParentId();
    return !!altParentId && altParentId !== this.#selectedEntity()?.unique_id;
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
    return getActiveRange(this.#selectedYear(), this.activeFlag()?.ranges);
  }

  #setActiveRange(): EntityRange | undefined {
    return getActiveRange(this.#selectedYear(), this.entity().ranges);
  }

  #setFlagImageSrc() {
    const reverseUrl = this.activeFlagRange()?.reverse_url ?? this.activeFlag()?.reverse_url;
    const url = this.activeFlagRange()?.url ?? this.activeFlag()?.url;

    return this.isReversed() ? reverseUrl : url;
  }
}
