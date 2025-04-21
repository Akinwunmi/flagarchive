import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { MobileEntityBarComponent } from '../../components/mobile-entity-bar';
import { SidenavComponent } from '../../components/sidenav';
import { ENTITY_MENU_ITEMS } from '../../constants';
import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MobileEntityBarComponent, RouterOutlet, SidenavComponent],
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.css',
})
export class FlagsComponent {
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #router = inject(Router);

  isMainEntity = this.#entitiesStore.isMainEntity;

  initialEntityItems = signal(ENTITY_MENU_ITEMS);

  #routerPath = toSignal(
    this.#router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('/').slice(1)),
    ),
  );

  #entityPage = computed(() => this.#routerPath()?.[2] ?? '');
  entityId = computed(() => this.#routerPath()?.[1] ?? '');
  entityItems = computed(() =>
    this.initialEntityItems().map((item) => ({
      ...item,
      path: ['/flags', this.entityId(), ...item.path],
      active: item.path.slice(-1)[0] === this.#entityPage(),
    })),
  );
  mainPage = computed(() => this.#routerPath()?.[0] ?? '');
}
