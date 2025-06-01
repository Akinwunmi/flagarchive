import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FlagImageComponent,
  IconComponent,
  ListComponent,
  ListItemComponent,
} from '@flagarchive/ui';
import { TranslatePipe } from '@ngx-translate/core';

import { ENTITY_MENU_ITEMS } from '../../constants';
import { MenuItem } from '../../models';
import { AdvancedSearchStore, EntitiesStore } from '../../store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkMenu,
    CdkMenuItem,
    FlagImageComponent,
    IconComponent,
    ListComponent,
    ListItemComponent,
    RouterLink,
    TranslatePipe,
  ],
  selector: 'app-sidenav',
  styleUrl: './sidenav.component.css',
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnInit {
  readonly #advancedSearchStore = inject(AdvancedSearchStore);
  readonly #entitiesStore = inject(EntitiesStore);

  entityId = input<string>();
  entityItems = input<MenuItem[]>([]);

  continents = this.#entitiesStore.continents;
  flagCategory = this.#advancedSearchStore.flagCategory;
  globalEntities = this.#entitiesStore.globalEntities;
  isMainEntity = this.#entitiesStore.isMainEntity;
  selectedEntity = this.#entitiesStore.selectedEntity;

  initialEntityItems = signal<MenuItem[]>(ENTITY_MENU_ITEMS);

  activeFlag = computed(() =>
    this.selectedEntity()?.flags?.find((flag) => flag.categories?.includes(this.flagCategory())),
  );

  constructor() {
    effect(() => {
      const entityId = this.entityId();
      if (entityId && entityId !== this.selectedEntity()?.unique_id) {
        this.#entitiesStore.loadEntities(entityId);
      }
    });
  }

  ngOnInit() {
    this.#entitiesStore.loadMainEntities();
  }
}
