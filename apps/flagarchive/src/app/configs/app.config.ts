import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader, TranslationObject } from '@ngx-translate/core';

import { APP_ROUTES } from '../app.routes';
import { forkJoin, map, Observable } from 'rxjs';

class TranslateHttpModuleloader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(language: string): Observable<TranslationObject> {
    const modules = ['entities', 'entity-types', 'general'];
    const translations = modules.map((module) => this.http.get(`i18n/${language}/${module}.json`));
    return forkJoin(translations).pipe(
      map((translations) => translations.reduce((acc, curr) => ({ ...acc, ...curr }))),
    );
  }
}

const httpLoaderFactory: (http: HttpClient) => TranslateHttpModuleloader = (http: HttpClient) =>
  new TranslateHttpModuleloader(http);

// const httpLoaderFactory: (http: HttpClient) => TranslateHttpModuleLoader = (http: HttpClient) =>
//   new TranslateHttpModuleLoader(http, './i18n/', '.json');

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(APP_ROUTES),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
};
