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
  convert(text: string, format?: 'bbcode' | 'worldanvil'): string;
  
  /**
   * Optional array of strategy constructors that this strategy must run after
   * Used for automatic dependency-based ordering
   */
  readonly runAfter?: readonly (new () => ConversionStrategy)[];
  
  /**
   * Optional array of strategy constructors that this strategy must run before
   * Used for automatic dependency-based ordering
   */
  readonly runBefore?: readonly (new () => ConversionStrategy)[];
}
