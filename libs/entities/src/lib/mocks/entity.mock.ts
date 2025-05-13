import { Entity, EntityType } from '../models';

export const ENTITIES_STUB: Entity[] = [
  {
    id: 1,
    unique_id: 'af',
    name: 'africa',
    type: EntityType.Continent,
  },
  {
    id: 2,
    unique_id: 'com',
    parent_ids: ['af'],
    ranges: [
      {
        alt_parent_id: 'fra',
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
    id: 123,
    unique_id: 'nld-dren-dewol-zuidwo',
    parent_ids: ['nld-dren-dewol'],
    name: 'zuidwolde',
    type: EntityType.Village,
  },
  {
    id: 124,
    unique_id: 'nld-gron-hogel-zuidwo',
    parent_ids: ['nld-gron-hogel'],
    name: 'zuidwolde',
    type: EntityType.Village,
  },
  {
    id: 24,
    unique_id: 'cog',
    parent_ids: ['af'],
    name: 'republic_of_the_congo',
    type: EntityType.Country,
  },
  {
    id: 25,
    unique_id: 'cod',
    parent_ids: ['af'],
    name: 'democratic_republic_of_the_congo',
    type: EntityType.Country,
  },
  {
    id: 79,
    unique_id: 'cyp',
    name: 'cyprus',
    type: EntityType.Country,
  },
  {
    id: 210,
    unique_id: 'oi-ioc',
    name: 'international_olympic_committee',
    type: EntityType.Organization,
  },
];
