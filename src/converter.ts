/**
 * Markdown to BBCode Converter
 * Converts GitHub-flavored Markdown to BBCode or WorldAnvil BBCode
 */

import { ConversionStrategy } from './strategies/conversion-strategy';
import { StrategyChainFactory } from './strategy-chain-factory';

/**
 * Options for converting markdown to BBCode
 */
export interface ConversionOptions {
  /** Format to convert to: 'bbcode' for traditional BBCode or 'worldanvil' for WorldAnvil BBCode */
  format?: 'bbcode' | 'worldanvil';
}

/**
 * Converter class for converting Markdown to BBCode using the Strategy pattern
 */
export class Converter {
    private format: 'bbcode' | 'worldanvil';
    private readonly strategies: ReadonlyArray<ConversionStrategy>;

    /**
     * Creates a new Converter instance
     * @param options - Conversion options
     */
    constructor(options: ConversionOptions = {}) {
        const { format = 'bbcode' } = options;
        
        if (!['bbcode', 'worldanvil'].includes(format)) {
            throw new Error('Format must be either "bbcode" or "worldanvil"');
        }
        
        this.format = format;
        
        // Initialize strategies in priority order
        this.strategies = StrategyChainFactory.getStrategies(this.format);
    }

    /**
     * Converts markdown text to BBCode format
     * @param markdown - The markdown text to convert
     * @returns The converted BBCode text
     * @throws Error if markdown input is not a string
     */
    convert(markdown: string): string {
        if (!markdown || typeof markdown !== 'string') {
            throw new Error('Markdown input must be a non-empty string');
        }
        
        // Apply all strategies in order
        const result = this.strategies.reduce(
            (text, strategy) => strategy.convert(text, this.format),
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
