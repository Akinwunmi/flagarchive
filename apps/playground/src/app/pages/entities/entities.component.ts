import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { EntityComponent } from '../../components/entity';
import { FilterAndSortBarComponent } from '../../components/filter-and-sort-bar';
import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EntityComponent, FilterAndSortBarComponent],
  selector: 'app-entities',
  styleUrl: './entities.component.css',
  templateUrl: './entities.component.html',
})
export class EntitiesComponent {
  readonly #entitiesStore = inject(EntitiesStore);

  entities = this.#entitiesStore.entities;
}
