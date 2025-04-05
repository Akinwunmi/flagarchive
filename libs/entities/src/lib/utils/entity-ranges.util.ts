import { EntityFlagRange, EntityRange } from '../models';

export function getActiveRange(
  selectedYear: number,
  ranges?: EntityFlagRange[] | EntityRange[],
): EntityFlagRange | EntityRange | undefined {
  return ranges?.find((range) => {
    const end = range.end ?? Infinity; // Treat open-ended ranges as infinite
    return selectedYear >= range.start && selectedYear <= end;
  });
}
