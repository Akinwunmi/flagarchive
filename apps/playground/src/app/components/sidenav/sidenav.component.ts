import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import {
  FlagImageComponent,
  IconComponent,
  ListComponent,
  ListItemComponent,
} from '@flagarchive/ui';

import { MenuItem } from '../../models';
import { EntitiesStore } from '../../store';
import { HeaderComponent } from '../header';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkMenu,
    CdkMenuItem,
    FlagImageComponent,
    HeaderComponent,
    IconComponent,
    ListComponent,
    ListItemComponent,
    RouterLink,
  ],
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #entitiesStore = inject(EntitiesStore);
  readonly #router = inject(Router);

  selectedEntity = this.#entitiesStore.selectedEntity;
  #mainEntities = this.#entitiesStore.mainEntities;

  initialEntityItems = signal<MenuItem[]>([
    {
      icon: 'info',
      label: 'Details',
      path: ['details'],
    },
    {
      icon: 'flag',
      label: 'Entities',
      path: ['entities'],
    },
    {
      icon: 'history',
      label: 'History',
      path: ['history'],
    },
  ]);
  entityItems = signal<MenuItem[]>([]);

  continents = computed(() => this.#mainEntities().filter((entity) => entity.type === 'continent'));
  organizations = computed(() =>
    this.#mainEntities().filter((entity) => entity.type === 'organization'),
  );

  isMainEntity = computed(
    () =>
      this.selectedEntity()?.type === 'continent' || this.selectedEntity()?.type === 'organization',
  );

  ngOnInit() {
    this.#entitiesStore.loadMainEntities();

    this.#router.events.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      const path = this.#router.url.split('/').slice(1);
      const entityId = path[1];
      const entityPage = path[2];

      if (entityId !== this.selectedEntity()?.id) {
        this.#entitiesStore.loadEntities(entityId);
      }

      this.entityItems.set(
        this.initialEntityItems().map((item) => ({
          ...item,
          path: ['flags', entityId, ...item.path],
          active: item.path.slice(-1)[0] === entityPage,
        })),
      );
    });
  }
}
