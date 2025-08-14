import { faker } from '@faker-js/faker';
import { ImageConversionStrategy } from '../../src/strategies/image-strategy';

describe('WorldAnvil ImageConversionStrategy', () => {
  const strategy = new ImageConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test('should convert images to WorldAnvil format', () => {
    const alt = faker.lorem.word();
    const url = faker.image.url();
    const markdown = `![${alt}](${url})`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[img:${alt}]${url}[/img]`);
  });

  test('should handle images without alt text', () => {
    const url = faker.image.url();
    const markdown = `![](${url})`;
    
    const result = strategy.convert(markdown);
    expect(result).toBe(`[img:]${url}[/img]`);
  });

  test('should handle multiple images', () => {
    const alt1 = faker.lorem.word();
    const url1 = faker.image.url();
    const alt2 = faker.lorem.word();
    const url2 = faker.image.url();
    
    const markdown = `![${alt1}](${url1}) ![${alt2}](${url2})`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[img:${alt1}]${url1}[/img] [img:${alt2}]${url2}[/img]`);
  });

  test('should preserve text that is not an image', () => {
    const text = faker.lorem.sentence();
    const result = strategy.convert(text);
    expect(result).toBe(text);
  });

  test('should handle complex URLs with parameters', () => {
    const alt = faker.lorem.word();
    const url = `${faker.image.url()}?width=300&height=200`;
    const markdown = `![${alt}](${url})`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[img:${alt}]${url}[/img]`);
  });

  test('should handle alt text with special characters', () => {
    const alt = `${faker.lorem.word()}-${faker.lorem.word()}_${faker.lorem.word()}`;
    const url = faker.image.url();
    const markdown = `![${alt}](${url})`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[img:${alt}]${url}[/img]`);
  });
});
