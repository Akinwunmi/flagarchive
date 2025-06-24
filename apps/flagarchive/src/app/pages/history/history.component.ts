import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal } from '@angular/core';
import { FlagCategory } from '@flagarchive/advanced-search';
import { EntityFlagRange, EntityRange, Flag } from '@flagarchive/entities';
import { HyphenatePipe, TagComponent, TagGroupComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AdvancedSearchBarComponent } from '../../components/advanced-search-bar';
import { FlagComponent } from '../../components/flag';
import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entity-page',
  },
  imports: [
    AdvancedSearchBarComponent,
    FlagComponent,
    HyphenatePipe,
    TagComponent,
    TagGroupComponent,
    TranslatePipe,
  ],
  selector: 'app-history',
  styleUrl: './history.component.css',
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  readonly #entitiesStore = inject(EntitiesStore);

  activeFlag = this.#entitiesStore.activeFlag;
  entity = this.#entitiesStore.selectedEntity;

  #flags = computed(() => this.entity()?.flags ?? []);
  categories = computed(() => {
    const allCategories = [
      ...(this.activeFlag()?.categories ?? []),
      ...(this.#flags()?.flatMap((flag) => flag.categories ?? []) ?? []),
    ];
    return Array.from(new Set(allCategories)).sort((a, b) => a.localeCompare(b));
  });
  rangedFlags = computed(() => this.#setRangedFlags());

  activeCategories = linkedSignal(() => this.categories());

  containsActiveCategory(categories: FlagCategory[]): boolean {
    const activeCategories = this.activeCategories();
    return categories.some((category) => activeCategories.includes(category));
  }

  getFlag(flag: EntityFlagRange): Flag {
    const range = this.#getRange(flag.start, flag.end);
    return {
      alt_parent_id: range?.alt_parent_id ?? this.entity()?.alt_parent_id,
      end: flag.end,
      hoistedRight: this.entity()?.hoisted_right,
      isReversed: !!flag.reverse_url,
      name: range?.name ?? this.entity()?.name ?? '',
      reverse_src: flag.reverse_url ?? this.activeFlag()?.reverse_url,
      src: flag?.url ?? this.activeFlag()?.url,
      start: flag.start,
    };
  }

  toggleCategory(category: FlagCategory) {
    const currentCategories = this.activeCategories();
    if (currentCategories.includes(category)) {
      this.activeCategories.set(currentCategories.filter((c) => c !== category));
      return;
    }

    this.activeCategories.set([...currentCategories, category]);
  }

  #getRange(start: number, end?: number): EntityRange | undefined {
    const ranges = this.entity()?.ranges ?? [];
    return ranges.find(
      (range) =>
        range.start <= start &&
        (range.end === undefined || (end !== undefined && range.end >= end)),
    );
  }

  #setRangedFlags(): EntityFlagRange[] {
    const flags = this.entity()?.flags?.flatMap((flag) => flag.ranges ?? []) ?? [];
    return flags.sort((a, b) => a.start - b.start);
  }
}
