import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbGroupComponent,
  DropdownComponent,
  IconComponent,
} from '@flagarchive/ui';

import { WindowResizeService } from '../../services';
import { EntitiesStore } from '../../store';

@Component({
  imports: [
    BreadcrumbComponent,
    BreadcrumbGroupComponent,
    DropdownComponent,
    IconComponent,
    RouterLink,
  ],
  selector: 'app-navigation-bar',
  styleUrl: './navigation-bar.component.css',
  templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent {
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #windowResizeService = inject(WindowResizeService);

  continents = this.#entitiesStore.continents;
  globalEntities = this.#entitiesStore.globalEntities;
  isMainEntity = this.#entitiesStore.isMainEntity;
  selectedEntity = this.#entitiesStore.selectedEntity;

  isMainEntityTypesMenuOpen = signal(false);
  isMainEntitiesMenuOpen = signal(false);
  isMobile = this.#windowResizeService.isMobile;
  isTablet = this.#windowResizeService.isTablet;

  mainEntities = computed(() => {
    const selectedEntity = this.selectedEntity();
    if (!this.isMainEntity() || !selectedEntity) {
      return [];
    }

    return selectedEntity.type === 'continent' ? this.continents() : this.globalEntities();
  });

  mainEntityTypes = ['continents', 'global'];

  closeMainEntitiesMenu() {
    this.isMainEntitiesMenuOpen.set(false);
  }

  closeMainEntityTypesMenu() {
    this.isMainEntityTypesMenuOpen.set(false);
  }

  setMainEntityDropdownLabel() {
    const selectedEntity = this.selectedEntity();
    if (this.isMobile() || !selectedEntity) {
      return '';
    }
    return selectedEntity.type === 'continent' ? 'continents' : 'global';
  }
}
