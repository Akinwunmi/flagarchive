import { MenuItem } from '../models';

export const ENTITY_MENU_ITEMS: MenuItem[] = [
  {
    icon: 'info',
    label: 'common.details',
    path: ['details'],
  },
  {
    icon: 'flag',
    label: 'common.entity.plural',
    path: ['entities'],
  },
  {
    icon: 'history',
    label: 'common.historical-flags',
    path: ['history'],
  },
];
