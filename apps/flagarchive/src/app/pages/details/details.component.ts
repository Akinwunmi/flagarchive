import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { EntityFlagRange, EntityRange, getActiveRange } from '@flagarchive/entities';
import {
  CardComponent,
  CardContentComponent,
  CardHeaderComponent,
  HyphenatePipe,
  Link,
  LinkGroupComponent,
  TagComponent,
  TagGroupComponent,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

import { AdvancedSearchBarComponent } from '../../components/advanced-search-bar';
import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchBarComponent,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    HyphenatePipe,
    LinkGroupComponent,
    RouterLink,
    TagComponent,
    TagGroupComponent,
    TranslatePipe,
  ],
  styleUrl: './details.component.css',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  #flagCategory = this.#advancedSearchStore.flagCategory;
  #selectedYear = this.#advancedSearchStore.selectedYear;
  entity = this.#entitiesStore.selectedEntity;

  activeFlag = computed(() =>
    this.entity()?.flags?.find((flag) => flag.categories?.includes(this.#flagCategory())),
  );
  activeFlagRange = computed(() => this.#setActiveFlagRange());
  activeRange = computed(() => this.#setActiveRange());
  altParentId = computed(() => this.activeRange()?.alt_parent_id ?? this.entity()?.alt_parent_id);
  parentIdLinks = computed(() => this.#setParentIdLinks());
  sourceLinks = computed(() => this.#setSourceLinks());

  #setActiveFlagRange(): EntityFlagRange | undefined {
    return getActiveRange(this.#selectedYear(), this.activeFlag()?.ranges);
  }

  #setActiveRange(): EntityRange | undefined {
    return getActiveRange(this.#selectedYear(), this.entity()?.ranges);
  }

  #setParentIdLinks(): Link[] {
    const parentIds = this.activeRange()?.parent_ids ?? this.entity()?.parent_ids;
    return (
      (parentIds?.map((parentId) => ({
        name: parentId.toUpperCase(),
        path: ['/flags', parentId],
      })) as Link[]) ?? []
    );
  }

  #setSourceLinks(): Link[] {
    return (
      (this.entity()?.sources?.map((source) => ({
        name: source.name,
        url: source.url,
      })) as Link[]) ?? []
    );
  }
}
