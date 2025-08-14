import { faker } from '@faker-js/faker';
import { EmphasisConversionStrategy } from '../../src/strategies/emphasis-strategy';

describe('EmphasisConversionStrategy', () => {
  const strategy = new EmphasisConversionStrategy();

  test('should have correct priority and name', () => {
    expect(strategy.priority).toBe(3);
    expect(strategy.name).toBe('EmphasisConversion');
  });

  test('should convert bold text with **', () => {
    const text = faker.lorem.words(2);
    const markdown = `**${text}**`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[b]${text}[/b]`);
  });

  test('should convert bold text with __', () => {
    const text = faker.lorem.words(2);
    const markdown = `__${text}__`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[b]${text}[/b]`);
  });

  test('should convert italic text with *', () => {
    const text = faker.lorem.word();
    const markdown = `*${text}*`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[i]${text}[/i]`);
  });

  test('should convert italic text with _', () => {
    const text = faker.lorem.word();
    const markdown = `_${text}_`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[i]${text}[/i]`);
  });

  test('should work the same for both formats', () => {
    const text = faker.lorem.word();
    const markdown = `**${text}**`;
    const bbcodeResult = strategy.convert(markdown, 'bbcode');
    const worldanvilResult = strategy.convert(markdown, 'worldanvil');
    expect(bbcodeResult).toBe(worldanvilResult);
  });

  test('should handle mixed emphasis in same text', () => {
    const boldText = faker.lorem.word();
    const italicText = faker.lorem.word();
    const markdown = `**${boldText}** and *${italicText}*`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[b]${boldText}[/b] and [i]${italicText}[/i]`);
  });
});
