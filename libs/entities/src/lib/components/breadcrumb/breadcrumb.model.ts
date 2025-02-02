import { FilterOption } from '@flagarchive/advanced-search';

import { FlagImage } from '../../models';

export interface BreadcrumbItem {
  callback?: () => void;
  flag?: FlagImage;
  icon?: string;
  label: string;
  options?: FilterOption[];
}
