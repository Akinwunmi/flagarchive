import { DB_ENTITIES_STUB } from '../mocks';
import { sanitizeEntity } from './entity-utils';

describe(sanitizeEntity.name, () => {
  it('should map to domain entity', () => {
    const entity = sanitizeEntity(DB_ENTITIES_STUB[1]);

    expect(entity.alt_parent_id).toBeUndefined();
    expect(entity.id).toBe(2);
    expect(entity.name).toBe('comoros');
    expect(entity.flags?.[0].url).toBe('https://example.com/flag.png');
  });

  it('should handle entities without flags', () => {
    const entity = sanitizeEntity(DB_ENTITIES_STUB[0]);

    expect(entity.alt_parent_id).toBeUndefined();
    expect(entity.id).toBe(1);
    expect(entity.name).toBe('democratic_republic_of_the_congo');
    expect(entity.flags).toBeUndefined();
  });

  it('should handle entities without flag colours and ranges', () => {
    const entity = sanitizeEntity(DB_ENTITIES_STUB[2]);

    expect(entity.alt_parent_id).toBeUndefined();
    expect(entity.id).toBe(3);
    expect(entity.name).toBe('cyprus');
    expect(entity.flags?.[0].colours).toBeUndefined();
    expect(entity.flags?.[0].ranges).toBeUndefined();
  });
});
