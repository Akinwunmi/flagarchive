import { FlagCategory } from '@flagarchive/advanced-search';

export const USAGE_SYMBOL_INDICES: Record<FlagCategory, number | [number, number, number]> = {
  [FlagCategory.CivilEnsign]: 3,
  [FlagCategory.CivilFlag]: 0,
  [FlagCategory.CommunityFlag]: -1,
  [FlagCategory.InstitutionalFlag]: -1,
  [FlagCategory.NationalEnsign]: [3, 4, 5],
  [FlagCategory.NationalFlag]: [0, 1, 2],
  [FlagCategory.NavalEnsign]: 5,
  [FlagCategory.NavalJack]: -1,
  [FlagCategory.PresidentialStandard]: -1,
  [FlagCategory.RoyalStandard]: -1,
  [FlagCategory.StateEnsign]: 4,
  [FlagCategory.StateFlag]: 1,
  [FlagCategory.Unofficial]: -1,
  [FlagCategory.WarFlag]: 2,
};
