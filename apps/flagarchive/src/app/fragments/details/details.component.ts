import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CardComponent,
  CardContentComponent,
  CardHeaderComponent,
  TabComponent,
  TabGroupComponent,
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
    RouterLink,
    TabComponent,
    TabGroupComponent,
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

  activeSection = signal(DetailsSection.General);

  detailsSection = DetailsSection;

  setActiveSection(section: DetailsSection) {
    this.activeSection.set(section);
  }
}
