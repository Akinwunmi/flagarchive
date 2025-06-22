import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FlagImageComponent, FlagUsageSymbolComponent } from '@flagarchive/entities';
import { HyphenatePipe, TagComponent, TagGroupComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AdvancedSearchBarComponent } from '../../components/advanced-search-bar';
import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entity-page',
  },
  imports: [
    AdvancedSearchBarComponent,
    FlagImageComponent,
    FlagUsageSymbolComponent,
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
}
