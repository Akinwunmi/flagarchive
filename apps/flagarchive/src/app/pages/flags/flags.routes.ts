import { Routes } from '@angular/router';

export const FLAGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./flags.component').then((m) => m.FlagsComponent),
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
            loadChildren: () => import('../entities').then((m) => m.ENTITIES_ROUTES),
          },
          {
            path: 'details',
            loadChildren: () => import('../details').then((m) => m.DETAILS_ROUTES),
          },
          {
            path: 'history',
            loadChildren: () => import('../history').then((m) => m.HISTORY_ROUTES),
          },
        ],
      },
    ],
  },
];
