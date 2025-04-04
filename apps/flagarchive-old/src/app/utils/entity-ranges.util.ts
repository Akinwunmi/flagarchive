import { EntityFlagRange, EntityRange } from '@flagarchive/entities';
import { CURRENT_YEAR } from '@flagarchive/ui';

export function getActiveRange(
  year: number,
  ranges?: EntityFlagRange[] | EntityRange[],
): EntityFlagRange | EntityRange | undefined {
  return ranges?.find((range) => {
    const end = range.end ?? CURRENT_YEAR;
    return year >= range.start && year <= end;
  });
}
