import { faker } from '@faker-js/faker';
import { CodeConversionStrategy } from '../../src/strategies/worldanvil/code-strategy';

describe('WorldAnvil CodeConversionStrategy', () => {
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

  test('should convert code blocks with language for WorldAnvil', () => {
    const code = 'console.log("test");';
    const markdown = `\`\`\`javascript\n${code}\n\`\`\``;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[code:javascript]${code}[/code]`);
  });

  test('should convert code blocks without language for WorldAnvil', () => {
    const code = faker.lorem.words(3);
    const markdown = `\`\`\`\n${code}\n\`\`\``;
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

  test('should preserve language for WorldAnvil code blocks', () => {
    const languages = ['javascript', 'python', 'typescript', 'java', 'cpp'];
    const code = faker.lorem.words(2);
    
    languages.forEach(lang => {
      const markdown = `\`\`\`${lang}\n${code}\n\`\`\``;
      const result = strategy.convert(markdown);
      expect(result).toBe(`[code:${lang}]${code}[/code]`);
    });
  });

  test('should handle mixed inline and block code', () => {
    const inlineCode = faker.lorem.word();
    const blockCode = faker.lorem.words(2);
    const markdown = `Here is \`${inlineCode}\` and:\n\`\`\`python\n${blockCode}\n\`\`\``;
    const result = strategy.convert(markdown);
    expect(result).toBe(`Here is [code]${inlineCode}[/code] and:\n[code:python]${blockCode}[/code]`);
  });
});
