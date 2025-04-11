import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { MobileEntityBarComponent } from '../../components/mobile-entity-bar';
import { NavigationBarComponent } from '../../components/navigation-bar';
import { ENTITY_MENU_ITEMS } from '../../constants';
import { WindowResizeService } from '../../services';
import { EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MobileEntityBarComponent, NavigationBarComponent, RouterOutlet],
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.css',
})
export class FlagsComponent {
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #router = inject(Router);
  readonly #windowResizeService = inject(WindowResizeService);

  isMainEntity = this.#entitiesStore.isMainEntity;
  isTablet = this.#windowResizeService.isTablet;

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
      path: ['flags', this.entityId(), ...item.path],
      active: item.path.slice(-1)[0] === this.#entityPage(),
    })),
  );
  mainPage = computed(() => this.#routerPath()?.[0] ?? '');
}
