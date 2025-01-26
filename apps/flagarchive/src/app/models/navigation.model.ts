import { FilterOption } from './advanced-search.model';
import { FlagImage } from './flag.model';

export enum RouteIndex {
  Topic = 1,
  Entity = 2,
  EntityId = 3,
  Subtopic = 4,
}

export enum RootPath {
  Discover = 'discover',
  Entity = 'entity',
}

export enum SubtopicPath {
  Details = 'details',
  History = 'history',
  Regions = 'regions',
}

export interface MenuItem {
  icon: string;
  label: string;
  link: SubtopicPath;
  active?: boolean;
}

export interface BreadcrumbItem {
  callback?: () => void;
  flag?: FlagImage;
  icon?: string;
  label: string;
  options?: FilterOption[];
}
