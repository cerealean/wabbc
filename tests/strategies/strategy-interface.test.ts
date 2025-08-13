import { ConversionStrategy } from '../../src/strategies/conversion-strategy';
import { HeaderConversionStrategy } from '../../src/strategies/header-strategy';
import { EmphasisConversionStrategy } from '../../src/strategies/emphasis-strategy';
import { ImageConversionStrategy } from '../../src/strategies/image-strategy';
import { LinkConversionStrategy } from '../../src/strategies/link-strategy';
import { CodeConversionStrategy } from '../../src/strategies/code-strategy';
import { ListConversionStrategy } from '../../src/strategies/list-strategy';
import { QuoteConversionStrategy } from '../../src/strategies/quote-strategy';
import { StrikethroughConversionStrategy } from '../../src/strategies/strikethrough-strategy';

describe('Strategy Interface and Priority', () => {
  const strategies: ConversionStrategy[] = [
    new HeaderConversionStrategy(),
    new EmphasisConversionStrategy(),
    new ImageConversionStrategy(),
    new LinkConversionStrategy(),
    new CodeConversionStrategy(),
    new ListConversionStrategy(),
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
    expect(priorities).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
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
      'HeaderConversion',
      'ImageConversion',
      'LinkConversion',
      'ListConversion',
      'QuoteConversion',
      'StrikethroughConversion'
    ];
    expect(strategyNames).toEqual(expectedNames);
  });
});
