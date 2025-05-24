import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../../mocks';
import { SupabaseService } from '../../services';
import { MainNavigationActionsComponent } from './main-navigation-actions.component';

jest.mock('../../../environments/environment', () => ENVIRONMENT_STUB);

describe(MainNavigationActionsComponent.name, () => {
  let component: MainNavigationActionsComponent;
  let fixture: ComponentFixture<MainNavigationActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNavigationActionsComponent],
      providers: [
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

    fixture = TestBed.createComponent(MainNavigationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
