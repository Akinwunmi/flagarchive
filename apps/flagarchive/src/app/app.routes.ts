import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  // {
  //   path: 'create',
  //   loadChildren: () =>
  //     import('./pages/create/create-routes').then((m) => m.CREATE_ROUTES),
  // },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./pages/login/login-routes').then((m) => m.LOGIN_ROUTES),
  // },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
