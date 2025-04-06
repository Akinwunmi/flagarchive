import { TranslateService } from '@ngx-translate/core';

import { SortDirection } from '../models';

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
