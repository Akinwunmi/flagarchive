import {
  Entity,
  EntityFlag,
  EntityFlagColour,
  EntityFlagRange,
  EntityRange,
  EntitySource,
} from '@flagarchive/entities';

import {
  DbEntity,
  DbEntityFlag,
  DbEntityFlagColour,
  DbEntityFlagRange,
  DbEntityRange,
  DbEntitySource,
} from '../models';

/**
 * Maps flags with their associated ranges.
 * @param flags - The list of flags from the database.
 * @returns A record of flags mapped by their category, or undefined if no categories are provided.
 */
function mapFlags(flags: DbEntityFlag[] | null): EntityFlag[] | undefined {
  if (!flags?.length) {
    return undefined;
  }

  return flags.map((flag) => ({
    additional_urls: flag.additional_urls ?? undefined,
    categories: flag.categories,
    colours: mapFlagColours(flag.entity_flag_colours),
    designed_by: flag.designed_by ?? undefined,
    nickname: flag.nickname ?? undefined,
    ranges: mapFlagRanges(flag.entity_flag_ranges),
    ratio: flag.ratio ?? undefined,
    reverse_url: flag.reverse_url ?? undefined,
    url: flag.url,
  }));
}

function mapFlagColours(colours: DbEntityFlagColour[] | null): EntityFlagColour[] | undefined {
  if (!colours?.length) {
    return undefined;
  }

  return (
    colours.map((colour) => ({
      name: colour.name,
      hexadecimal: colour.hexadecimal,
      pms: colour.pms ? colour.pms.replace(/-/g, ' ') : undefined,
      secondary: colour.secondary,
    })) as EntityFlagColour[]
  ).sort((a, b) => {
    if (a.secondary !== b.secondary) {
      return a.secondary ? 1 : -1;
    }

    return a.name.localeCompare(b.name);
  });
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
    categories: range.categories ?? undefined,
    designed_by: range.designed_by ?? undefined,
    nickname: range.nickname ?? undefined,
    ratio: range.ratio ?? undefined,
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

function mapSources(rawSources: DbEntitySource[] | null): EntitySource[] | undefined {
  if (!rawSources?.length) {
    return undefined;
  }

  const sources = rawSources.map(({ name, url }) => ({ name, url })) as EntitySource[];
  return sources.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Sanitizes a raw database entity into an application-level entity.
 * @param rawEntity - The raw entity from the database.
 * @returns The sanitized entity.
 */
export function sanitizeEntity(rawEntity: DbEntity): Entity {
  const { entity_flags, entity_ranges, entity_sources, ...entity } = rawEntity;

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
    sources: mapSources(entity_sources),
  };
}
