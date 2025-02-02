import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  limit,
  query,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { Entity, EntityWithoutBaseId } from '@flagarchive/entities';
import { combineLatest, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  readonly #firestore = inject(Firestore);

  #entities = collection(this.#firestore, 'entities');

  addEntities(entities: EntityWithoutBaseId[]): Observable<string> {
    const batch = writeBatch(this.#firestore);
    entities.forEach((entity) => {
      batch.set(doc(this.#entities), entity);
    });
    const promise = batch.commit().then(() => 'success');
    return from(promise);
  }

  getEntityById(id: string): Observable<Entity> {
    const entities = query(this.#entities, where('id', '==', id), limit(1));
    const entities$ = collectionData(entities, {
      idField: 'baseId',
    }) as Observable<Entity[]>;

    return entities$.pipe(map((entities) => entities[0]));
  }

  getEntitiesByParentId(id: string): Observable<Entity[]> {
    const entities = query(
      this.#entities,
      where('parentId', '==', id),
      limit(75)
    );
    const entitiesFromArray = query(
      this.#entities,
      where('parentIds', 'array-contains', id),
      limit(75)
    );

    return combineLatest([
      collectionData(entities, { idField: 'baseId' }) as Observable<Entity[]>,
      collectionData(entitiesFromArray, { idField: 'baseId' }) as Observable<
        Entity[]
      >,
    ]).pipe(
      map(([entities, entitiesFromArray]) => [
        ...entities,
        ...entitiesFromArray,
      ])
    );
  }

  getEntitiesByType(types: string[]): Observable<Entity[]> {
    const entities = query(
      this.#entities,
      where('type', 'in', types),
      limit(75)
    );
    return collectionData(entities, { idField: 'baseId' }) as Observable<
      Entity[]
    >;
  }
}
