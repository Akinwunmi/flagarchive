import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { Subject, throwError } from 'rxjs';

import { ENTITIES_STUB, EntityServiceStub } from '../../mocks';
import { Entity, EntityType } from '../../models';
import { EntityService } from '../../services';
import { AdvancedSearchStore } from '../advanced-search/advanced-search.store';

import { EntitiesStore } from './entities.store';

describe('EntitiesStore', () => {
  let advancedSearchStore: InstanceType<typeof AdvancedSearchStore>;
  let entitiesStore: InstanceType<typeof EntitiesStore>;
  let entityService: EntityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        {
          provide: EntityService,
          useClass: EntityServiceStub,
        },
      ],
    }).compileComponents();

    advancedSearchStore = TestBed.inject(AdvancedSearchStore);
    entitiesStore = TestBed.inject(EntitiesStore);
    entityService = TestBed.inject(EntityService);
  });

  it('should add entities', fakeAsync(() => {
    const entities$ = new Subject<Entity[]>();
    const entities = ENTITIES_STUB;

    entitiesStore.addEntities(entities$);
    entities$.next(entities);
    tick(50);

    expect(entitiesStore.all()).toEqual(ENTITIES_STUB);
  }));

  it('should handle add entities error', fakeAsync(() => {
    const entities$ = new Subject<Entity[]>();
    const entities = ENTITIES_STUB;

    jest
      .spyOn(entityService, 'addEntities')
      .mockReturnValue(throwError(() => 'error'));

    entitiesStore.addEntities(entities$);
    entities$.next(entities);
    tick(50);

    expect(entitiesStore.all()).toEqual([]);
  }));

  it('should get entities', fakeAsync(() => {
    const id$ = new Subject<string>();
    const entity = ENTITIES_STUB.find((entity) => entity.id === 'af');
    const id = entity?.id;
    const currentEntities = ENTITIES_STUB.filter(
      (entity) => entity.parentId === id
    );
    if (!id) {
      throw new Error('Entity not found');
    }

    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(entitiesStore.current()).toEqual(currentEntities);
    expect(entitiesStore.selectedId()).toEqual(id);
    expect(entitiesStore.selected().entity).toEqual(entity);
  }));

  it('should handle get entity by id error', fakeAsync(() => {
    const id$ = new Subject<string>();
    const id = ENTITIES_STUB[0].id;

    jest
      .spyOn(entityService, 'getEntityById')
      .mockReturnValue(throwError(() => 'error'));

    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(entitiesStore.foundEntity()).toEqual(undefined);
  }));

  it('should handle get entities by parent id error', fakeAsync(() => {
    const id$ = new Subject<string>();
    const id = ENTITIES_STUB[0].id;

    jest
      .spyOn(entityService, 'getEntitiesByParentId')
      .mockReturnValue(throwError(() => 'error'));

    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(entitiesStore.current()).toEqual([]);
  }));

  it('should update selected year when lower then min year', fakeAsync(() => {
    const id$ = new Subject<string>();
    const id = ENTITIES_STUB[0].id;

    advancedSearchStore.updateSelectedYear(1950);
    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(advancedSearchStore.selectedYear()).toEqual(1963);
  }));

  it('should update selected year when higher then max year', fakeAsync(() => {
    const currentYear = new Date().getFullYear();
    const id$ = new Subject<string>();
    const id = ENTITIES_STUB[0].id;

    advancedSearchStore.updateSelectedYear(2030);
    entitiesStore.getEntities(id$);
    id$.next(id);
    tick(50);

    expect(advancedSearchStore.selectedYear()).toEqual(currentYear);
  }));

  it('should get main entities', fakeAsync(() => {
    entitiesStore.getMainEntities();
    tick(50);

    expect(entitiesStore.main()).toEqual(
      ENTITIES_STUB.filter(
        (entity) =>
          entity.type === EntityType.Continent ||
          entity.type === EntityType.Organization
      )
    );
  }));

  it('should handle get main entities error', fakeAsync(() => {
    jest
      .spyOn(entityService, 'getEntitiesByType')
      .mockReturnValue(throwError(() => 'error'));

    entitiesStore.getMainEntities();
    tick(50);

    expect(entitiesStore.main()).toEqual([]);
  }));
});
