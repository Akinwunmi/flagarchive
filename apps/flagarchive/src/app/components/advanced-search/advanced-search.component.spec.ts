import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';

import { FIREBASE_CONFIG } from '../../firebase.config';
import { AdvancedSearchComponent } from './advanced-search.component';

describe('AdvancedSearchComponent', () => {
  let component: AdvancedSearchComponent;
  let fixture: ComponentFixture<AdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdvancedSearchComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
