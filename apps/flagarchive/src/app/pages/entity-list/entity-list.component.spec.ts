import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';

import { FIREBASE_CONFIG } from '../../firebase.config';
import { ENTITIES_STUB } from '../../mocks';

import { EntityListComponent } from './entity-list.component';

describe('EntityListComponent', () => {
  const mockRouter = {
    url: '/entity/as',
    navigate: jasmine.createSpy('navigate'),
    events: of(new NavigationEnd(0, '', '')),
  };
  let component: EntityListComponent;
  let fixture: ComponentFixture<EntityListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityListComponent],
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

    fixture = TestBed.createComponent(EntityListComponent);
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

  it('should navigate to entity by id', () => {
    const navigateSpy = router.navigate as jasmine.Spy;

    setup();
    component.getEntitiesAndNavigate(ENTITIES_STUB[0]);

    expect(navigateSpy).toHaveBeenCalledWith(['..', ENTITIES_STUB[0].id], { relativeTo: {} });
  });

  it('should navigate to entity by alt id', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    const entity = ENTITIES_STUB.find(entity => entity.altId);
    if (!entity) {
      throw new Error('No entity with altId found');
    }

    setup();
    component.getEntitiesAndNavigate(entity);

    expect(navigateSpy).toHaveBeenCalledWith(['..', entity.altId], { relativeTo: {} });
  });
});
