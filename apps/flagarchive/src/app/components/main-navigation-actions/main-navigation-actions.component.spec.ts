import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';

import { MainNavigationActionsComponent } from './main-navigation-actions.component';

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
