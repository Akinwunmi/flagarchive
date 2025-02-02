import { Entity } from '../models';

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
    translationKey: 'comoros',
    type: 'country',
  },
  {
    baseId: 'bar',
    id: 'eu-nld-dren-dewol-zuidwo',
    parentId: 'eu-nld-dren-dewol',
    translationKey: 'zuidwolde',
    type: 'village',
  },
  {
    baseId: 'baz',
    id: 'eu-nld-gron-hogel-zuidwo',
    parentId: 'eu-nld-gron-hogel',
    translationKey: 'zuidwolde',
    type: 'village',
  },
  {
    baseId: 'qux',
    id: 'af',
    translationKey: 'africa',
    type: 'continent',
  },
  {
    baseId: 'quux',
    id: 'af-cog',
    parentId: 'af',
    translationKey: 'republic_of_the_congo',
    type: 'country',
  },
  {
    baseId: 'corge',
    id: 'af-cod',
    parentId: 'af',
    translationKey: 'democratic_republic_of_the_congo',
    type: 'country',
  },
  {
    baseId: 'grault',
    altId: 'as-cyp',
    id: 'eu-cyp',
    translationKey: 'cyprus',
    type: 'country',
  },
  {
    baseId: 'garply',
    id: 'oi-ioc',
    translationKey: 'international_olympic_committee',
    type: 'organization',
  },
];
