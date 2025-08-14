import { faker } from '@faker-js/faker';
import { CodeConversionStrategy } from '../../../src/strategies/standard/code-strategy';

describe('Standard CodeConversionStrategy', () => {
  const strategy = new CodeConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test('should convert inline code', () => {
    const code = faker.lorem.word();
    const markdown = `\`${code}\``;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[code]${code}[/code]`);
  });

  test('should convert code blocks without language for traditional BBCode', () => {
    const code = faker.lorem.words(3);
    const markdown = `\`\`\`\n${code}\n\`\`\``;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[code]${code}[/code]`);
  });

  test('should convert code blocks with language but ignore language for traditional BBCode', () => {
    const code = 'console.log("test");';
    const markdown = `\`\`\`javascript\n${code}\n\`\`\``;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[code]${code}[/code]`);
  });

  test('should handle empty code blocks', () => {
    const markdown = '```\n\n```';
    const result = strategy.convert(markdown);
    expect(result).toBe('[code][/code]');
  });

  test('should handle multiple inline code segments', () => {
    const code1 = faker.lorem.word();
    const code2 = faker.lorem.word();
    const markdown = `\`${code1}\` and \`${code2}\``;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[code]${code1}[/code] and [code]${code2}[/code]`);
  });

  test('should handle multiple code blocks', () => {
    const code1 = faker.lorem.words(2);
    const code2 = faker.lorem.words(3);
    const markdown = `\`\`\`\n${code1}\n\`\`\`\n\nSome text\n\n\`\`\`\n${code2}\n\`\`\``;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[code]${code1}[/code]\n\nSome text\n\n[code]${code2}[/code]`);
  });

  test('should handle mixed inline and block code', () => {
    const inlineCode = faker.lorem.word();
    const blockCode = faker.lorem.words(2);
    const markdown = `Here is \`${inlineCode}\` and:\n\`\`\`\n${blockCode}\n\`\`\``;
    const result = strategy.convert(markdown);
    expect(result).toBe(`Here is [code]${inlineCode}[/code] and:\n[code]${blockCode}[/code]`);
  });
});
