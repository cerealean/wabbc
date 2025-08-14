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
      expect(strategy.convert('3d6')).toBe('[roll:3d6]');
      expect(strategy.convert('1d20')).toBe('[roll:1d20]');
      expect(strategy.convert('100d8')).toBe('[roll:100d8]');
      expect(strategy.convert('1d100')).toBe('[roll:1d100]');
      expect(strategy.convert('10d6')).toBe('[roll:10d6]');
      expect(strategy.convert('2d4')).toBe('[roll:2d4]');
    });

    test('should convert dice notation with positive modifiers', () => {
      expect(strategy.convert('3d6+3')).toBe('[roll:3d6+3]');
      expect(strategy.convert('2d4+2')).toBe('[roll:2d4+2]');
      expect(strategy.convert('1d20+5')).toBe('[roll:1d20+5]');
      expect(strategy.convert('1d8+10')).toBe('[roll:1d8+10]');
    });

    test('should convert dice notation with negative modifiers', () => {
      expect(strategy.convert('1d20-1')).toBe('[roll:1d20-1]');
      expect(strategy.convert('3d6-2')).toBe('[roll:3d6-2]');
      expect(strategy.convert('2d4-1')).toBe('[roll:2d4-1]');
    });

    test('should convert multiple dice notations in same text', () => {
      const text = 'Roll 3d6 for stats and 1d20+5 for attack';
      const expected = 'Roll [roll:3d6] for stats and [roll:1d20+5] for attack';
      expect(strategy.convert(text)).toBe(expected);
    });

    test('should handle dice notation in complex sentences', () => {
      const character = faker.person.firstName();
      const text = `${character} rolls 2d4+2 damage and makes a 1d20+3 saving throw.`;
      const expected = `${character} rolls [roll:2d4+2] damage and makes a [roll:1d20+3] saving throw.`;
      expect(strategy.convert(text)).toBe(expected);
    });

    test('should handle dice notation at word boundaries only', () => {
      // Should NOT convert when dice notation is part of a larger word/identifier
      expect(strategy.convert('variable3d6name')).toBe('variable3d6name');
      expect(strategy.convert('test1d20suffix')).toBe('test1d20suffix');
      
      // Should convert when at word boundaries
      expect(strategy.convert('Roll: 3d6')).toBe('Roll: [roll:3d6]');
      expect(strategy.convert('(1d20)')).toBe('([roll:1d20])');
      expect(strategy.convert('Roll 2d4.')).toBe('Roll [roll:2d4].');
    });

    test('should handle edge cases with large numbers', () => {
      expect(strategy.convert('999d999+999')).toBe('[roll:999d999+999]');
      expect(strategy.convert('1d1000')).toBe('[roll:1d1000]');
    });

    test('should preserve other text unchanged', () => {
      const randomText = faker.lorem.sentence();
      expect(strategy.convert(randomText)).toBe(randomText);
      
      const textWithoutDice = 'This has no dice notation at all.';
      expect(strategy.convert(textWithoutDice)).toBe(textWithoutDice);
    });

    test('should handle mixed content with dice and other markdown', () => {
      const text = '**Bold text** with 2d6 damage and *italic* 1d20+3 roll.';
      const expected = '**Bold text** with [roll:2d6] damage and *italic* [roll:1d20+3] roll.';
      expect(strategy.convert(text)).toBe(expected);
    });
  });

  describe('Invalid dice patterns should not be converted', () => {
    test('should not convert invalid dice patterns', () => {
      // Missing 'd'
      expect(strategy.convert('36')).toBe('36');
      expect(strategy.convert('3 6')).toBe('3 6');
      
      // Invalid format
      expect(strategy.convert('d6')).toBe('d6');
      expect(strategy.convert('3d')).toBe('3d');
      expect(strategy.convert('d')).toBe('d');
      
      // Letters instead of numbers
      expect(strategy.convert('adbc')).toBe('adbc');
      expect(strategy.convert('3da')).toBe('3da');
      expect(strategy.convert('ad6')).toBe('ad6');
    });
  });
});
