import { FlagCategory } from '../models';

export const NATIONAL_ENSIGN_CATEGORIES = [
  FlagCategory.CivilEnsign,
  FlagCategory.NavalEnsign,
  FlagCategory.StateEnsign,
];

export const NATIONAL_FLAG_CATEGORIES = [
  FlagCategory.CivilFlag,
  FlagCategory.StateFlag,
  FlagCategory.WarFlag,
];

export const NATIONAL_CATEGORIES = [
  ...NATIONAL_ENSIGN_CATEGORIES,
  ...NATIONAL_FLAG_CATEGORIES,
  FlagCategory.Unofficial,
];

export const OTHER_NATIONAL_CATEGORIES = [
  FlagCategory.NavalJack,
  FlagCategory.PresidentialStandard,
  FlagCategory.RoyalStandard,
  FlagCategory.Unofficial,
];

export const ORGANIZATION_CATEGORIES = [
  FlagCategory.CommunityFlag,
  FlagCategory.InstitutionalFlag,
  FlagCategory.Unofficial,
];
