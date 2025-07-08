import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ResizeObserverService } from '@flagarchive/ui';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

import {
  HeaderComponent,
  MainNavigationActionsComponent,
  NavigationBarComponent,
} from './components';
import { ENTITY_MENU_ITEMS } from './constants';
import { AuthService } from './services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, MainNavigationActionsComponent, NavigationBarComponent, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy, OnInit {
  readonly #authService = inject(AuthService);
  readonly #resizeObserverService = inject(ResizeObserverService);
  readonly #router = inject(Router);
  readonly #translate = inject(TranslateService);

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
  }

  ngOnInit() {
    this.#authService.auth.onAuthStateChange((event, session) => {
      this.#authService.setCurrentUser(event, session);
    });

    this.#resizeObserverService.observe();
  }

  ngOnDestroy() {
    this.#resizeObserverService.unobserve();
  }
}
