import { faker } from '@faker-js/faker';
import { ImageConversionStrategy } from '../../src/strategies/image-strategy';

describe('ImageConversionStrategy', () => {
  const strategy = new ImageConversionStrategy();

  test('should have correct name and no dependencies', () => {
    expect(strategy.name).toBe('ImageConversion');
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test('should convert images to traditional BBCode', () => {
    const alt = faker.lorem.word();
    const url = faker.image.url();
    const markdown = `![${alt}](${url})`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[img]${url}[/img]`);
  });

  test('should convert images to WorldAnvil format', () => {
    const alt = faker.lorem.word();
    const url = faker.image.url();
    const markdown = `![${alt}](${url})`;
    const result = strategy.convert(markdown, 'worldanvil');
    expect(result).toBe(`[img:${alt}]${url}[/img]`);
  });

  test('should handle images without alt text', () => {
    const url = faker.image.url();
    const markdown = `![](${url})`;
    
    const bbcodeResult = strategy.convert(markdown, 'bbcode');
    expect(bbcodeResult).toBe(`[img]${url}[/img]`);
    
    const worldanvilResult = strategy.convert(markdown, 'worldanvil');
    expect(worldanvilResult).toBe(`[img:]${url}[/img]`);
  });

  test('should handle multiple images', () => {
    const alt1 = faker.lorem.word();
    const url1 = faker.image.url();
    const alt2 = faker.lorem.word();
    const url2 = faker.image.url();
    
    const markdown = `![${alt1}](${url1}) ![${alt2}](${url2})`;
    const result = strategy.convert(markdown, 'worldanvil');
    expect(result).toBe(`[img:${alt1}]${url1}[/img] [img:${alt2}]${url2}[/img]`);
  });
});
