import { CodeConversionStrategy } from "./strategies/code-strategy";
import type { ConversionStrategy } from "./strategies/conversion-strategy";
import { EmphasisConversionStrategy } from "./strategies/emphasis-strategy";
import { ImageConversionStrategy } from "./strategies/image-strategy";
import { LinkConversionStrategy } from "./strategies/link-strategy";
import { QuoteConversionStrategy } from "./strategies/quote-strategy";
import { StandardHeaderConversionStrategy } from "./strategies/standard/header-strategy";
import { StandardListConversionStrategy } from "./strategies/standard/list-strategy";
import { StrikethroughConversionStrategy } from "./strategies/strikethrough-strategy";
import { WorldAnvilHeaderConversionStrategy } from "./strategies/worldanvil/header-strategy";
import { WorldAnvilListConversionStrategy } from "./strategies/worldanvil/list-strategy";

/**
 * Factory for creating ordered strategy chains based on dependencies.
 * 
 * Strategies are automatically sorted using topological sort based on their
 * dependencies defined in the `runAfter` property. This ensures that dependent
 * strategies always run after their dependencies.
 * 
 * @example
 * To add a new strategy with dependencies:
 * ```typescript
 * export class MyStrategy implements ConversionStrategy {
 *   readonly name = 'MyStrategy';
 *   readonly runAfter = ['ImageConversion', 'LinkConversion'] as const;
 *   
 *   convert(text: string, format: 'bbcode' | 'worldanvil'): string {
 *     // Implementation
 *   }
 * }
 * ```
 */
export class StrategyChainFactory {
    private static readonly bbcodeStrategies: ReadonlyArray<ConversionStrategy> = 
        StrategyChainFactory.sortStrategiesByDependencies([
            new StandardHeaderConversionStrategy(),
            new EmphasisConversionStrategy(),
            new ImageConversionStrategy(),
            new LinkConversionStrategy(),
            new CodeConversionStrategy(),
            new StandardListConversionStrategy(),
            new QuoteConversionStrategy(),
            new StrikethroughConversionStrategy()
        ]);
        
    private static readonly worldanvilStrategies: ReadonlyArray<ConversionStrategy> = 
        StrategyChainFactory.sortStrategiesByDependencies([
            new WorldAnvilHeaderConversionStrategy(),
            new EmphasisConversionStrategy(),
            new ImageConversionStrategy(),
            new LinkConversionStrategy(),
            new CodeConversionStrategy(),
            new WorldAnvilListConversionStrategy(),
            new QuoteConversionStrategy(),
            new StrikethroughConversionStrategy()
        ]);

    /**
     * Sort strategies based on their dependencies using topological sort
     */
    private static sortStrategiesByDependencies(strategies: ConversionStrategy[]): ConversionStrategy[] {
        const strategyMap = new Map<string, ConversionStrategy>();
        const dependencyMap = new Map<string, string[]>();
        const visited = new Set<string>();
        const visiting = new Set<string>();
        const result: ConversionStrategy[] = [];

        // Build maps
        for (const strategy of strategies) {
            strategyMap.set(strategy.name, strategy);
            dependencyMap.set(strategy.name, strategy.runAfter ? [...strategy.runAfter] : []);
        }

        // Validate dependencies exist
        for (const [strategyName, dependencies] of dependencyMap) {
            for (const dep of dependencies) {
                if (!strategyMap.has(dep)) {
                    throw new Error(`Strategy '${strategyName}' depends on '${dep}', but '${dep}' is not in the strategy list`);
                }
            }
        }

        // Topological sort using DFS
        const visit = (strategyName: string): void => {
            if (visiting.has(strategyName)) {
                throw new Error(`Circular dependency detected involving strategy '${strategyName}'`);
            }
            if (visited.has(strategyName)) {
                return;
            }

            visiting.add(strategyName);
            
            const dependencies = dependencyMap.get(strategyName) || [];
            for (const dep of dependencies) {
                visit(dep);
            }
            
            visiting.delete(strategyName);
            visited.add(strategyName);
            
            const strategy = strategyMap.get(strategyName);
            if (strategy) {
                result.push(strategy);
            }
        };

        // Visit all strategies
        for (const strategyName of strategyMap.keys()) {
            visit(strategyName);
        }

        return result;
    }

    static getStrategies(format: 'bbcode' | 'worldanvil'): ReadonlyArray<ConversionStrategy> {
        switch (format) {
            case 'bbcode':
                return this.bbcodeStrategies;
            case 'worldanvil':
                return this.worldanvilStrategies;
        }
    }
}
