import { EntityFlagRange, EntityRange } from '@flagarchive/entities';

export function getActiveRange(
  year: number,
  ranges?: EntityFlagRange[] | EntityRange[]
): EntityFlagRange | EntityRange | undefined {
  return ranges?.find((range) => {
    const end = range.end ?? Infinity; // Treat open-ended ranges as infinite
    return year >= range.start && year <= end;
  });
}
