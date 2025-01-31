import { TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { FIREBASE_CONFIG } from '../../firebase.config';
import { ENTITIES_STUB } from '../../mocks';
import { EntityType } from '../../models';

import { EntityService } from './entity.service';

describe('EntityService', () => {
  let service: EntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get entity by id', async () => {
    const entity = await service.getEntityById(ENTITIES_STUB[0].id);
    expect(entity).toBeTruthy();
  });

  it('should get all entities by parent id', async () => {
    const entities = await service.getEntitiesByParentId(ENTITIES_STUB[0].id);
    expect(entities).toBeTruthy();
  });

  it('should get all entities by type', async () => {
    const entities = await service.getEntitiesByType([EntityType.Continent]);
    expect(entities).toBeTruthy();
  });
});
