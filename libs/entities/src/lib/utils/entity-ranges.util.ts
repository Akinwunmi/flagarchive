import { CURRENT_YEAR } from '@flagarchive/ui';
import { EntityFlagRange, EntityRange } from '../models';

export function getActiveRange(
  selectedYear: number,
  ranges?: EntityFlagRange[] | EntityRange[],
): EntityFlagRange | EntityRange | undefined {
  return ranges?.find((range) => {
    const end = range.end ?? CURRENT_YEAR;
    return selectedYear >= range.start && selectedYear <= end;
  });
}
