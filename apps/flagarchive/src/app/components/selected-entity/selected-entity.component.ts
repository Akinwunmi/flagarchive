import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FlagImageComponent } from '@flagarchive/entities';
import { IconComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.card]': 'cardView()',
  },
  imports: [FlagImageComponent, IconComponent, TranslatePipe],
  selector: 'app-selected-entity',
  styleUrl: './selected-entity.component.css',
  templateUrl: './selected-entity.component.html',
})
export class SelectedEntityComponent {
  readonly #entitiesStore = inject(EntitiesStore);

  cardView = input(true);
  showFavoriteButton = input(true);

  activeFlag = this.#entitiesStore.activeFlag;
  activeFlagRange = this.#entitiesStore.activeFlagRange;
  activeRange = this.#entitiesStore.activeRange;
  selectedEntity = this.#entitiesStore.selectedEntity;
}
