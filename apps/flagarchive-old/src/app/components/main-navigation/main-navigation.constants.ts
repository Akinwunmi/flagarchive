import { SubtopicPath } from '../../models';
import { BreadcrumbItem } from './main-navigation.model';

export const MENU_ITEMS: BreadcrumbItem[] = [
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
