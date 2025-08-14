import { faker } from '@faker-js/faker';
import { WorldAnvilHorizontalRuleConversionStrategy } from '../../src/strategies/worldanvil/horizontal-rule-strategy';

describe('WorldAnvilHorizontalRuleConversionStrategy', () => {
  const strategy = new WorldAnvilHorizontalRuleConversionStrategy();

  test('should run before emphasis strategy', () => {
    expect((strategy as any).runBefore).toBeDefined();
    expect((strategy as any).runBefore).toHaveLength(1);
    expect((strategy as any).runAfter).toBeUndefined();
  });

  describe('WorldAnvil format', () => {
    test('should convert three dashes to [hr]', () => {
      const markdown = '---';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe('[hr]');
    });

    test('should convert three asterisks to [hr]', () => {
      const markdown = '***';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe('[hr]');
    });

    test('should convert more than three dashes to [hr]', () => {
      const markdown = '-----';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe('[hr]');
    });

    test('should convert more than three asterisks to [hr]', () => {
      const markdown = '*****';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe('[hr]');
    });

    test('should handle horizontal rules with leading whitespace', () => {
      const markdown = '   ---';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe('[hr]');
    });

    test('should handle horizontal rules with trailing whitespace', () => {
      const markdown = '---   ';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe('[hr]');
    });

    test('should handle horizontal rules with both leading and trailing whitespace', () => {
      const markdown = '  ***  ';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe('[hr]');
    });

    test('should convert multiple horizontal rules', () => {
      const markdown = '---\n\nSome text\n\n***';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe('[hr]\n\nSome text\n\n[hr]');
    });

    test('should only convert lines that contain only horizontal rule characters', () => {
      const text = faker.lorem.words(2);
      const markdown = `${text} ---`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(markdown); // Should remain unchanged
    });

    test('should not convert less than three characters', () => {
      const markdown = '--';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(markdown); // Should remain unchanged
    });

    test('should not convert mixed characters', () => {
      const markdown = '-*-';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(markdown); // Should remain unchanged
    });

    test('should handle complex markdown with horizontal rules', () => {
      const markdown = `# Header

Some paragraph text.

---

More text here.

***

Final paragraph.`;
      
      const expected = `# Header

Some paragraph text.

[hr]

More text here.

[hr]

Final paragraph.`;
      
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(expected);
    });
  });

  describe('Conversion behavior (format-agnostic)', () => {
    test('should convert three dashes regardless of format parameter', () => {
      const markdown = '---';
      const result = strategy.convert(markdown, 'bbcode'); // Even with bbcode format
      expect(result).toBe('[hr]');
    });

    test('should convert three asterisks regardless of format parameter', () => {
      const markdown = '***';
      const result = strategy.convert(markdown, 'bbcode'); // Even with bbcode format  
      expect(result).toBe('[hr]');
    });
  });

  describe('Edge cases', () => {
    test('should handle empty string', () => {
      const result = strategy.convert('', 'worldanvil');
      expect(result).toBe('');
    });

    test('should handle horizontal rule at start of text', () => {
      const text = faker.lorem.paragraph();
      const markdown = `---\n${text}`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(`[hr]\n${text}`);
    });

    test('should handle horizontal rule at end of text', () => {
      const text = faker.lorem.paragraph();
      const markdown = `${text}\n---`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(`${text}\n[hr]`);
    });

    test('should handle only horizontal rule', () => {
      const markdown = '---';
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe('[hr]');
    });
  });
});