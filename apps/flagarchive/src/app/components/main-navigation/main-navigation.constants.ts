import { SubtopicPath, FilterOption } from '../../models';

export const MENU_ITEMS: FilterOption[] = [
  {
    active: true,
    icon: 'category',
    label: 'DISCOVER.REGIONS',
    value: SubtopicPath.Regions,
  },
  {
    active: false,
    icon: 'list',
    label: 'DISCOVER.DETAILS',
    value: SubtopicPath.Details,
  },
  {
    active: false,
    icon: 'timeline',
    label: 'DISCOVER.HISTORY',
    value: SubtopicPath.History,
  },
];
