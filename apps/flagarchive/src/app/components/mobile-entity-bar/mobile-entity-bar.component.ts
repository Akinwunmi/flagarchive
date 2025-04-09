import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownComponent, FlagImageComponent, IconComponent } from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { EntitiesStore } from '../../store';
import { MenuItem } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownComponent, FlagImageComponent, IconComponent, RouterLink, TranslatePipe],
  selector: 'app-mobile-entity-bar',
  styleUrl: './mobile-entity-bar.component.css',
  templateUrl: './mobile-entity-bar.component.html',
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
