import { faker } from '@faker-js/faker';
import { WorldAnvilListConversionStrategy } from '../../src/strategies/list-strategy';

describe('WorldAnvilListConversionStrategy', () => {
  const strategy = new WorldAnvilListConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  describe('WorldAnvil format', () => {
    test('should convert unordered lists to dash format', () => {
      const item1 = faker.lorem.words(2);
      const item2 = faker.lorem.words(3);
      const markdown = `- ${item1}\n- ${item2}`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`- ${item1}\n- ${item2}`);
    });

    test('should convert nested unordered lists with proper dash levels', () => {
      const item1 = faker.lorem.words(2);
      const subItem = faker.lorem.words(3);
      const item2 = faker.lorem.words(2);
      const markdown = `- ${item1}\n  - ${subItem}\n- ${item2}`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`- ${item1}\n-- ${subItem}\n- ${item2}`);
    });

    test('should convert deeply nested unordered lists', () => {
      const item = faker.lorem.word();
      const sub1 = faker.lorem.word();
      const sub2 = faker.lorem.word();
      const sub3 = faker.lorem.word();
      
      const markdown = `- ${item}\n  - ${sub1}\n    - ${sub2}\n      - ${sub3}`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`- ${item}\n-- ${sub1}\n--- ${sub2}\n---- ${sub3}`);
    });

    test('should convert ordered lists to [ol][li] format', () => {
      const item1 = faker.lorem.words(2);
      const item2 = faker.lorem.words(3);
      const markdown = `1. ${item1}\n2. ${item2}`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`[ol]\n  [li]${item1}[/li]\n  [li]${item2}[/li]\n[/ol]`);
    });

    test('should handle mixed unordered and ordered lists', () => {
      const unorderedItem = faker.lorem.words(2);
      const orderedItem1 = faker.lorem.words(3);
      const orderedItem2 = faker.lorem.words(2);
      
      const markdown = `- ${unorderedItem}\n\n1. ${orderedItem1}\n2. ${orderedItem2}`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`- ${unorderedItem}\n\n[ol]\n  [li]${orderedItem1}[/li]\n  [li]${orderedItem2}[/li]\n[/ol]`);
    });
  });
});
