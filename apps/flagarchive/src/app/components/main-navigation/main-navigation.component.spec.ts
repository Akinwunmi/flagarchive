import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { of } from 'rxjs';

import { FIREBASE_CONFIG } from '../../firebase.config';

import { MainNavigationComponent } from './main-navigation.component';

describe('MainNavigationComponent', () => {
  const mockRouter = {
    url: '/entity/as',
    navigate: jest.fn(),
    events: of(new NavigationEnd(0, '', '')),
  };
  let component: MainNavigationComponent;
  let fixture: ComponentFixture<MainNavigationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainNavigationComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useValue: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainNavigationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it('should have organizations as active section', () => {
  //   fixture.detectChanges();
  //   component.selectedMainEntityId.set('oi');

  //   expect(component.breadcrumbItems()[0].label).toEqual(
  //     DiscoverSection.Organizations
  //   );
  // });

  it('should navigate when selecting main entity', () => {
    const navigateSpy = router.navigate as jasmine.Spy;

    fixture.detectChanges();
    component.selectMainEntity('af');

    expect(navigateSpy).toHaveBeenCalledWith(['entity', 'af'], {
      relativeTo: {},
    });
  });
});
