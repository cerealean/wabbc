import { faker } from '@faker-js/faker';
import { SubscriptConversionStrategy } from '../../src/strategies/subscript-strategy';

describe('SubscriptConversionStrategy', () => {
  const strategy = new SubscriptConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test('should convert subscript for WorldAnvil format', () => {
    const text = faker.lorem.word();
    const markdown = `<sub>${text}</sub>`;
    const result = strategy.convert(markdown, 'worldanvil');
    expect(result).toBe(`[sub]${text}[/sub]`);
  });

  test('should not convert subscript for standard BBCode format', () => {
    const text = faker.lorem.word();
    const markdown = `<sub>${text}</sub>`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(markdown); // Should remain unchanged
  });

  test('should handle multiple subscripts in WorldAnvil format', () => {
    const text1 = faker.lorem.word();
    const text2 = faker.lorem.word();
    const markdown = `H<sub>${text1}</sub>O and CO<sub>${text2}</sub>`;
    const result = strategy.convert(markdown, 'worldanvil');
    expect(result).toBe(`H[sub]${text1}[/sub]O and CO[sub]${text2}[/sub]`);
  });

  test('should handle multiple subscripts in standard BBCode format', () => {
    const text1 = faker.lorem.word();
    const text2 = faker.lorem.word();
    const markdown = `H<sub>${text1}</sub>O and CO<sub>${text2}</sub>`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(markdown); // Should remain unchanged
  });

  test('should handle text without subscript tags', () => {
    const text = faker.lorem.sentence();
    const bbcodeResult = strategy.convert(text, 'bbcode');
    const worldanvilResult = strategy.convert(text, 'worldanvil');
    expect(bbcodeResult).toBe(text);
    expect(worldanvilResult).toBe(text);
  });

  test('should handle empty subscript tags for WorldAnvil', () => {
    const markdown = '<sub></sub>';
    const result = strategy.convert(markdown, 'worldanvil');
    expect(result).toBe('[sub][/sub]');
  });

  test('should handle empty subscript tags for standard BBCode', () => {
    const markdown = '<sub></sub>';
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(markdown); // Should remain unchanged
  });

  test('should handle subscript with special characters for WorldAnvil', () => {
    const text = '2';
    const markdown = `CO<sub>${text}</sub>`;
    const result = strategy.convert(markdown, 'worldanvil');
    expect(result).toBe(`CO[sub]${text}[/sub]`);
  });

  test('should handle nested content in subscript for WorldAnvil', () => {
    const text = faker.lorem.words(2);
    const markdown = `<sub>${text}</sub>`;
    const result = strategy.convert(markdown, 'worldanvil');
    expect(result).toBe(`[sub]${text}[/sub]`);
  });
});