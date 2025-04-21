import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { ProfileComponent } from './profile.component';

describe(ProfileComponent.name, () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        provideTranslateService({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
