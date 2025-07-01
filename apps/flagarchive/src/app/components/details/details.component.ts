import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CardComponent,
  CardContentComponent,
  CardHeaderComponent,
  HyphenatePipe,
  Link,
  LinkGroupComponent,
  TabComponent,
  TabGroupComponent,
  TagComponent,
  TagGroupComponent,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { EntitiesStore } from '../../store';
import { DetailsSection } from './details.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entity-page',
  },
  imports: [
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    HyphenatePipe,
    LinkGroupComponent,
    RouterLink,
    TabComponent,
    TabGroupComponent,
    TagComponent,
    TagGroupComponent,
    TitleCasePipe,
    TranslatePipe,
  ],
  selector: 'app-details',
  styleUrl: './details.component.css',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  readonly #entitiesStore = inject(EntitiesStore);

  activeFlag = this.#entitiesStore.activeFlag;
  activeFlagRange = this.#entitiesStore.activeFlagRange;
  activeRange = this.#entitiesStore.activeRange;
  entity = this.#entitiesStore.selectedEntity;

  activeSection = signal(DetailsSection.Flag);

  altParentId = computed(() => this.activeRange()?.alt_parent_id ?? this.entity()?.alt_parent_id);
  parentIdLinks = computed(() => this.#setParentIdLinks());
  sourceLinks = computed(() => this.#setSourceLinks());

  detailsSection = DetailsSection;

  setActiveSection(section: DetailsSection) {
    this.activeSection.set(section);
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
