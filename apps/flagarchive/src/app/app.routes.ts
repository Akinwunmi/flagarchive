import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about').then((m) => m.ABOUT_ROUTES),
  },
];
