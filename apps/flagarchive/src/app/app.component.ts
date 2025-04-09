import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

import {
  FiltersAndSortingPanelComponent,
  FiltersAndSortingPanelService,
} from './components/filters-and-sorting-panel';
import { HeaderComponent } from './components/header';
import { MobileEntityBarComponent } from './components/mobile-entity-bar';
import { NavigationBarComponent } from './components/navigation-bar';
import { SidenavComponent } from './components/sidenav';
import { ENTITY_MENU_ITEMS } from './constants';
import { WindowResizeService } from './services';
import { EntitiesStore } from './store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FiltersAndSortingPanelComponent,
    HeaderComponent,
    MobileEntityBarComponent,
    NavigationBarComponent,
    RouterOutlet,
    SidenavComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #filtersAndSortingPanelService = inject(FiltersAndSortingPanelService);
  readonly #router = inject(Router);
  readonly #translate = inject(TranslateService);
  readonly #windowResizeService = inject(WindowResizeService);

  isMainEntity = this.#entitiesStore.isMainEntity;
  isFilterSidePanelOpen = this.#filtersAndSortingPanelService.isOpen;
  isTablet = this.#windowResizeService.isTablet;

  initialEntityItems = signal(ENTITY_MENU_ITEMS);

  #routerPath = toSignal(
    this.#router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('/').slice(1)),
    ),
  );

  entityId = computed(() => this.#routerPath()?.[1] ?? '');
  entityItems = computed(() =>
    this.initialEntityItems().map((item) => ({
      ...item,
      path: ['flags', this.entityId(), ...item.path],
      active: item.path.slice(-1)[0] === this.#entityPage(),
    })),
  );
  #entityPage = computed(() => this.#routerPath()?.[2] ?? '');

  constructor() {
    this.#translate.addLangs(['en']);
    this.#translate.setDefaultLang('en');
    this.#translate.use('en');
  }
}
