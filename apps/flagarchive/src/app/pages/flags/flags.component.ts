import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { AdvancedSearchBarComponent } from '../../components/advanced-search-bar';
import { DetailsComponent } from '../../components/details';
import { EntitiesComponent } from '../../components/entities';
import { HistoryComponent } from '../../components/history';
import { MobileEntityBarComponent } from '../../components/mobile-entity-bar';
import { SidenavComponent } from '../../components/sidenav';
import { ENTITY_MENU_ITEMS } from '../../constants';
import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AdvancedSearchBarComponent,
    DetailsComponent,
    EntitiesComponent,
    HistoryComponent,
    MobileEntityBarComponent,
    SidenavComponent,
  ],
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.css',
})
export class FlagsComponent {
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #router = inject(Router);

  isMainEntity = this.#entitiesStore.isMainEntity;

  #routerPath = toSignal(
    this.#router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('/').slice(1)),
    ),
  );

  #entityPage = computed(() => this.#routerPath()?.[2] ?? '');
  entityId = computed(() => this.#routerPath()?.[1] ?? '');
  entityItems = computed(() =>
    ENTITY_MENU_ITEMS.map((item) => ({
      ...item,
      active: item.path.slice(-1)[0] === this.#entityPage(),
      path: ['/flags', this.entityId()],
    })),
  );
  mainPage = computed(() => this.#routerPath()?.[0] ?? '');
}
