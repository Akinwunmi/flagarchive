import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { FIREBASE_CONFIG } from '../../firebase.config';
import { ENTITIES_STUB, EntityServiceStub } from '../../mocks';
import { EntityService } from '../../services';
import { EntitiesStore } from '../../state';

import { DiscoverComponent } from './discover.component';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let entitiesStore: InstanceType<typeof EntitiesStore>;
  let fixture: ComponentFixture<DiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DiscoverComponent,
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
          provide: EntityService,
          useClass: EntityServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoverComponent);
    entitiesStore = TestBed.inject(EntitiesStore);
    component = fixture.componentInstance;
  });

  function setup() {
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should set as main entity if type is continent or organization', fakeAsync(() => {
    const mainEntity = ENTITIES_STUB.find(entity => entity.type === 'continent');
    const id$ = new Subject<string>();
    if (!mainEntity) {
      throw new Error('Main entity not found');
    }

    setup();
    entitiesStore.getEntities(id$);
    id$.next(mainEntity.id);
    tick(50);

    expect(component.isMainEntity()).toBeTrue();
  }));
});
