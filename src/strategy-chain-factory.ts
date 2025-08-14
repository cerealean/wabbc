import { CodeConversionStrategy } from "./strategies/code-strategy";
import type { ConversionStrategy } from "./strategies/conversion-strategy";
import { EmphasisConversionStrategy } from "./strategies/emphasis-strategy";
import { LinkConversionStrategy } from "./strategies/link-strategy";
import { QuoteConversionStrategy } from "./strategies/quote-strategy";
import { StandardChecklistConversionStrategy } from "./strategies/standard/checklist-strategy";
import { StandardHeaderConversionStrategy } from "./strategies/standard/header-strategy";
import { ImageConversionStrategy as StandardImageConversionStrategy } from "./strategies/standard/image-strategy";
import { StandardListConversionStrategy } from "./strategies/standard/list-strategy";
import { StrikethroughConversionStrategy } from "./strategies/strikethrough-strategy";
import { WorldAnvilDiceConversionStrategy } from "./strategies/worldanvil/dice-strategy";
import { WorldAnvilChecklistConversionStrategy } from "./strategies/worldanvil/checklist-strategy";
import { TableConversionStrategy } from "./strategies/table-strategy";
import { WorldAnvilHeaderConversionStrategy } from "./strategies/worldanvil/header-strategy";
import { ImageConversionStrategy as WorldAnvilImageConversionStrategy } from "./strategies/worldanvil/image-strategy";
import { WorldAnvilListConversionStrategy } from "./strategies/worldanvil/list-strategy";
import { SuperscriptConversionStrategy } from "./strategies/worldanvil/superscript-strategy";
import { WorldAnvilSubscriptConversionStrategy } from "./strategies/worldanvil/subscript-strategy";
import { WorldAnvilUnderlineConversionStrategy } from "./strategies/worldanvil/underline-strategy";

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
 *   readonly runAfter = [ImageConversionStrategy, LinkConversionStrategy] as const;
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
            new StandardImageConversionStrategy(),
            new LinkConversionStrategy(),
            new CodeConversionStrategy(),
            new StandardChecklistConversionStrategy(),
            new StandardListConversionStrategy(),
            new TableConversionStrategy(),
            new QuoteConversionStrategy(),
            new StrikethroughConversionStrategy()
        ]);

    private static readonly worldanvilStrategies: ReadonlyArray<ConversionStrategy> =
        StrategyChainFactory.sortStrategiesByDependencies([
            new WorldAnvilHeaderConversionStrategy(),
            new EmphasisConversionStrategy(),
            new WorldAnvilImageConversionStrategy(),
            new LinkConversionStrategy(),
            new CodeConversionStrategy(),
            new WorldAnvilChecklistConversionStrategy(),
            new WorldAnvilListConversionStrategy(),
            new TableConversionStrategy(),
            new QuoteConversionStrategy(),
            new StrikethroughConversionStrategy(),
            new SuperscriptConversionStrategy(),
            new WorldAnvilSubscriptConversionStrategy(),
            new WorldAnvilDiceConversionStrategy(),
            new WorldAnvilUnderlineConversionStrategy()
        ]);

    /**
     * Sort strategies based on their dependencies using topological sort
     */
    private static sortStrategiesByDependencies(strategies: ConversionStrategy[]): ConversionStrategy[] {
        const strategyMap = new Map<Function, ConversionStrategy>();
        const dependencyMap = new Map<Function, Function[]>();
        const visited = new Set<Function>();
        const visiting = new Set<Function>();
        const result: ConversionStrategy[] = [];

        // Build maps
        for (const strategy of strategies) {
            const constructor = strategy.constructor;
            strategyMap.set(constructor, strategy);
            const dependencies = strategy.runAfter ? [...strategy.runAfter] : [];
            dependencyMap.set(constructor, dependencies);
        }

        // Process runBefore dependencies by adding reverse dependencies
        for (const strategy of strategies) {
            if (strategy.runBefore) {
                for (const beforeStrategy of strategy.runBefore) {
                    const existingDeps = dependencyMap.get(beforeStrategy) || [];
                    dependencyMap.set(beforeStrategy, [...existingDeps, strategy.constructor]);
                }
            }
        }

        // Validate dependencies exist
        for (const [strategyConstructor, dependencies] of dependencyMap) {
            for (const dep of dependencies) {
                if (!strategyMap.has(dep)) {
                    throw new Error(`Strategy '${strategyConstructor.name}' depends on '${dep.name}', but '${dep.name}' is not in the strategy list`);
                }
            }
        }

        // Topological sort using DFS
        const visit = (strategyConstructor: Function): void => {
            if (visiting.has(strategyConstructor)) {
                throw new Error(`Circular dependency detected involving strategy '${strategyConstructor.name}'`);
            }
            if (visited.has(strategyConstructor)) {
                return;
            }

            visiting.add(strategyConstructor);

            const dependencies = dependencyMap.get(strategyConstructor) || [];
            for (const dep of dependencies) {
                visit(dep);
            }

            visiting.delete(strategyConstructor);
            visited.add(strategyConstructor);

            const strategy = strategyMap.get(strategyConstructor);
            if (strategy) {
                result.push(strategy);
            }
        };

        // Visit all strategies
        for (const strategyConstructor of strategyMap.keys()) {
            visit(strategyConstructor);
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
