import { Routes } from '@angular/router';

import { EntityListComponent } from './entity-list.component';
import { DefaultMainEntity } from '../../models';

export const ENTITY_LIST_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: DefaultMainEntity.Continents,
  },
  {
    path: ':id',
    title: 'Flag Archive - Discover - Entity',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'regions',
      },
      {
        path: 'regions',
        component: EntityListComponent,
        title: 'Flag Archive - Discover - Entity - Regions',
      },
      {
        path: 'details',
        component: EntityListComponent,
        title: 'Flag Archive - Discover - Entity - Regions',
      },
      {
        path: 'history',
        component: EntityListComponent,
        title: 'Flag Archive - Discover - Entity - Regions',
      },
    ],
  },
];
