import { FlagCategory } from '@flagarchive/advanced-search';
import { Entity, EntityFlag, EntityFlagRange, EntityRange } from '@flagarchive/entities';

import {
  DbEntity,
  DbEntityFlagCategory,
  DbEntityFlagCategoryRange,
  DbEntityRange,
} from '../models';

/**
 * Maps categories to flags with their associated ranges.
 * @param categories - The list of flag categories from the database.
 * @returns A record of flag categories mapped to their flags, or undefined if no categories are provided.
 */
function mapCategoriesToFlags(
  categories: DbEntityFlagCategory[] | null,
): Record<FlagCategory, EntityFlag> | undefined {
  if (!categories) {
    return undefined;
  }

  return categories.reduce(
    (flags, flagCategory) => {
      const { category, entity_flag_category_ranges, url, reverse_url } = flagCategory;
      if (!category) {
        return flags;
      }

      flags[category] = {
        url: url ?? '',
        reverse_url: reverse_url ?? undefined,
        ranges: mapFlagRanges(entity_flag_category_ranges),
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
function mapFlagRanges(ranges: DbEntityFlagCategoryRange[] | null): EntityFlagRange[] | undefined {
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
  const { entity_flag_categories, entity_ranges, ...entity } = rawEntity;

  return {
    id: entity.id,
    name: entity.name,
    type: entity.type,
    unique_id: entity.unique_id,
    alt_parent_id: entity.alt_parent_id ?? undefined,
    has_no_children: entity.has_no_children ?? undefined,
    hoisted_right: entity.hoisted_right ?? undefined,
    parent_ids: entity.parent_ids ?? undefined,
    flags: mapCategoriesToFlags(entity_flag_categories),
    ranges: mapRanges(entity_ranges),
  };
}
