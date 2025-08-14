import { faker } from '@faker-js/faker';
import { SuperscriptConversionStrategy } from '../../src/strategies/superscript-strategy';

describe('SuperscriptConversionStrategy', () => {
  const strategy = new SuperscriptConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
    expect((strategy as any).runBefore).toBeUndefined();
  });

  describe('WorldAnvil format conversion', () => {
    test('should convert simple superscript tags', () => {
      const text = faker.lorem.word();
      const markdown = `Text with <sup>${text}</sup> superscript`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`Text with [sup]${text}[/sup] superscript`);
    });

    test('should convert multiple superscript tags', () => {
      const text1 = faker.lorem.word();
      const text2 = faker.lorem.word();
      const markdown = `First <sup>${text1}</sup> and second <sup>${text2}</sup>`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`First [sup]${text1}[/sup] and second [sup]${text2}[/sup]`);
    });

    test('should handle superscript with numbers', () => {
      const markdown = 'E = mc<sup>2</sup>';
      const result = strategy.convert(markdown);
      expect(result).toBe('E = mc[sup]2[/sup]');
    });

    test('should handle superscript with multiple characters', () => {
      const markdown = 'x<sup>2y+1</sup>';
      const result = strategy.convert(markdown);
      expect(result).toBe('x[sup]2y+1[/sup]');
    });

    test('should handle empty superscript tags', () => {
      const markdown = 'Text with <sup></sup> empty';
      const result = strategy.convert(markdown);
      expect(result).toBe('Text with [sup][/sup] empty');
    });

    test('should handle superscript with spaces', () => {
      const markdown = 'Text <sup>with spaces</sup> here';
      const result = strategy.convert(markdown);
      expect(result).toBe('Text [sup]with spaces[/sup] here');
    });

    test('should handle superscript at start of text', () => {
      const text = faker.lorem.word();
      const markdown = `<sup>${text}</sup> at start`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`[sup]${text}[/sup] at start`);
    });

    test('should handle superscript at end of text', () => {
      const text = faker.lorem.word();
      const markdown = `End with <sup>${text}</sup>`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`End with [sup]${text}[/sup]`);
    });

    test('should convert regardless of format parameter since this is WorldAnvil-specific strategy', () => {
      const text = faker.lorem.word();
      const markdown = `Text with <sup>${text}</sup> superscript`;
      
      // Strategy always converts since it's WorldAnvil-specific
      const resultWorldAnvil = strategy.convert(markdown);
      const resultBBCode = strategy.convert(markdown);
      const resultDefault = strategy.convert(markdown);
      
      const expected = `Text with [sup]${text}[/sup] superscript`;
      expect(resultWorldAnvil).toBe(expected);
      expect(resultBBCode).toBe(expected);
      expect(resultDefault).toBe(expected);
    });
  });

  describe('Edge cases', () => {
    test('should handle text without superscript tags', () => {
      const text = faker.lorem.sentence();
      expect(strategy.convert(text)).toBe(text);
      expect(strategy.convert(text)).toBe(text);
    });

    test('should handle malformed superscript tags', () => {
      const markdown = 'Text with <sup>unclosed tag';
      expect(strategy.convert(markdown)).toBe(markdown);
      expect(strategy.convert(markdown)).toBe(markdown);
    });

    test('should handle nested content in superscript', () => {
      const markdown = 'Text <sup>x<em>2</em></sup> here';
      const result = strategy.convert(markdown);
      expect(result).toBe('Text [sup]x<em>2</em>[/sup] here');
    });

    test('should be case sensitive', () => {
      const markdown = 'Text <SUP>test</SUP> and <Sup>test</Sup>';
      const result = strategy.convert(markdown);
      expect(result).toBe(markdown); // Should not convert uppercase variants
    });
  });
});
