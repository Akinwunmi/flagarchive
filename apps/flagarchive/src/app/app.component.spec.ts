import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { MockAuthService, MockSupabaseService } from './mocks';
import { AuthService, SupabaseService } from './services';

// Cannot use ENVIRONMENT_STUB here because it is rendered in time in the app.component
jest.mock('../environments/environment', () => ({
  environment: {
    supabase: {
      url: '',
      key: '',
    },
  },
}));

describe(AppComponent.name, () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideTranslateService({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: SupabaseService,
          useClass: MockSupabaseService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
