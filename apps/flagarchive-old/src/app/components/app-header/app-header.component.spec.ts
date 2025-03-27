import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import { FIREBASE_CONFIG } from '../../firebase.config';
import { DefaultMainEntity } from '../../models';
import { AuthService } from '../../services';

import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
  const routerSpy = { navigate: jest.fn() };
  let authService: AuthService;
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppHeaderComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  function setup() {
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should navigate to create page', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    setup();
    component.goToCreate();
    expect(navigateSpy).toHaveBeenCalledWith(['create']);
  });

  it('should navigate to home page', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    setup();
    component.goToHome();
    expect(navigateSpy).toHaveBeenCalledWith([
      'discover',
      'entity',
      DefaultMainEntity.Continents,
    ]);
  });

  it('should navigate to login page', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    setup();
    component.goToLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should log out', () => {
    const logOutSpy = jest.spyOn(authService, 'logOut');
    setup();
    component.logOut();
    expect(logOutSpy).toHaveBeenCalled();
  });
});
