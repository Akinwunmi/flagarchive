import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { APP_CONFIG } from './app/configs';

bootstrapApplication(AppComponent, APP_CONFIG).catch((err) =>
  console.error(err),
);
