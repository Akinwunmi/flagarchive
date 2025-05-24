import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../../mocks';
import { SupabaseService } from '../../services';
import { NavigationBarComponent } from './navigation-bar.component';

jest.mock('../../../environments/environment', () => ENVIRONMENT_STUB);

describe(NavigationBarComponent.name, () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBarComponent],
      providers: [
        provideRouter([]),
        provideTranslateService({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
        {
          provide: SupabaseService,
          useClass: MockSupabaseService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
