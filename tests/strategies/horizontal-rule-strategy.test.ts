import { faker } from '@faker-js/faker';
import { WorldAnvilHorizontalRuleConversionStrategy } from '../../src/strategies/horizontal-rule-strategy';

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
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should convert three asterisks to [hr]', () => {
      const markdown = '***';
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should convert more than three dashes to [hr]', () => {
      const markdown = '-----';
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should convert more than three asterisks to [hr]', () => {
      const markdown = '*****';
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should handle dashes with leading whitespace', () => {
      const markdown = '   ---';
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should handle dashes with trailing whitespace', () => {
      const markdown = '---   ';
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should handle dashes with both leading and trailing whitespace', () => {
      const markdown = '   ---   ';
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should handle asterisks with leading whitespace', () => {
      const markdown = '   ***';
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should handle asterisks with trailing whitespace', () => {
      const markdown = '***   ';
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should handle asterisks with both leading and trailing whitespace', () => {
      const markdown = '   ***   ';
      const result = strategy.convert(markdown);
      expect(result).toBe('[hr]');
    });

    test('should convert multiline with horizontal rules', () => {
      const line1 = faker.lorem.sentence();
      const line2 = faker.lorem.sentence();
      const markdown = `${line1}\n---\n${line2}`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`${line1}\n[hr]\n${line2}`);
    });

    test('should not convert dashes within text', () => {
      const markdown = 'This is a dash-separated-word';
      const result = strategy.convert(markdown);
      expect(result).toBe(markdown);
    });

    test('should not convert asterisks within text', () => {
      const markdown = 'This has *emphasis* text';
      const result = strategy.convert(markdown);
      expect(result).toBe(markdown);
    });

    test('should handle empty input', () => {
      const result = strategy.convert('');
      expect(result).toBe('');
    });

    test('should not convert insufficient dashes', () => {
      const markdown = '--';
      const result = strategy.convert(markdown);
      expect(result).toBe(markdown);
    });

    test('should not convert insufficient asterisks', () => {
      const markdown = '**';
      const result = strategy.convert(markdown);
      expect(result).toBe(markdown);
    });

    test('should preserve other content unchanged', () => {
      const markdown = `${faker.lorem.paragraph()}\n\nSome other content here.`;
      const result = strategy.convert(markdown);
      expect(result).toBe(markdown);
    });
  });
});