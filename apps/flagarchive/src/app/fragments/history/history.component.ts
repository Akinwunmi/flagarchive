import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlagCategory, Layout } from '@flagarchive/advanced-search';
import { EntityFlag, EntityFlagRange, EntityRange, Flag } from '@flagarchive/entities';
import { HyphenatePipe, TagComponent, TagGroupComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { FlagComponent } from '../../components';
import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entity-page',
  },
  imports: [
    FlagComponent,
    HyphenatePipe,
    RouterLink,
    TagComponent,
    TagGroupComponent,
    TranslatePipe,
  ],
  selector: 'app-history',
  styleUrl: './history.component.css',
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  entity = this.#entitiesStore.selectedEntity;
  layout = this.#advancedSearchStore.layout;

  #flags = computed(() => this.entity()?.flags ?? []);
  categories = computed(() => {
    const allCategories = this.#flags()?.flatMap((flag) => flag.categories ?? []) ?? [];
    return Array.from(new Set(allCategories)).sort((a, b) => a.localeCompare(b));
  });
  isGridLayout = computed(() => this.layout() === Layout.Grid);
  rangedFlags = computed(() => this.#setRangedFlags());

  activeCategories = linkedSignal(() => this.categories());

  containsActiveCategory(categories: FlagCategory[]): boolean {
    const activeCategories = this.activeCategories();
    return categories.some((category) => activeCategories.includes(category));
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

  #setFlag(flagRange: EntityFlagRange, flag?: EntityFlag): Flag {
    const range = this.#getRange(flagRange.start, flagRange.end);
    return {
      alt_parent_id: range?.alt_parent_id ?? this.entity()?.alt_parent_id,
      categories: flagRange.categories ?? flag?.categories,
      end: flagRange.end,
      hoistedRight: this.entity()?.hoisted_right,
      isReversed: !!flagRange.reverse_url,
      name: range?.name ?? this.entity()?.name ?? '',
      reverse_src: flagRange.reverse_url ?? flag?.reverse_url,
      src: flagRange?.url ?? flag?.url,
      start: flagRange.start,
    };
  }

  #setRangedFlags(): Flag[] {
    const flags = this.entity()?.flags;
    const rangedFlags = flags?.flatMap(
      (flag) => flag.ranges?.map((range) => this.#setFlag(range, flag)) ?? [],
    );
    return (rangedFlags ?? []).sort((a, b) => (a.start ?? 0) - (b.start ?? 0));
  }
}
