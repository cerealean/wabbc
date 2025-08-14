/**
 * Markdown to WorldAnvil BBCode Converter
 * Converts GitHub-flavored Markdown to WorldAnvil BBCode format
 */

import { ConversionStrategy } from './strategies/conversion-strategy';
import { StrategyChainFactory } from './strategy-chain-factory';

/**
 * Options for converting markdown to WorldAnvil BBCode
 */
export interface ConversionOptions {
  // Reserved for future options if needed
}

/**
 * Converter class for converting Markdown to WorldAnvil BBCode using the Strategy pattern
 */
export class Converter {
    private readonly strategies: ReadonlyArray<ConversionStrategy>;

    /**
     * Creates a new Converter instance
     * @param _options - Conversion options (reserved for future use)
     */
    constructor(_options: ConversionOptions = {}) {
        // Initialize strategies in priority order
        this.strategies = StrategyChainFactory.getStrategies();
    }

    /**
     * Converts markdown text to WorldAnvil BBCode format
     * @param markdown - The markdown text to convert
     * @returns The converted WorldAnvil BBCode text
     * @throws Error if markdown input is not a string
     */
    convert(markdown: string): string {
        if (!markdown || typeof markdown !== 'string') {
            throw new Error('Markdown input must be a non-empty string');
        }
        
        // Apply all strategies in order
        const result = this.strategies.reduce(
            (text, strategy) => strategy.convert(text),
            markdown
        );
        
        return result.trim();
    }

    /**
     * Get the list of active strategies (for debugging/testing)
     */
    getStrategies(): ConversionStrategy[] {
        return [...this.strategies];
    }
}
