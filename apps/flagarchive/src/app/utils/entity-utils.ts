import { FlagCategory } from '@flagarchive/advanced-search';
import { Entity, EntityFlag, EntityFlagRange, EntityRange } from '@flagarchive/entities';

import { DbEntity, DbEntityFlag, DbEntityFlagRange, DbEntityRange } from '../models';

/**
 * Maps flags with their associated ranges.
 * @param flags - The list of flags from the database.
 * @returns A record of flags mapped by their category, or undefined if no categories are provided.
 */
function mapFlags(
  entityFlags: DbEntityFlag[] | null,
): Record<FlagCategory, EntityFlag> | undefined {
  if (!entityFlags) {
    return undefined;
  }

  return entityFlags.reduce(
    (flags, flag) => {
      const { category, entity_flag_ranges, url, reverse_url } = flag;
      if (!category) {
        return flags;
      }

      flags[category] = {
        url: url ?? '',
        reverse_url: reverse_url ?? undefined,
        ranges: mapFlagRanges(entity_flag_ranges),
      };

      return flags;
    },
    {} as Record<FlagCategory, EntityFlag>,
  );
}

/**
 * Maps database flag ranges to entity flag ranges.
 * @param ranges - The list of flag ranges from the database.
 * @returns A list of entity flag ranges, or undefined if no ranges are provided.
 */
function mapFlagRanges(ranges: DbEntityFlagRange[] | null): EntityFlagRange[] | undefined {
  if (!ranges?.length) {
    return undefined;
  }

  return ranges.map((range) => ({
    start: range.start,
    end: range.end ?? undefined,
    reverse_url: range.reverse_url ?? undefined,
    url: range.url ?? undefined,
  })) as EntityFlagRange[];
}

/**
 * Maps database ranges to entity ranges.
 * @param ranges - The list of ranges from the database.
 * @returns A list of entity ranges, or undefined if no ranges are provided.
 */
function mapRanges(ranges: DbEntityRange[] | null): EntityRange[] | undefined {
  if (!ranges?.length) {
    return undefined;
  }

  return ranges.map((range) => ({
    start: range.start,
    end: range.end ?? undefined,
    alt_parent_id: range.alt_parent_id ?? undefined,
    name: range.name ?? undefined,
    parent_ids: range.parent_ids ?? undefined,
    type: range.type ?? undefined,
  })) as EntityRange[];
}

/**
 * Sanitizes a raw database entity into an application-level entity.
 * @param rawEntity - The raw entity from the database.
 * @returns The sanitized entity.
 */
export function sanitizeEntity(rawEntity: DbEntity): Entity {
  const { entity_flags, entity_ranges, ...entity } = rawEntity;

  return {
    id: entity.id,
    name: entity.name,
    type: entity.type,
    unique_id: entity.unique_id,
    alt_parent_id: entity.alt_parent_id ?? undefined,
    has_no_children: entity.has_no_children ?? undefined,
    hoisted_right: entity.hoisted_right ?? undefined,
    parent_ids: entity.parent_ids ?? undefined,
    flags: mapFlags(entity_flags),
    ranges: mapRanges(entity_ranges),
  };
}
