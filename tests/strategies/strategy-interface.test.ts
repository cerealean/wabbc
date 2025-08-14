import { ConversionStrategy } from '../../src/strategies/conversion-strategy';
import { EmphasisConversionStrategy } from '../../src/strategies/emphasis-strategy';
import { ImageConversionStrategy } from '../../src/strategies/image-strategy';
import { LinkConversionStrategy } from '../../src/strategies/link-strategy';
import { CodeConversionStrategy } from '../../src/strategies/code-strategy';
import { StandardHeaderConversionStrategy } from '../../src/strategies/standard/header-strategy';
import { StandardListConversionStrategy } from '../../src/strategies/standard/list-strategy';
import { WorldAnvilHeaderConversionStrategy } from '../../src/strategies/worldanvil/header-strategy';
import { WorldAnvilListConversionStrategy } from '../../src/strategies/worldanvil/list-strategy';
import { QuoteConversionStrategy } from '../../src/strategies/quote-strategy';
import { StrikethroughConversionStrategy } from '../../src/strategies/strikethrough-strategy';

describe('Strategy Interface and Priority', () => {
  const strategies: ConversionStrategy[] = [
    new StandardHeaderConversionStrategy(),
    new WorldAnvilHeaderConversionStrategy(),
    new EmphasisConversionStrategy(),
    new ImageConversionStrategy(),
    new LinkConversionStrategy(),
    new CodeConversionStrategy(),
    new StandardListConversionStrategy(),
    new WorldAnvilListConversionStrategy(),
    new QuoteConversionStrategy(),
    new StrikethroughConversionStrategy()
  ];

  test('should have unique priorities in correct order', () => {
    const priorities = strategies.map(s => s.priority);
    const sortedPriorities = [...priorities].sort((a, b) => a - b);
    expect(priorities).toEqual(sortedPriorities);

    // Ensure no duplicate priorities
    const uniquePriorities = [...new Set(priorities)];
    expect(uniquePriorities).toHaveLength(priorities.length);
  });

  test('should have descriptive names', () => {
    strategies.forEach(strategy => {
      expect(strategy.name).toBeTruthy();
      expect(typeof strategy.name).toBe('string');
      expect(strategy.name.length).toBeGreaterThan(0);
      expect(strategy.name).toMatch(/Conversion$/);
    });
  });

  test('should have sequential priorities starting from 1', () => {
    const priorities = strategies.map(s => s.priority).sort((a, b) => a - b);
    expect(priorities).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('should all implement ConversionStrategy interface', () => {
    strategies.forEach(strategy => {
      expect(strategy).toHaveProperty('convert');
      expect(strategy).toHaveProperty('priority');
      expect(strategy).toHaveProperty('name');
      expect(typeof strategy.convert).toBe('function');
      expect(typeof strategy.priority).toBe('number');
      expect(typeof strategy.name).toBe('string');
    });
  });

  test('should have expected strategy names', () => {
    const strategyNames = strategies.map(s => s.name).sort();
    const expectedNames = [
      'CodeConversion',
      'EmphasisConversion',
      'ImageConversion',
      'LinkConversion',
      'QuoteConversion',
      'StandardHeaderConversion',
      'StandardListConversion',
      'StrikethroughConversion',
      'WorldAnvilHeaderConversion',
      'WorldAnvilListConversion'
    ];
    expect(strategyNames).toEqual(expectedNames);
  });
});
