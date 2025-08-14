import { faker } from '@faker-js/faker';
import { StandardListConversionStrategy } from '../../../src/strategies/standard/list-strategy';

describe('StandardListConversionStrategy', () => {
  const strategy = new StandardListConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  describe('Traditional BBCode format', () => {
    test('should convert unordered lists to [list] format', () => {
      const item1 = faker.lorem.words(2);
      const item2 = faker.lorem.words(3);
      const markdown = `- ${item1}\n- ${item2}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`[list]\n[*] ${item1}\n[*] ${item2}\n[/list]\n`);
    });

    test('should convert ordered lists to [list] format', () => {
      const item1 = faker.lorem.words(2);
      const item2 = faker.lorem.words(3);
      const markdown = `1. ${item1}\n2. ${item2}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`[list]\n[*] ${item1}\n[*] ${item2}\n[/list]\n`);
    });

    test('should handle different list markers', () => {
      const item1 = faker.lorem.words(2);
      const item2 = faker.lorem.words(2);
      
      expect(strategy.convert(`- ${item1}\n- ${item2}`, 'bbcode')).toBe(`[list]\n[*] ${item1}\n[*] ${item2}\n[/list]\n`);
      expect(strategy.convert(`* ${item1}\n* ${item2}`, 'bbcode')).toBe(`[list]\n[*] ${item1}\n[*] ${item2}\n[/list]\n`);
      expect(strategy.convert(`+ ${item1}\n+ ${item2}`, 'bbcode')).toBe(`[list]\n[*] ${item1}\n[*] ${item2}\n[/list]\n`);
    });

    test('should handle nested lists with indentation', () => {
      const item1 = faker.lorem.words(2);
      const nestedItem = faker.lorem.words(3);
      const item2 = faker.lorem.words(2);
      
      const markdown = `- ${item1}\n  - ${nestedItem}\n- ${item2}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`[list]\n[*] ${item1}\n  [*] ${nestedItem}\n[*] ${item2}\n[/list]\n`);
    });
  });
});
