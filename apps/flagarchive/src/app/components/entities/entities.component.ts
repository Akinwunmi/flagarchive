import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Layout } from '@flagarchive/advanced-search';
import { TranslatePipe } from '@ngx-translate/core';

import { EntityComponent } from '../entity';
import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'entity-page',
  },
  imports: [EntityComponent, RouterLink, TranslatePipe],
  selector: 'app-entities',
  templateUrl: './entities.component.html',
})
export class EntitiesComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  entities = this.#entitiesStore.filteredEntities;
  layout = this.#advancedSearchStore.layout;

  isGridLayout = computed(() => this.layout() === Layout.Grid);
}
