import { describe, it, expect } from 'vitest';
import { realms, realmKeys } from '../../src/data/realms';
import type { RealmKey } from '../../src/data/types';

describe('Realms Data Validation', () => {
  const realmsArray = Object.values(realms);

  it('should have exactly 10 realms', () => {
    expect(realmsArray).toHaveLength(10);
    expect(realmKeys).toHaveLength(10);
  });

  it('should have all expected realm keys', () => {
    const expectedKeys: RealmKey[] = [
      'abyss', 'cavern', 'dross', 'ember', 'glare',
      'languish', 'mist', 'oasis', 'trace', 'zenith'
    ];

    expectedKeys.forEach(key => {
      expect(realmKeys).toContain(key);
    });
  });

  it('should have all required fields for each realm', () => {
    realmsArray.forEach(realm => {
      expect(realm.id).toBeDefined();
      expect(realm.name).toBeDefined();
      expect(realm.color).toBeDefined();
      expect(realm.quote || realm.lore).toBeDefined();

      // Check types
      expect(typeof realm.id).toBe('string');
      expect(typeof realm.name).toBe('string');
      expect(typeof realm.color).toBe('string');

      // Check non-empty
      expect(realm.id.length).toBeGreaterThan(0);
      expect(realm.name.length).toBeGreaterThan(0);
    });
  });

  it('should have unique realm keys', () => {
    const keys = realmsArray.map(r => r.id);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });

  it('should have unique realm names', () => {
    const names = realmsArray.map(r => r.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it('should have realm keys matching TypeScript RealmKey type', () => {
    const expectedKeys: RealmKey[] = [
      'abyss', 'cavern', 'dross', 'ember', 'glare',
      'languish', 'mist', 'oasis', 'trace', 'zenith'
    ];

    realmsArray.forEach(realm => {
      expect(expectedKeys).toContain(realm.id as RealmKey);
    });
  });

  it('should have proper capitalization in realm names', () => {
    realmsArray.forEach(realm => {
      // Name should start with capital letter
      expect(realm.name[0]).toBe(realm.name[0].toUpperCase());
    });
  });

  it('should have color values defined', () => {
    realmsArray.forEach(realm => {
      // Color should be a non-empty string
      expect(realm.color).toBeDefined();
      expect(realm.color.length).toBeGreaterThan(0);
    });
  });

  it('should have meaningful descriptions', () => {
    realmsArray.forEach(realm => {
      // Quote or lore should be at least 20 characters
      const description = realm.quote || realm.lore || '';
      expect(description.length).toBeGreaterThanOrEqual(20);
    });
  });
});
