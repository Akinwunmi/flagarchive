import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Layout } from '@flagarchive/advanced-search';

import { AdvancedSearchBarComponent } from '../../components/advanced-search-bar';
import { EntityComponent } from '../../components/entity';
import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.main-entity]': 'isMainEntity() || undefined',
  },
  imports: [EntityComponent, AdvancedSearchBarComponent],
  selector: 'app-entities',
  styleUrl: './entities.component.css',
  templateUrl: './entities.component.html',
})
export class EntitiesComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  entities = this.#entitiesStore.filteredEntities;
  isMainEntity = this.#entitiesStore.isMainEntity;
  layout = this.#advancedSearchStore.layout;

  isGridLayout() {
    return this.layout() === Layout.Grid;
  }
}
