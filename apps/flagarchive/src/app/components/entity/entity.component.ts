import { Component, ChangeDetectionStrategy, input, signal, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isActiveFlagCategory } from '@flagarchive/advanced-search';
import { Entity, EntityFlagRange, EntityRange, Flag, getActiveRange } from '@flagarchive/entities';

import { FlagComponent } from '../flag';
import { AdvancedSearchStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagComponent, RouterLink],
  selector: 'app-entity',
  styleUrl: './entity.component.css',
  templateUrl: './entity.component.html',
})
export class EntityComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);

  entity = input.required<Entity>();
  cardView = input(true);

  flagCategory = this.#advancedSearchStore.flagCategory;
  #selectedYear = this.#advancedSearchStore.selectedYear;

  isReversed = signal(false);

  #activeFlag = computed(() =>
    this.entity().flags?.find((flag) => isActiveFlagCategory(flag.categories, this.flagCategory())),
  );
  #activeFlagRange = computed(() => this.#setActiveFlagRange());
  #activeRange = computed(() => this.#setActiveRange());
  categories = computed(
    () => this.#activeFlagRange()?.categories ?? this.#activeFlag()?.categories ?? [],
  );
  flag = computed<Flag>(() => ({
    alt_parent_id: this.#activeRange()?.alt_parent_id ?? this.entity().alt_parent_id,
    categories: this.categories(),
    end: this.#activeRange()?.end,
    hoistedRight: this.entity().hoisted_right,
    isReversed: !!this.#activeFlag()?.reverse_url,
    name: this.#activeRange()?.name ?? this.entity().name,
    reverse_src: this.#activeFlagRange()?.reverse_url ?? this.#activeFlag()?.reverse_url,
    src: this.#activeFlagRange()?.url ?? this.#activeFlag()?.url,
    start: this.#activeRange()?.start,
  }));

  basePath = '/flags';

  #setActiveFlagRange(): EntityFlagRange | undefined {
    return getActiveRange(this.#selectedYear(), this.#activeFlag()?.ranges);
  }

  #setActiveRange(): EntityRange | undefined {
    return getActiveRange(this.#selectedYear(), this.entity().ranges);
  }
}
