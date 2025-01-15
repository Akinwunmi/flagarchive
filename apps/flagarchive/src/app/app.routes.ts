import { Route } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'forms',
    loadComponent: () =>
      import('@flagarchive/forms').then((m) => m.FormsComponent),
  },
];
