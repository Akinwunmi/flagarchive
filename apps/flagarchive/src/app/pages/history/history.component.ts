import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FlagImageComponent, FlagUsageSymbolComponent } from '@flagarchive/entities';
import { HyphenatePipe, TagComponent, TagGroupComponent, TooltipDirective } from '@flagarchive/ui';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { AdvancedSearchBarComponent } from '../../components/advanced-search-bar';
import { EntitiesStore } from '../../store';
import { FlagCategory } from '@flagarchive/advanced-search';

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
    TooltipDirective,
    TranslatePipe,
  ],
  providers: [HyphenatePipe],
  selector: 'app-history',
  styleUrl: './history.component.css',
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #hyphenate = inject(HyphenatePipe);
  readonly #translate = inject(TranslateService);

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

  setCategoriesTooltip(categories: FlagCategory[]): string {
    const translations = categories.map((category) => {
      return this.#translate.instant(`flag-categories.${this.#hyphenate.transform(category)}`);
    });
    return translations.join(', ');
  }
}
