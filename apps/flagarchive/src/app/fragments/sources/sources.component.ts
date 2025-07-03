import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent, CardContentComponent, Link, LinkGroupComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entity-page',
  },
  imports: [CardComponent, CardContentComponent, LinkGroupComponent, RouterLink, TranslatePipe],
  selector: 'app-sources',
  templateUrl: './sources.component.html',
})
export class SourcesComponent {
  readonly #entitiesStore = inject(EntitiesStore);

  entity = this.#entitiesStore.selectedEntity;

  sourceLinks = computed(() => this.#setSourceLinks());

  #setSourceLinks(): Link[] {
    return (
      (this.entity()?.sources?.map((source) => ({
        name: source.name,
        url: source.url,
      })) as Link[]) ?? []
    );
  }
}
