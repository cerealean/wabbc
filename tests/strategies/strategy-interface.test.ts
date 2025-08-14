import { ConversionStrategy } from '../../src/strategies/conversion-strategy';
import { EmphasisConversionStrategy } from '../../src/strategies/emphasis-strategy';
import { ImageConversionStrategy as StandardImageConversionStrategy } from '../../src/strategies/standard/image-strategy';
import { ImageConversionStrategy as WorldAnvilImageConversionStrategy } from '../../src/strategies/worldanvil/image-strategy';
import { LinkConversionStrategy } from '../../src/strategies/link-strategy';
import { CodeConversionStrategy } from '../../src/strategies/code-strategy';
import { StandardHeaderConversionStrategy } from '../../src/strategies/standard/header-strategy';
import { StandardListConversionStrategy } from '../../src/strategies/standard/list-strategy';
import { WorldAnvilHeaderConversionStrategy } from '../../src/strategies/worldanvil/header-strategy';
import { WorldAnvilListConversionStrategy } from '../../src/strategies/worldanvil/list-strategy';
import { WorldAnvilDiceConversionStrategy } from '../../src/strategies/worldanvil/dice-strategy';
import { QuoteConversionStrategy } from '../../src/strategies/quote-strategy';
import { StrikethroughConversionStrategy } from '../../src/strategies/strikethrough-strategy';

describe('Strategy Interface and Dependencies', () => {
  const strategies: ConversionStrategy[] = [
    new StandardHeaderConversionStrategy(),
    new WorldAnvilHeaderConversionStrategy(),
    new EmphasisConversionStrategy(),
    new StandardImageConversionStrategy(),
    new WorldAnvilImageConversionStrategy(),
    new LinkConversionStrategy(),
    new CodeConversionStrategy(),
    new StandardListConversionStrategy(),
    new WorldAnvilListConversionStrategy(),
    new QuoteConversionStrategy(),
    new StrikethroughConversionStrategy(),
    new WorldAnvilDiceConversionStrategy()
  ];

  test('should all implement ConversionStrategy interface', () => {
    strategies.forEach(strategy => {
      expect(strategy).toHaveProperty('convert');
      expect(typeof strategy.convert).toBe('function');
    });
  });

  test('should have valid dependencies', () => {
    const strategyConstructors = new Set(strategies.map(s => s.constructor));
    
    strategies.forEach(strategy => {
      // Test runAfter dependencies
      if ((strategy as any).runAfter) {
        const dependencies = (strategy as any).runAfter as (new () => ConversionStrategy)[];
        dependencies.forEach(dep => {
          expect(strategyConstructors.has(dep)).toBeTruthy(); 
        });
      }
      
      // Test runBefore dependencies
      if ((strategy as any).runBefore) {
        const dependencies = (strategy as any).runBefore as (new () => ConversionStrategy)[];
        dependencies.forEach(dep => {
          expect(strategyConstructors.has(dep)).toBeTruthy(); 
        });
      }
    });
  });

  test('should have expected strategy types', () => {
    const strategyTypes = strategies.map(s => s.constructor.name).sort();
    const expectedTypes = [
      'CodeConversionStrategy',
      'EmphasisConversionStrategy',
      'ImageConversionStrategy', // Standard version
      'ImageConversionStrategy', // WorldAnvil version  
      'LinkConversionStrategy',
      'QuoteConversionStrategy',
      'StandardHeaderConversionStrategy',
      'StandardListConversionStrategy',
      'StrikethroughConversionStrategy',
      'WorldAnvilDiceConversionStrategy',
      'WorldAnvilHeaderConversionStrategy',
      'WorldAnvilListConversionStrategy'
    ];
    expect(strategyTypes).toEqual(expectedTypes);
  });

  test('should have image strategies with runBefore LinkConversionStrategy', () => {
    const standardImageStrategy = strategies.find(s => s.constructor === StandardImageConversionStrategy);
    const worldAnvilImageStrategy = strategies.find(s => s.constructor === WorldAnvilImageConversionStrategy);
    
    expect(standardImageStrategy).toBeDefined();
    expect(worldAnvilImageStrategy).toBeDefined();
    
    expect((standardImageStrategy as any).runBefore).toContain(LinkConversionStrategy);
    expect((worldAnvilImageStrategy as any).runBefore).toContain(LinkConversionStrategy);
  });
});
