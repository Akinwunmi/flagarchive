import { of } from 'rxjs';

import { Entity } from '../models';

import { ENTITIES_STUB } from './entity.mock';

export class EntityServiceStub {
  addEntities(entities: Entity[]) {
    return of(entities);
  }

  getEntityById(id: string) {
    return of(ENTITIES_STUB.find((entity) => entity.id === id));
  }

  getEntitiesByParentId(parentId: string) {
    return of(ENTITIES_STUB.filter((entity) => entity.parentId === parentId));
  }

  getEntitiesByType(types: string[]) {
    return of(ENTITIES_STUB.filter((entity) => types.includes(entity.type)));
  }
}
