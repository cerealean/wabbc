import { faker } from '@faker-js/faker';
import { LineBreakConversionStrategy } from '../../src/strategies/worldanvil/line-break-strategy';

describe('WorldAnvil LineBreakConversionStrategy', () => {
  const strategy = new LineBreakConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test('should convert two spaces + newline to [br]', () => {
    const text = faker.lorem.words(3);
    const markdown = `${text}  \nNext line`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`${text}[br]Next line`);
  });

  test('should convert backslash + newline to [br]', () => {
    const text = faker.lorem.words(3);
    const markdown = `${text}\\\nNext line`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`${text}[br]Next line`);
  });

  test('should handle Windows-style line endings (CRLF)', () => {
    const text = faker.lorem.words(3);
    const markdown = `${text}  \r\nNext line`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`${text}[br]Next line`);
  });

  test('should handle backslash with Windows-style line endings', () => {
    const text = faker.lorem.words(3);
    const markdown = `${text}\\\r\nNext line`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`${text}[br]Next line`);
  });

  test('should handle multiple line breaks in one text', () => {
    const text1 = faker.lorem.words(2);
    const text2 = faker.lorem.words(2);
    const text3 = faker.lorem.words(2);
    const markdown = `${text1}  \n${text2}\\\n${text3}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`${text1}[br]${text2}[br]${text3}`);
  });

  test('should not convert single newlines without spaces or backslash', () => {
    const markdown = `Line one\nLine two`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`Line one\nLine two`);
  });

  test('should not convert double newlines (paragraph breaks)', () => {
    const text1 = faker.lorem.sentence();
    const text2 = faker.lorem.sentence();
    const markdown = `${text1}\n\n${text2}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`${text1}\n\n${text2}`);
  });

  test('should preserve text that has no line breaks', () => {
    const text = faker.lorem.sentence();
    const result = strategy.convert(text);
    expect(result).toBe(text);
  });

  test('should handle line breaks at beginning of text', () => {
    const text = faker.lorem.words(3);
    const markdown = `  \n${text}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[br]${text}`);
  });

  test('should handle line breaks at end of text', () => {
    const text = faker.lorem.words(3);
    const markdown = `${text}  \n`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`${text}[br]`);
  });
});
