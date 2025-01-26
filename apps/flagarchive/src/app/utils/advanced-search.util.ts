import { TranslateService } from '@ngx-translate/core';
import { SortDirection } from '../models';

export function sortBy<T, K extends keyof T>(
  array: T[],
  rawKey: K,
  sortDirection: SortDirection,
  translateService?: TranslateService,
): T[] {
  const direction = sortDirection === SortDirection.Desc ? -1 : 1;

  return [...array].sort((a, b) => {
    const aValue = getEntitiesTranslationKey(a[rawKey] as string, translateService);
    const bValue = getEntitiesTranslationKey(b[rawKey] as string, translateService);
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }

    return aValue > bValue ? direction : aValue < bValue ? -direction : 0;
  });
}

function getEntitiesTranslationKey(key: string, translateService?: TranslateService): string {
  return translateService ? translateService.instant('ENTITIES.' + key.toUpperCase()) : key;
}
