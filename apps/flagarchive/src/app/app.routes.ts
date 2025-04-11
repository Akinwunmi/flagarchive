import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'flags',
    loadChildren: () => import('./pages/flags').then((m) => m.FLAGS_ROUTES),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about').then((m) => m.ABOUT_ROUTES),
  },
];
