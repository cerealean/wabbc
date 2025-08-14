import { faker } from '@faker-js/faker';
import { WorldAnvilSubscriptConversionStrategy } from '../../src/strategies/worldanvil/subscript-strategy';

describe('WorldAnvilSubscriptConversionStrategy', () => {
  const strategy = new WorldAnvilSubscriptConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test('should convert subscript for WorldAnvil format', () => {
    const text = faker.lorem.word();
    const markdown = `<sub>${text}</sub>`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[sub]${text}[/sub]`);
  });

  test('should handle multiple subscripts', () => {
    const text1 = faker.lorem.word();
    const text2 = faker.lorem.word();
    const markdown = `H<sub>${text1}</sub>O and CO<sub>${text2}</sub>`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`H[sub]${text1}[/sub]O and CO[sub]${text2}[/sub]`);
  });

  test('should handle text without subscript tags', () => {
    const text = faker.lorem.sentence();
    const result = strategy.convert(text);
    expect(result).toBe(text);
  });

  test('should handle empty subscript tags', () => {
    const markdown = '<sub></sub>';
    const result = strategy.convert(markdown);
    expect(result).toBe('[sub][/sub]');
  });

  test('should handle subscript with special characters', () => {
    const text = '2';
    const markdown = `CO<sub>${text}</sub>`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`CO[sub]${text}[/sub]`);
  });

  test('should handle nested content in subscript', () => {
    const text = faker.lorem.words(2);
    const markdown = `<sub>${text}</sub>`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[sub]${text}[/sub]`);
  });
});
