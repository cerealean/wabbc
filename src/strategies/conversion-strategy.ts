/**
 * Base interface for all conversion strategies
 */
export interface ConversionStrategy {
  /**
   * Convert text using this strategy
   * @param text - The text to convert
   * @param format - The target format ('bbcode' or 'worldanvil')
   * @returns The converted text
   */
  convert(text: string, format: 'bbcode' | 'worldanvil'): string;
  
  /**
   * Priority order for this strategy (lower numbers run first)
   */
  readonly priority: number;
  
  /**
   * Name of this strategy for debugging
   */
  readonly name: string;
}
