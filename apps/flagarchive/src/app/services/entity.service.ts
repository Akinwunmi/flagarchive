import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  limit,
  query,
  where,
} from '@angular/fire/firestore';
import { Entity } from '@flagarchive/entities';
import { combineLatest, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  readonly #firestore = inject(Firestore);
  readonly #environmentInjector = inject(EnvironmentInjector);

  #entitiesCollection = collection(this.#firestore, 'entities');

  getEntityById(id: string): Observable<Entity> {
    return runInInjectionContext(this.#environmentInjector, () => {
      const entities = query(this.#entitiesCollection, where('id', '==', id), limit(1));
      const entities$ = collectionData(entities, {
        idField: 'baseId',
      }) as Observable<Entity[]>;

      return entities$.pipe(map((entities) => entities[0]));
    });
  }

  getEntitiesByParentId(id: string, altParentId?: boolean): Observable<Entity[]> {
    // Injection context is needed when using zoneless change detection
    return runInInjectionContext(this.#environmentInjector, () => {
      const entitiesWithAltParentId = query(
        this.#entitiesCollection,
        where('altParentId', '==', id),
        limit(75),
      );
      const entitiesWithParentId = query(
        this.#entitiesCollection,
        where('parentIds', 'array-contains', id),
        limit(75),
      );
      return combineLatest([
        altParentId
          ? (collectionData(entitiesWithAltParentId, { idField: 'baseId' }) as Observable<Entity[]>)
          : of([]),
        collectionData(entitiesWithParentId, { idField: 'baseId' }) as Observable<Entity[]>,
      ]).pipe(
        map(([entitiesWithAltParentId, entitiesWithParentId]) => [
          ...entitiesWithAltParentId,
          ...entitiesWithParentId,
        ]),
      );
    });
  }

  getEntitiesByType(types: string[]): Observable<Entity[]> {
    return runInInjectionContext(this.#environmentInjector, () => {
      const entities = query(this.#entitiesCollection, where('type', 'in', types), limit(75));
      return collectionData(entities, { idField: 'baseId' }) as Observable<Entity[]>;
    });
  }
}
