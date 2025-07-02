import { MenuItem } from '../models';

export const ENTITY_MENU_ITEMS: MenuItem[] = [
  {
    icon: 'info',
    fragment: 'details',
    label: 'common.details',
    path: [],
  },
  {
    icon: 'flag',
    fragment: 'entities',
    label: 'common.entity.plural',
    path: [],
  },
  {
    icon: 'history',
    fragment: 'history',
    label: 'common.historical-flags',
    path: [],
  },
  {
    icon: 'asterisk',
    fragment: 'sources',
    label: 'common.sources',
    path: [],
  },
];
