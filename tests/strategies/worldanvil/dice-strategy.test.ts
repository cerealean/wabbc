import { faker } from '@faker-js/faker';
import { WorldAnvilDiceConversionStrategy } from '../../../src/strategies/worldanvil/dice-strategy';

describe('WorldAnvilDiceConversionStrategy', () => {
  const strategy = new WorldAnvilDiceConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
    expect((strategy as any).runBefore).toBeUndefined();
  });

  describe('WorldAnvil format conversion', () => {
    test('should convert basic dice notation', () => {
      expect(strategy.convert('3d6', 'worldanvil')).toBe('[dice]3d6[/dice]');
      expect(strategy.convert('1d20', 'worldanvil')).toBe('[dice]1d20[/dice]');
      expect(strategy.convert('100d8', 'worldanvil')).toBe('[dice]100d8[/dice]');
      expect(strategy.convert('1d100', 'worldanvil')).toBe('[dice]1d100[/dice]');
      expect(strategy.convert('10d6', 'worldanvil')).toBe('[dice]10d6[/dice]');
      expect(strategy.convert('2d4', 'worldanvil')).toBe('[dice]2d4[/dice]');
    });

    test('should convert dice notation with positive modifiers', () => {
      expect(strategy.convert('3d6+3', 'worldanvil')).toBe('[dice]3d6+3[/dice]');
      expect(strategy.convert('2d4+2', 'worldanvil')).toBe('[dice]2d4+2[/dice]');
      expect(strategy.convert('1d20+5', 'worldanvil')).toBe('[dice]1d20+5[/dice]');
      expect(strategy.convert('1d8+10', 'worldanvil')).toBe('[dice]1d8+10[/dice]');
    });

    test('should convert dice notation with negative modifiers', () => {
      expect(strategy.convert('1d20-1', 'worldanvil')).toBe('[dice]1d20-1[/dice]');
      expect(strategy.convert('3d6-2', 'worldanvil')).toBe('[dice]3d6-2[/dice]');
      expect(strategy.convert('2d4-1', 'worldanvil')).toBe('[dice]2d4-1[/dice]');
    });

    test('should convert multiple dice notations in same text', () => {
      const text = 'Roll 3d6 for stats and 1d20+5 for attack';
      const expected = 'Roll [dice]3d6[/dice] for stats and [dice]1d20+5[/dice] for attack';
      expect(strategy.convert(text, 'worldanvil')).toBe(expected);
    });

    test('should handle dice notation in complex sentences', () => {
      const character = faker.person.firstName();
      const text = `${character} rolls 2d4+2 damage and makes a 1d20+3 saving throw.`;
      const expected = `${character} rolls [dice]2d4+2[/dice] damage and makes a [dice]1d20+3[/dice] saving throw.`;
      expect(strategy.convert(text, 'worldanvil')).toBe(expected);
    });

    test('should handle dice notation at word boundaries only', () => {
      // Should NOT convert when dice notation is part of a larger word/identifier
      expect(strategy.convert('variable3d6name', 'worldanvil')).toBe('variable3d6name');
      expect(strategy.convert('test1d20suffix', 'worldanvil')).toBe('test1d20suffix');
      
      // Should convert when at word boundaries
      expect(strategy.convert('Roll: 3d6', 'worldanvil')).toBe('Roll: [dice]3d6[/dice]');
      expect(strategy.convert('(1d20)', 'worldanvil')).toBe('([dice]1d20[/dice])');
      expect(strategy.convert('Roll 2d4.', 'worldanvil')).toBe('Roll [dice]2d4[/dice].');
    });

    test('should handle edge cases with large numbers', () => {
      expect(strategy.convert('999d999+999', 'worldanvil')).toBe('[dice]999d999+999[/dice]');
      expect(strategy.convert('1d1000', 'worldanvil')).toBe('[dice]1d1000[/dice]');
    });

    test('should preserve other text unchanged', () => {
      const randomText = faker.lorem.sentence();
      expect(strategy.convert(randomText, 'worldanvil')).toBe(randomText);
      
      const textWithoutDice = 'This has no dice notation at all.';
      expect(strategy.convert(textWithoutDice, 'worldanvil')).toBe(textWithoutDice);
    });

    test('should handle mixed content with dice and other markdown', () => {
      const text = '**Bold text** with 2d6 damage and *italic* 1d20+3 roll.';
      const expected = '**Bold text** with [dice]2d6[/dice] damage and *italic* [dice]1d20+3[/dice] roll.';
      expect(strategy.convert(text, 'worldanvil')).toBe(expected);
    });
  });

  describe('Standard BBCode format (no conversion)', () => {
    test('should not convert dice notation for standard BBCode format', () => {
      expect(strategy.convert('3d6', 'bbcode')).toBe('3d6');
      expect(strategy.convert('1d20+5', 'bbcode')).toBe('1d20+5');
      expect(strategy.convert('Roll 2d4 damage', 'bbcode')).toBe('Roll 2d4 damage');
      expect(strategy.convert('3d6+3 and 1d20-1', 'bbcode')).toBe('3d6+3 and 1d20-1');
    });

    test('should preserve all text unchanged for BBCode format', () => {
      const textWithDice = faker.lorem.sentence() + ' 3d6+2 ' + faker.lorem.sentence();
      expect(strategy.convert(textWithDice, 'bbcode')).toBe(textWithDice);
    });
  });

  describe('Invalid dice patterns should not be converted', () => {
    test('should not convert invalid dice patterns', () => {
      // Missing 'd'
      expect(strategy.convert('36', 'worldanvil')).toBe('36');
      expect(strategy.convert('3 6', 'worldanvil')).toBe('3 6');
      
      // Invalid format
      expect(strategy.convert('d6', 'worldanvil')).toBe('d6');
      expect(strategy.convert('3d', 'worldanvil')).toBe('3d');
      expect(strategy.convert('d', 'worldanvil')).toBe('d');
      
      // Letters instead of numbers
      expect(strategy.convert('adbc', 'worldanvil')).toBe('adbc');
      expect(strategy.convert('3da', 'worldanvil')).toBe('3da');
      expect(strategy.convert('ad6', 'worldanvil')).toBe('ad6');
    });
  });
});