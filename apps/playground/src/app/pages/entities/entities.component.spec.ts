import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { FIREBASE_CONFIG } from '../../configs';
import { EntitiesComponent } from './entities.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('EntitiesComponent', () => {
  let component: EntitiesComponent;
  let fixture: ComponentFixture<EntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitiesComponent],
      providers: [
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
