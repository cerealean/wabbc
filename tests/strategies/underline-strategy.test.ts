import { faker } from '@faker-js/faker';
import { WorldAnvilUnderlineConversionStrategy } from '../../src/strategies/underline-strategy';

describe('WorldAnvilUnderlineConversionStrategy', () => {
  const strategy = new WorldAnvilUnderlineConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
    expect((strategy as any).runBefore).toBeUndefined();
  });

  test('should convert underline text for worldanvil format', () => {
    const text = faker.lorem.words(2);
    const html = `<ins>${text}</ins>`;
    const result = strategy.convert(html);
    expect(result).toBe(`[u]${text}[/u]`);
  });

  test('should convert underline text for bbcode format (strategy always converts)', () => {
    const text = faker.lorem.words(2);
    const html = `<ins>${text}</ins>`;
    const result = strategy.convert(html);
    expect(result).toBe(`[u]${text}[/u]`);
  });

  test('should convert underline text when no format specified', () => {
    const text = faker.lorem.words(2);
    const html = `<ins>${text}</ins>`;
    const result = strategy.convert(html);
    expect(result).toBe(`[u]${text}[/u]`);
  });

  test('should handle multiple underline segments for worldanvil', () => {
    const text1 = faker.lorem.word();
    const text2 = faker.lorem.word();
    const html = `<ins>${text1}</ins> and <ins>${text2}</ins>`;
    const result = strategy.convert(html);
    expect(result).toBe(`[u]${text1}[/u] and [u]${text2}[/u]`);
  });

  test('should handle multiple underline segments for bbcode (strategy always converts)', () => {
    const text1 = faker.lorem.word();
    const text2 = faker.lorem.word();
    const html = `<ins>${text1}</ins> and <ins>${text2}</ins>`;
    const result = strategy.convert(html);
    expect(result).toBe(`[u]${text1}[/u] and [u]${text2}[/u]`);
  });

  test('should handle single character underline for worldanvil', () => {
    const char = faker.string.alpha(1);
    const html = `<ins>${char}</ins>`;
    const result = strategy.convert(html);
    expect(result).toBe(`[u]${char}[/u]`);
  });

  test('should handle underline with spaces for worldanvil', () => {
    const text = faker.lorem.words(3);
    const html = `<ins>${text}</ins>`;
    const result = strategy.convert(html);
    expect(result).toBe(`[u]${text}[/u]`);
  });

  test('should handle empty underline tags for worldanvil', () => {
    const html = '<ins></ins>';
    const result = strategy.convert(html);
    expect(result).toBe('[u][/u]');
  });

  test('should handle underline with special characters for worldanvil', () => {
    const text = 'text with 123 & symbols!';
    const html = `<ins>${text}</ins>`;
    const result = strategy.convert(html);
    expect(result).toBe(`[u]${text}[/u]`);
  });

  test('should handle mixed content with underline for worldanvil', () => {
    const text = faker.lorem.words(2);
    const html = `Regular text <ins>${text}</ins> more text`;
    const result = strategy.convert(html);
    expect(result).toBe(`Regular text [u]${text}[/u] more text`);
  });

  test('should handle mixed content with underline for bbcode (strategy always converts)', () => {
    const text = faker.lorem.words(2);
    const html = `Regular text <ins>${text}</ins> more text`;
    const result = strategy.convert(html);
    expect(result).toBe(`Regular text [u]${text}[/u] more text`);
  });
});
