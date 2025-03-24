import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

import { FIREBASE_CONFIG } from '../../configs';
import { BreadcrumbBarComponent } from './breadcrumb-bar.component';

describe('BreadcrumbBarComponent', () => {
  let component: BreadcrumbBarComponent;
  let fixture: ComponentFixture<BreadcrumbBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbBarComponent],
      providers: [
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
