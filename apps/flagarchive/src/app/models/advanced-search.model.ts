export enum FlagCategory {
  CivilEnsign = 'civil_ensign',
  NavalEnsign = 'naval_ensign',
  NavalJack = 'naval_jack',
  Official = 'official',
  PresidentialStandard = 'presidential_standard',
  RoyalStandard = 'royal_standard',
  Unofficial = 'unofficial',
}

export enum Layout {
  Grid = 'grid',
  List = 'list',
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface FilterOption<T = string> {
  active: boolean;
  value: T;
  callback?: () => void;
  icon?: string;
  label?: string;
}