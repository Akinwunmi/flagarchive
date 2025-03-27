import { Entity } from '@flagarchive/entities';

export function sortEntities(entities: Entity[]) {
  return entities.sort((a, b) => a.name.localeCompare(b.name));
}
