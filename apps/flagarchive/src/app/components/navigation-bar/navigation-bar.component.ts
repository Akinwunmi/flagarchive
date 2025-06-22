import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbGroupComponent,
  DropdownComponent,
  HyphenatePipe,
  IconComponent,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { WindowResizeService } from '../../services';
import { EntitiesStore } from '../../store';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

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
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #router = inject(Router);
  readonly #windowResizeService = inject(WindowResizeService);

  breadcrumbs = this.#entitiesStore.breadcrumbs;
  continents = this.#entitiesStore.continents;
  globalEntities = this.#entitiesStore.globalEntities;
  isMainEntity = this.#entitiesStore.isMainEntity;
  selectedEntity = this.#entitiesStore.selectedEntity;

  isMobile = this.#windowResizeService.isMobile;
  isTablet = this.#windowResizeService.isTablet;

  basePath = '/flags';
  isMainEntityTypesMenuOpen = signal(false);
  isMainEntitiesMenuOpen = signal(false);

  #routerPath = toSignal(
    this.#router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('/').slice(1)),
      startWith(this.#router.url.split('/').slice(1)),
    ),
  );

  currentPage = computed(() => this.#routerPath()?.[2] ?? '');
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
