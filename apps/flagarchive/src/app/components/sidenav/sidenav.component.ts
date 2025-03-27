import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
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

import { ENTITY_MENU_ITEMS } from '../../constants';
import { MenuItem } from '../../models';
import { EntitiesStore } from '../../store';

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
  ],
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  readonly #entitiesStore = inject(EntitiesStore);

  entityId = input('');
  entityItems = input<MenuItem[]>([]);

  continents = this.#entitiesStore.continents;
  globalEntities = this.#entitiesStore.globalEntities;
  isMainEntity = this.#entitiesStore.isMainEntity;
  selectedEntity = this.#entitiesStore.selectedEntity;

  initialEntityItems = signal<MenuItem[]>(ENTITY_MENU_ITEMS);

  constructor() {
    effect(() => {
      if (this.entityId() !== this.selectedEntity()?.id) {
        this.#entitiesStore.loadEntities(this.entityId());
      }
    });
  }

  ngOnInit() {
    this.#entitiesStore.loadMainEntities();
  }
}
