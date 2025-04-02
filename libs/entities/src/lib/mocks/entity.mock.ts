import { Entity, EntityType } from '../models';

export const ENTITIES_STUB: Entity[] = [
  {
    baseId: 'foo',
    id: 'af-com',
    parentId: 'af',
    ranges: [
      {
        altParentId: 'eu-fra',
        end: 1975,
        start: 1963,
      },
      {
        start: 1975,
      },
    ],
    name: 'comoros',
    type: EntityType.Country,
  },
  {
    baseId: 'bar',
    id: 'eu-nld-dren-dewol-zuidwo',
    parentId: 'eu-nld-dren-dewol',
    name: 'zuidwolde',
    type: EntityType.Village,
  },
  {
    baseId: 'baz',
    id: 'eu-nld-gron-hogel-zuidwo',
    parentId: 'eu-nld-gron-hogel',
    name: 'zuidwolde',
    type: EntityType.Village,
  },
  {
    baseId: 'qux',
    id: 'af',
    name: 'africa',
    type: EntityType.Continent,
  },
  {
    baseId: 'quux',
    id: 'af-cog',
    parentId: 'af',
    name: 'republic_of_the_congo',
    type: EntityType.Country,
  },
  {
    baseId: 'corge',
    id: 'af-cod',
    parentId: 'af',
    name: 'democratic_republic_of_the_congo',
    type: EntityType.Country,
  },
  {
    baseId: 'grault',
    altId: 'as-cyp',
    id: 'eu-cyp',
    name: 'cyprus',
    type: EntityType.Country,
  },
  {
    baseId: 'garply',
    id: 'oi-ioc',
    name: 'international_olympic_committee',
    type: EntityType.Organization,
  },
];
