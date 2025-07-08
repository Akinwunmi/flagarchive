import { TranslateService } from '@ngx-translate/core';

import { NATIONAL_ENSIGN_CATEGORIES, NATIONAL_FLAG_CATEGORIES } from '../constants';
import { FlagCategory, SortDirection } from '../models';

export function isActiveFlagCategory(
  categories: FlagCategory[],
  activeCategory: FlagCategory,
): boolean {
  if (
    categories.includes(FlagCategory.NationalEnsign) &&
    NATIONAL_ENSIGN_CATEGORIES.includes(activeCategory)
  ) {
    return true;
  }

  if (
    categories.includes(FlagCategory.NationalFlag) &&
    NATIONAL_FLAG_CATEGORIES.includes(activeCategory)
  ) {
    return true;
  }

  return categories.includes(activeCategory);
}

export function sortBy<T, K extends keyof T>(
  array: T[],
  rawKey: K,
  sortDirection: SortDirection,
  translate?: TranslateService,
): T[] {
  const direction = sortDirection === SortDirection.Desc ? -1 : 1;

  return [...array].sort((a, b) => {
    const aValue = getEntityName(a[rawKey] as string, translate);
    const bValue = getEntityName(b[rawKey] as string, translate);
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }

    return aValue > bValue ? direction : aValue < bValue ? -direction : 0;
  });
}

function getEntityName(key: string, translate?: TranslateService): string {
  return translate ? translate.instant('entities.' + key) : key;
}
