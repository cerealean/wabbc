import { faker } from '@faker-js/faker';
import { StandardHorizontalRuleConversionStrategy } from '../../src/strategies/standard/horizontal-rule-strategy';

describe('StandardHorizontalRuleConversionStrategy', () => {
  const strategy = new StandardHorizontalRuleConversionStrategy();

  test('should run before emphasis strategy', () => {
    expect((strategy as any).runBefore).toBeDefined();
    expect((strategy as any).runBefore).toHaveLength(1);
    expect((strategy as any).runAfter).toBeUndefined();
  });

  describe('Standard BBCode format', () => {
    test('should leave three dashes unchanged', () => {
      const markdown = '---';
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(markdown);
    });

    test('should leave three asterisks unchanged', () => {
      const markdown = '***';
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(markdown);
    });

    test('should leave longer horizontal rules unchanged', () => {
      const markdown = '-----';
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(markdown);
    });

    test('should leave horizontal rules with whitespace unchanged', () => {
      const markdown = '  ***  ';
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(markdown);
    });

    test('should leave complex markdown with horizontal rules unchanged', () => {
      const markdown = `# Header

Some text.

---

More text.

***

Final text.`;
      
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(markdown);
    });
  });

  describe('Conversion behavior (format-agnostic)', () => {
    test('should leave horizontal rules unchanged regardless of format parameter', () => {
      const markdown = '---';
      const result = strategy.convert(markdown, 'worldanvil'); // Even with worldanvil format
      expect(result).toBe(markdown);
    });

    test('should leave asterisk horizontal rules unchanged regardless of format parameter', () => {
      const markdown = '***';
      const result = strategy.convert(markdown, 'worldanvil'); // Even with worldanvil format  
      expect(result).toBe(markdown);
    });
  });

  describe('Edge cases', () => {
    test('should handle empty string', () => {
      const result = strategy.convert('', 'bbcode');
      expect(result).toBe('');
    });

    test('should handle horizontal rule at start of text', () => {
      const text = faker.lorem.paragraph();
      const markdown = `---\n${text}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(markdown);
    });

    test('should handle horizontal rule at end of text', () => {
      const text = faker.lorem.paragraph();
      const markdown = `${text}\n---`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(markdown);
    });

    test('should handle only horizontal rule', () => {
      const markdown = '---';
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(markdown);
    });
  });
});