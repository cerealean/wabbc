/**
 * Markdown to BBCode Converter
 * Converts GitHub-flavored Markdown to BBCode or WorldAnvil BBCode
 */

import { ConversionStrategy } from './strategies/conversion-strategy';
import { HeaderConversionStrategy } from './strategies/header-strategy';
import { EmphasisConversionStrategy } from './strategies/emphasis-strategy';
import { ImageConversionStrategy } from './strategies/image-strategy';
import { LinkConversionStrategy } from './strategies/link-strategy';
import { CodeConversionStrategy } from './strategies/code-strategy';
import { ListConversionStrategy } from './strategies/list-strategy';
import { QuoteConversionStrategy } from './strategies/quote-strategy';
import { StrikethroughConversionStrategy } from './strategies/strikethrough-strategy';

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
    private strategies: ConversionStrategy[];

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
        this.strategies = [
            new HeaderConversionStrategy(),
            new EmphasisConversionStrategy(),
            new ImageConversionStrategy(), // Must come before links
            new LinkConversionStrategy(),
            new CodeConversionStrategy(),
            new ListConversionStrategy(),
            new QuoteConversionStrategy(),
            new StrikethroughConversionStrategy()
        ].sort((a, b) => a.priority - b.priority);
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
