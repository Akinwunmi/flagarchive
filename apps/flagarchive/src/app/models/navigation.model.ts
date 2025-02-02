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
