import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'flags',
  },
  {
    path: 'flags',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'af',
      },
      {
        path: ':entityId',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'entities',
          },
          {
            path: 'entities',
            loadChildren: () =>
              import('../entities').then((m) => m.ENTITIES_ROUTES),
          },
          {
            path: 'details',
            loadChildren: () =>
              import('../details').then((m) => m.DETAILS_ROUTES),
          },
          {
            path: 'history',
            loadChildren: () =>
              import('../history').then((m) => m.HISTORY_ROUTES),
          },
        ],
      },
    ],
  },
];
