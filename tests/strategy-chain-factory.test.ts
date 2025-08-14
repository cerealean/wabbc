import { StrategyChainFactory } from '../src/strategy-chain-factory';
import { ConversionStrategy } from '../src/strategies/conversion-strategy';
import { LinkConversionStrategy } from '../src/strategies/link-strategy';
import { ImageConversionStrategy as StandardImageConversionStrategy } from '../src/strategies/standard/image-strategy';
import { ImageConversionStrategy as WorldAnvilImageConversionStrategy } from '../src/strategies/worldanvil/image-strategy';

describe('StrategyChainFactory', () => {
  describe('getStrategies', () => {
    test('should return bbcode strategies for bbcode format', () => {
      const strategies = StrategyChainFactory.getStrategies('bbcode');
      expect(strategies).toBeDefined();
      expect(strategies.length).toBeGreaterThan(0);
      
      // Should include image and link strategies
      const hasStandardImage = strategies.some(s => s instanceof StandardImageConversionStrategy);
      const hasLink = strategies.some(s => s instanceof LinkConversionStrategy);
      expect(hasStandardImage).toBe(true);
      expect(hasLink).toBe(true);
    });

    test('should return worldanvil strategies for worldanvil format', () => {
      const strategies = StrategyChainFactory.getStrategies('worldanvil');
      expect(strategies).toBeDefined();
      expect(strategies.length).toBeGreaterThan(0);
      
      // Should include image and link strategies
      const hasWorldAnvilImage = strategies.some(s => s instanceof WorldAnvilImageConversionStrategy);
      const hasLink = strategies.some(s => s instanceof LinkConversionStrategy);
      expect(hasWorldAnvilImage).toBe(true);
      expect(hasLink).toBe(true);
    });
  });

  describe('strategy ordering', () => {
    test('should order image strategies before link strategy in bbcode format', () => {
      const strategies = StrategyChainFactory.getStrategies('bbcode');
      
      const imageIndex = strategies.findIndex(s => s instanceof StandardImageConversionStrategy);
      const linkIndex = strategies.findIndex(s => s instanceof LinkConversionStrategy);
      
      expect(imageIndex).toBeGreaterThanOrEqual(0);
      expect(linkIndex).toBeGreaterThanOrEqual(0);
      expect(imageIndex).toBeLessThan(linkIndex);
    });

    test('should order image strategies before link strategy in worldanvil format', () => {
      const strategies = StrategyChainFactory.getStrategies('worldanvil');
      
      const imageIndex = strategies.findIndex(s => s instanceof WorldAnvilImageConversionStrategy);
      const linkIndex = strategies.findIndex(s => s instanceof LinkConversionStrategy);
      
      expect(imageIndex).toBeGreaterThanOrEqual(0);
      expect(linkIndex).toBeGreaterThanOrEqual(0);
      expect(imageIndex).toBeLessThan(linkIndex);
    });
  });

  describe('dependency validation', () => {
    // Create mock strategies for testing
    class MockStrategyA implements ConversionStrategy {
      convert(text: string): string { return text; }
    }

    class MockStrategyB implements ConversionStrategy {
      readonly runAfter = [MockStrategyA] as const;
      convert(text: string): string { return text; }
    }

    class MockStrategyC implements ConversionStrategy {
      readonly runBefore = [MockStrategyB] as const;
      convert(text: string): string { return text; }
    }

    class MockStrategyD implements ConversionStrategy {
      readonly runAfter = [MockStrategyC] as const;
      readonly runBefore = [MockStrategyB] as const;
      convert(text: string): string { return text; }
    }

    class MockStrategyWithInvalidDep implements ConversionStrategy {
      readonly runAfter = [class NonExistent {} as any] as const;
      convert(text: string): string { return text; }
    }

    class MockStrategyWithCircularDep implements ConversionStrategy {
      readonly runAfter = [MockStrategyWithCircularDep] as const;
      convert(text: string): string { return text; }
    }

    test('should handle runBefore dependencies correctly', () => {
      // Use reflection to access private method
      const sortMethod = (StrategyChainFactory as any).sortStrategiesByDependencies;
      
      const strategies = [
        new MockStrategyA(),
        new MockStrategyB(),
        new MockStrategyC()
      ];

      const sorted = sortMethod(strategies);
      
      const indexA = sorted.findIndex((s: any) => s instanceof MockStrategyA);
      const indexB = sorted.findIndex((s: any) => s instanceof MockStrategyB);
      const indexC = sorted.findIndex((s: any) => s instanceof MockStrategyC);

      // C should run before B (due to runBefore), B should run after A (due to runAfter)
      // So order should be: C, A, B
      expect(indexC).toBeLessThan(indexB);
      expect(indexA).toBeLessThan(indexB);
    });

    test('should handle combined runAfter and runBefore dependencies', () => {
      const sortMethod = (StrategyChainFactory as any).sortStrategiesByDependencies;
      
      const strategies = [
        new MockStrategyA(),
        new MockStrategyB(),
        new MockStrategyC(),
        new MockStrategyD()
      ];

      const sorted = sortMethod(strategies);
      
      const indexA = sorted.findIndex((s: any) => s instanceof MockStrategyA);
      const indexB = sorted.findIndex((s: any) => s instanceof MockStrategyB);
      const indexC = sorted.findIndex((s: any) => s instanceof MockStrategyC);
      const indexD = sorted.findIndex((s: any) => s instanceof MockStrategyD);

      // Expected order: C, A, D, B
      // C runs before B, D runs after C and before B, B runs after A
      expect(indexC).toBeLessThan(indexB);
      expect(indexA).toBeLessThan(indexB);
      expect(indexD).toBeLessThan(indexB);
      expect(indexC).toBeLessThan(indexD);
    });

    test('should throw error for missing dependencies', () => {
      const sortMethod = (StrategyChainFactory as any).sortStrategiesByDependencies;
      
      const strategies = [new MockStrategyWithInvalidDep()];

      expect(() => sortMethod(strategies)).toThrow(
        /Strategy 'MockStrategyWithInvalidDep' depends on 'NonExistent', but 'NonExistent' is not in the strategy list/
      );
    });

    test('should throw error for circular dependencies', () => {
      const sortMethod = (StrategyChainFactory as any).sortStrategiesByDependencies;
      
      const strategies = [new MockStrategyWithCircularDep()];

      expect(() => sortMethod(strategies)).toThrow(
        /Circular dependency detected involving strategy 'MockStrategyWithCircularDep'/
      );
    });
  });
});
