import { FilterOption } from '@flagarchive/advanced-search';

import { SubtopicPath } from '../../models';

export const MENU_ITEMS: FilterOption[] = [
  {
    active: true,
    icon: 'category',
    label: 'discover.regions',
    value: SubtopicPath.Regions,
  },
  {
    active: false,
    icon: 'list',
    label: 'discover.details',
    value: SubtopicPath.Details,
  },
  {
    active: false,
    icon: 'timeline',
    label: 'discover.history',
    value: SubtopicPath.History,
  },
];
