import { Routes } from '@angular/router';

export const UPDATE_PASSWORD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./update-password.component').then((m) => m.UpdatePasswordComponent),
  },
];
