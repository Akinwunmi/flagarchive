import { Routes } from '@angular/router';

export const ENTITIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./entities.component').then((m) => m.EntitiesComponent),
  },
];
