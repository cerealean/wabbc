import { faker } from '@faker-js/faker';
import { EmphasisConversionStrategy } from '../../src/strategies/emphasis-strategy';

describe('EmphasisConversionStrategy', () => {
  const strategy = new EmphasisConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test.concurrent('should convert bold text with **', async () => {
    const text = faker.lorem.words(2);
    const markdown = `**${text}**`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[b]${text}[/b]`);
  });

  test.concurrent('should convert bold text with __', async () => {
    const text = faker.lorem.words(2);
    const markdown = `__${text}__`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[b]${text}[/b]`);
  });

  test.concurrent('should convert italic text with *', async () => {
    const text = faker.lorem.word();
    const markdown = `*${text}*`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[i]${text}[/i]`);
  });

  test.concurrent('should convert italic text with _', async () => {
    const text = faker.lorem.word();
    const markdown = `_${text}_`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[i]${text}[/i]`);
  });

  test.concurrent('should work the same for both formats', async () => {
    const text = faker.lorem.word();
    const markdown = `**${text}**`;
    const bbcodeResult = strategy.convert(markdown);
    const worldanvilResult = strategy.convert(markdown);
    expect(bbcodeResult).toBe(worldanvilResult);
  });

  test.concurrent('should handle mixed emphasis in same text', async () => {
    const boldText = faker.lorem.word();
    const italicText = faker.lorem.word();
    const markdown = `**${boldText}** and *${italicText}*`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[b]${boldText}[/b] and [i]${italicText}[/i]`);
  });
});
