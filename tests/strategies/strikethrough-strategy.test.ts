import { faker } from '@faker-js/faker';
import { StrikethroughConversionStrategy } from '../../src/strategies/strikethrough-strategy';

describe('StrikethroughConversionStrategy', () => {
  const strategy = new StrikethroughConversionStrategy();

  test('should have correct priority and name', () => {
    expect(strategy.priority).toBe(8);
    expect(strategy.name).toBe('StrikethroughConversion');
  });

  test('should convert strikethrough text', () => {
    const text = faker.lorem.words(2);
    const markdown = `~~${text}~~`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[s]${text}[/s]`);
  });

  test('should work the same for both formats', () => {
    const text = faker.lorem.words(2);
    const markdown = `~~${text}~~`;
    
    const bbcodeResult = strategy.convert(markdown, 'bbcode');
    const worldanvilResult = strategy.convert(markdown, 'worldanvil');
    expect(bbcodeResult).toBe(worldanvilResult);
  });

  test('should handle multiple strikethrough segments', () => {
    const text1 = faker.lorem.word();
    const text2 = faker.lorem.word();
    const markdown = `~~${text1}~~ and ~~${text2}~~`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[s]${text1}[/s] and [s]${text2}[/s]`);
  });

  test('should handle single character strikethrough', () => {
    const char = faker.string.alpha(1);
    const markdown = `~~${char}~~`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[s]${char}[/s]`);
  });

  test('should handle strikethrough with spaces', () => {
    const text = faker.lorem.words(3);
    const markdown = `~~${text}~~`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[s]${text}[/s]`);
  });
});
