import { CodeConversionStrategy } from "./strategies/code-strategy";
import type { ConversionStrategy } from "./strategies/conversion-strategy";
import { EmphasisConversionStrategy } from "./strategies/emphasis-strategy";
import { HeaderConversionStrategy } from "./strategies/header-strategy";
import { ImageConversionStrategy } from "./strategies/image-strategy";
import { LinkConversionStrategy } from "./strategies/link-strategy";
import { QuoteConversionStrategy } from "./strategies/quote-strategy";
import { StandardListConversionStrategy } from "./strategies/standard/list-strategy";
import { StrikethroughConversionStrategy } from "./strategies/strikethrough-strategy";
import { WorldAnvilListConversionStrategy } from "./strategies/worldanvil/list-strategy";

export class StrategyChainFactory {
    private static readonly bbcodeStrategies: ReadonlyArray<ConversionStrategy> = [
        new HeaderConversionStrategy(),
        new EmphasisConversionStrategy(),
        new ImageConversionStrategy(), // Must be before LinkConversionStrategy
        new LinkConversionStrategy(),
        new CodeConversionStrategy(),
        new StandardListConversionStrategy(),
        new QuoteConversionStrategy(),
        new StrikethroughConversionStrategy()
    ].sort((a, b) => a.priority - b.priority);
    private static readonly worldanvilStrategies: ReadonlyArray<ConversionStrategy> = [
        new HeaderConversionStrategy(),
        new EmphasisConversionStrategy(),
        new ImageConversionStrategy(), // Must be before LinkConversionStrategy
        new LinkConversionStrategy(),
        new CodeConversionStrategy(),
        new WorldAnvilListConversionStrategy(),
        new QuoteConversionStrategy(),
        new StrikethroughConversionStrategy()
    ].sort((a, b) => a.priority - b.priority);

    static getStrategies(format: 'bbcode' | 'worldanvil'): ReadonlyArray<ConversionStrategy> {
        switch (format) {
            case 'bbcode':
                return this.bbcodeStrategies;
            case 'worldanvil':
                return this.worldanvilStrategies;
        }
    }
}
