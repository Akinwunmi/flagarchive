import { Routes } from '@angular/router';

export const DETAILS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./details.component').then((m) => m.DetailsComponent),
  },
];
