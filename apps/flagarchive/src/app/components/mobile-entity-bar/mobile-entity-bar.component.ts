import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlagImageComponent } from '@flagarchive/entities';
import { DropdownComponent, IconComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { MenuItem } from '../../models';
import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownComponent, FlagImageComponent, IconComponent, RouterLink, TranslatePipe],
  selector: 'app-mobile-entity-bar',
  styleUrl: './mobile-entity-bar.component.css',
  templateUrl: './mobile-entity-bar.component.html',
})
export class MobileEntityBarComponent {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  entityItems = input<MenuItem[]>([]);

  flagCategory = this.#advancedSearchStore.flagCategory;
  selectedEntity = this.#entitiesStore.selectedEntity;

  isDropdownOpen = signal(false);

  activeEntityItem = computed(() => this.entityItems().find((item) => item.active));
  activeFlag = computed(() =>
    this.selectedEntity()?.flags?.find((flag) => flag.categories?.includes(this.flagCategory())),
  );

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
}
