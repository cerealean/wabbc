import { faker } from '@faker-js/faker';
import { LinkConversionStrategy } from '../../src/strategies/link-strategy';
import { ImageConversionStrategy } from '../../src/strategies/image-strategy';

describe('LinkConversionStrategy', () => {
  const strategy = new LinkConversionStrategy();

  test('should have correct dependencies', () => {
    expect(strategy.runAfter).toEqual([ImageConversionStrategy]);
  });

  test('should convert markdown links', () => {
    const linkText = faker.lorem.words(2);
    const url = faker.internet.url();
    const markdown = `[${linkText}](${url})`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[url=${url}]${linkText}[/url]`);
  });

  test('should convert auto-links', () => {
    const url = faker.internet.url();
    const markdown = `<${url}>`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[url]${url}[/url]`);
  });

  test('should work the same for both formats', () => {
    const linkText = faker.lorem.words(2);
    const url = faker.internet.url();
    const markdown = `[${linkText}](${url})`;
    
    const bbcodeResult = strategy.convert(markdown, 'bbcode');
    const worldanvilResult = strategy.convert(markdown, 'worldanvil');
    expect(bbcodeResult).toBe(worldanvilResult);
  });

  test('should handle multiple links', () => {
    const text1 = faker.lorem.word();
    const url1 = faker.internet.url();
    const text2 = faker.lorem.word();
    const url2 = faker.internet.url();
    
    const markdown = `[${text1}](${url1}) and [${text2}](${url2})`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[url=${url1}]${text1}[/url] and [url=${url2}]${text2}[/url]`);
  });

  test('should handle auto-links with different protocols', () => {
    const httpsUrl = faker.internet.url({ protocol: 'https' });
    const httpUrl = faker.internet.url({ protocol: 'http' });
    
    const markdown = `<${httpsUrl}> <${httpUrl}>`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[url]${httpsUrl}[/url] [url]${httpUrl}[/url]`);
  });
});
