import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { MobileEntityBarComponent } from './mobile-entity-bar.component';

describe('MobileEntityBarComponent', () => {
  let component: MobileEntityBarComponent;
  let fixture: ComponentFixture<MobileEntityBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileEntityBarComponent],
      providers: [
        provideTranslateService({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileEntityBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
