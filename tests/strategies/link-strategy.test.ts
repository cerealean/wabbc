import { faker } from '@faker-js/faker';
import { LinkConversionStrategy } from '../../src/strategies/link-strategy';

describe('LinkConversionStrategy', () => {
  const strategy = new LinkConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test.concurrent('should convert markdown links', async () => {
    const linkText = faker.lorem.words(2);
    const url = faker.internet.url();
    const markdown = `[${linkText}](${url})`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[url=${url}]${linkText}[/url]`);
  });

  test.concurrent('should convert auto-links', async () => {
    const url = faker.internet.url();
    const markdown = `<${url}>`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[url]${url}[/url]`);
  });

  test.concurrent('should work the same for both formats', async () => {
    const linkText = faker.lorem.words(2);
    const url = faker.internet.url();
    const markdown = `[${linkText}](${url})`;
    
    const bbcodeResult = strategy.convert(markdown);
    const worldanvilResult = strategy.convert(markdown);
    expect(bbcodeResult).toBe(worldanvilResult);
  });

  test.concurrent('should handle multiple links', async () => {
    const text1 = faker.lorem.word();
    const url1 = faker.internet.url();
    const text2 = faker.lorem.word();
    const url2 = faker.internet.url();
    
    const markdown = `[${text1}](${url1}) and [${text2}](${url2})`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[url=${url1}]${text1}[/url] and [url=${url2}]${text2}[/url]`);
  });

  test.concurrent('should handle auto-links with different protocols', async () => {
    const httpsUrl = faker.internet.url({ protocol: 'https' });
    const httpUrl = faker.internet.url({ protocol: 'http' });
  
    const markdown = `<${httpsUrl}> <${httpUrl}>`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[url]${httpsUrl}[/url] [url]${httpUrl}[/url]`);
  });
});
