import { Routes } from '@angular/router';

import { authGuard } from './guards';

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
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup').then((m) => m.SIGNUP_ROUTES),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/profile').then((m) => m.PROFILE_ROUTES),
  },
  {
    path: 'update-password',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/update-password').then((m) => m.UPDATE_PASSWORD_ROUTES),
  },
  {
    path: '404',
    loadComponent: () => import('./pages/page-not-found').then((m) => m.PageNotFoundComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
