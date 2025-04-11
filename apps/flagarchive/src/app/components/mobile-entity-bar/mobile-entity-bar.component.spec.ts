import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { FIREBASE_CONFIG } from '../../configs';
import { MobileEntityBarComponent } from './mobile-entity-bar.component';

describe('MobileEntityBarComponent', () => {
  let component: MobileEntityBarComponent;
  let fixture: ComponentFixture<MobileEntityBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileEntityBarComponent],
      providers: [
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
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
