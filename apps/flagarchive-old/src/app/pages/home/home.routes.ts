import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Flag Archive',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'discover',
      },
      {
        path: 'discover',
        loadChildren: () =>
          import('../discover/discover.routes').then((m) => m.DISCOVER_ROUTES),
      },
    ],
  },
];
