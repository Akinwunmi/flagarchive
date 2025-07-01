import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FlagImageComponent } from '@flagarchive/entities';
import { IconComponent } from '@flagarchive/ui';

import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlagImageComponent, IconComponent],
  selector: 'app-mobile-entity-bar',
  styleUrl: './mobile-entity-bar.component.css',
  templateUrl: './mobile-entity-bar.component.html',
})
export class MobileEntityBarComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  flagCategory = this.#advancedSearchStore.flagCategory;
  selectedEntity = this.#entitiesStore.selectedEntity;

  isDropdownOpen = signal(false);

  activeFlag = computed(() =>
    this.selectedEntity()?.flags?.find((flag) => flag.categories?.includes(this.flagCategory())),
  );

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
}
