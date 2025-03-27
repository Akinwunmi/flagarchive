import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownComponent, FlagImageComponent, IconComponent } from '@flagarchive/ui';

import { EntitiesStore } from '../../store';
import { MenuItem } from '../../models';

@Component({
  selector: 'app-mobile-entity-bar',
  imports: [DropdownComponent, FlagImageComponent, IconComponent, RouterLink],
  templateUrl: './mobile-entity-bar.component.html',
  styleUrl: './mobile-entity-bar.component.css',
})
export class MobileEntityBarComponent {
  readonly #entitiesStore = inject(EntitiesStore);

  entityItems = input<MenuItem[]>([]);

  selectedEntity = this.#entitiesStore.selectedEntity;

  isDropdownOpen = signal(false);

  activeEntityItem = computed(() => this.entityItems().find((item) => item.active));

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
}
