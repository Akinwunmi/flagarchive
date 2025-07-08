import { FlagCategory } from '@flagarchive/advanced-search';
import { EntityType } from '@flagarchive/entities';

import { DbEntity } from '../models';

export const DB_ENTITIES_STUB: DbEntity[] = [
  {
    alt_parent_id: null,
    entity_flags: [],
    entity_ranges: [],
    entity_sources: [],
    id: 1,
    inserted_at: '2023-01-01T00:00:00Z',
    name: 'democratic_republic_of_the_congo',
    type: EntityType.Country,
    unique_id: 'cod',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    alt_parent_id: null,
    entity_flags: [
      {
        categories: [FlagCategory.NationalFlag],
        entity_flag_colours: [
          {
            flag_id: 2,
            hexadecimal: '#FF0000',
            id: 2,
            name: 'Red',
            pms: '186 C',
            secondary: false,
          },
          {
            flag_id: 2,
            hexadecimal: '#FFFFFF',
            id: 3,
            name: 'White',
            pms: 'White',
            secondary: true,
          },
          {
            flag_id: 2,
            hexadecimal: '#0000FF',
            id: 4,
            name: 'Blue',
            pms: '286 C',
            secondary: true,
          },
        ],
        entity_flag_ranges: [
          {
            end: 2023,
            id: 2,
            start: 2020,
            flag_id: 2,
          },
        ],
        entity_id: 2,
        id: 2,
        url: 'https://example.com/flag.png',
      },
    ],
    entity_ranges: [
      {
        entity_id: 2,
        id: 1,
        start: 2020,
      },
    ],
    entity_sources: [
      {
        entity_id: 2,
        id: 1,
        name: 'Example Source 1',
        url: 'https://example.com/source',
      },
      {
        entity_id: 2,
        id: 2,
        name: 'Example Source 2',
        url: 'https://example.com/source',
      },
    ],
    id: 2,
    inserted_at: '2023-01-01T00:00:00Z',
    name: 'comoros',
    type: EntityType.Country,
    unique_id: 'com',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    alt_parent_id: null,
    entity_flags: [
      {
        categories: [FlagCategory.NationalFlag],
        entity_flag_colours: [],
        entity_flag_ranges: [],
        entity_id: 3,
        id: 3,
        url: 'https://example.com/flag.png',
      },
    ],
    entity_ranges: [],
    entity_sources: [],
    id: 3,
    inserted_at: '2023-01-01T00:00:00Z',
    name: 'cyprus',
    type: EntityType.Country,
    unique_id: 'cyp',
    updated_at: '2023-01-01T00:00:00Z',
  },
];
