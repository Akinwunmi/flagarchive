import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbGroupComponent,
  DropdownComponent,
  HyphenatePipe,
  IconComponent,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbComponent,
    BreadcrumbGroupComponent,
    DropdownComponent,
    HyphenatePipe,
    IconComponent,
    RouterLink,
    TranslatePipe,
  ],
  selector: 'app-navigation-bar',
  styleUrl: './navigation-bar.component.css',
  templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  breadcrumbs = this.#entitiesStore.breadcrumbs;
  continents = this.#entitiesStore.continents;
  globalEntities = this.#entitiesStore.globalEntities;
  isDesktop = this.#advancedSearchStore.isDesktop;
  isMainEntity = this.#entitiesStore.isMainEntity;
  isMobile = this.#advancedSearchStore.isMobile;
  isTablet = this.#advancedSearchStore.isTablet;
  selectedEntity = this.#entitiesStore.selectedEntity;

  basePath = '/flags';
  isMainEntityTypesMenuOpen = signal(false);
  isMainEntitiesMenuOpen = signal(false);

  mainEntities = computed(() => {
    const selectedEntity = this.selectedEntity();
    if (!this.isMainEntity() || !selectedEntity) {
      return [];
    }

    return selectedEntity.type === 'continent' ? this.continents() : this.globalEntities();
  });
  selectedMainEntityType = computed(() => {
    const selectedEntity = this.selectedEntity();
    if (this.isMobile() || !selectedEntity) {
      return '';
    }

    return selectedEntity.type === 'continent' ? 'continents' : 'global';
  });

  mainEntityTypes = ['continents', 'global'];

  closeMainEntitiesMenu() {
    this.isMainEntitiesMenuOpen.set(false);
  }

  closeMainEntityTypesMenu() {
    this.isMainEntityTypesMenuOpen.set(false);
  }
}
