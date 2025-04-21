import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
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
import { MainNavigationActionsComponent } from './components/main-navigation-actions';
import { NavigationBarComponent } from './components/navigation-bar';
import { ENTITY_MENU_ITEMS } from './constants';
import { AuthService } from './services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FiltersAndSortingPanelComponent,
    HeaderComponent,
    MainNavigationActionsComponent,
    NavigationBarComponent,
    RouterOutlet,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  readonly #authService = inject(AuthService);
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

  ngOnInit() {
    this.#authService.supabase.auth.onAuthStateChange((event, session) => {
      this.#authService.setCurrentUser(event, session);
    });
  }
}
