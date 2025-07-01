import { Routes } from '@angular/router';

export const FLAGS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'af',
  },
  {
    path: ':entityId',
    loadComponent: () => import('./flags.component').then((m) => m.FlagsComponent),
  },
];
