import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal } from '@angular/core';
import { EntityFlag, EntityFlagRange, FlagImage } from '@flagarchive/entities';
import { HyphenatePipe, TagComponent, TagGroupComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AdvancedSearchBarComponent } from '../../components/advanced-search-bar';
import { HistoryEntityComponent } from '../../components/history-entity';
import { EntitiesStore } from '../../store';
import { FlagCategory } from '@flagarchive/advanced-search';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entity-page',
  },
  imports: [
    AdvancedSearchBarComponent,
    HistoryEntityComponent,
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

  categories = computed(() => {
    const allCategories = [
      ...(this.activeFlag()?.categories ?? []),
      ...(this.flags()?.flatMap((flag) => flag.categories ?? []) ?? []),
    ];
    return Array.from(new Set(allCategories)).sort((a, b) => a.localeCompare(b));
  });
  flags = computed(() => this.entity()?.flags ?? []);
  rangedFlags = computed(() => this.entity()?.flags?.flatMap((flag) => flag.ranges ?? []) ?? []);

  activeCategories = linkedSignal(() => this.categories());

  containsActiveCategory(categories: FlagCategory[]): boolean {
    const activeCategories = this.activeCategories();
    return categories.some((category) => activeCategories.includes(category));
  }

  getFlag(flag: EntityFlag): FlagImage {
    return {
      src: flag.url,
      alt: this.entity()?.name ?? '',
      hoistedRight: this.entity()?.hoisted_right,
      isReversed: !!flag.reverse_url,
    };
  }

  getRangedFlag(flag: EntityFlagRange): FlagImage {
    return {
      src: flag?.url ?? '',
      alt: this.entity()?.name ?? '',
      hoistedRight: this.entity()?.hoisted_right,
      isReversed: !!flag.reverse_url,
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
}
