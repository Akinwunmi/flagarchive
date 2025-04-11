import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

import {
  FiltersAndSortingPanelComponent,
  FiltersAndSortingPanelService,
} from './components/filters-and-sorting-panel';
import { HeaderComponent } from './components/header';
import { SidenavComponent } from './components/sidenav';
import { ENTITY_MENU_ITEMS } from './constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.home]': 'mainPage() === "home"',
  },
  imports: [FiltersAndSortingPanelComponent, HeaderComponent, RouterOutlet, SidenavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly #filtersAndSortingPanelService = inject(FiltersAndSortingPanelService);
  readonly #router = inject(Router);
  readonly #translate = inject(TranslateService);

  isFilterSidePanelOpen = this.#filtersAndSortingPanelService.isOpen;

  initialEntityItems = signal(ENTITY_MENU_ITEMS);

  #routerPath = toSignal(
    this.#router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('/').slice(1)),
    ),
  );

  #entityPage = computed(() => this.#routerPath()?.[2] ?? '');
  entityId = computed(() => this.#routerPath()?.[1]);
  entityItems = computed(() =>
    this.initialEntityItems().map((item) => ({
      ...item,
      path: ['flags', this.entityId() ?? '', ...item.path],
      active: item.path.slice(-1)[0] === this.#entityPage(),
    })),
  );
  mainPage = computed(() => this.#routerPath()?.[0] ?? '');

  constructor() {
    this.#translate.addLangs(['en']);
    this.#translate.setDefaultLang('en');
    this.#translate.use('en');

    effect(() => {
      if (this.mainPage() === 'home') {
        this.#filtersAndSortingPanelService.close();
      }
    });
  }
}
