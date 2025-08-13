import { faker } from '@faker-js/faker';
import { QuoteConversionStrategy } from '../../src/strategies/quote-strategy';

describe('QuoteConversionStrategy', () => {
  const strategy = new QuoteConversionStrategy();

  test('should have correct priority and name', () => {
    expect(strategy.priority).toBe(7);
    expect(strategy.name).toBe('QuoteConversion');
  });

  test('should convert block quotes', () => {
    const quote = faker.lorem.sentence();
    const markdown = `> ${quote}`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[quote]${quote}[/quote]`);
  });

  test('should merge consecutive quotes', () => {
    const quote1 = faker.lorem.sentence();
    const quote2 = faker.lorem.sentence();
    const markdown = `> ${quote1}\n> ${quote2}`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[quote]${quote1}\n${quote2}[/quote]`);
  });

  test('should work the same for both formats', () => {
    const quote = faker.lorem.sentence();
    const markdown = `> ${quote}`;
    
    const bbcodeResult = strategy.convert(markdown, 'bbcode');
    const worldanvilResult = strategy.convert(markdown, 'worldanvil');
    expect(bbcodeResult).toBe(worldanvilResult);
  });

  test('should handle multiple separate quote blocks', () => {
    const quote1 = faker.lorem.sentence();
    const quote2 = faker.lorem.sentence();
    const markdown = `> ${quote1}\n\nSome text\n\n> ${quote2}`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[quote]${quote1}[/quote]\n\nSome text\n\n[quote]${quote2}[/quote]`);
  });

  test('should handle quotes with leading spaces', () => {
    const quote = faker.lorem.sentence();
    const markdown = `>    ${quote}`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[quote]${quote}[/quote]`);
  });

  test('should handle multiline quotes properly', () => {
    const line1 = faker.lorem.sentence();
    const line2 = faker.lorem.sentence();
    const line3 = faker.lorem.sentence();
    
    const markdown = `> ${line1}\n> ${line2}\n> ${line3}`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[quote]${line1}\n${line2}\n${line3}[/quote]`);
  });
});
