import { ConversionStrategy } from '../conversion-strategy';

/**
 * Converts dice notation to WorldAnvil BBCode format
 * Only applies to WorldAnvil format, not standard BBCode
 */
export class WorldAnvilDiceConversionStrategy implements ConversionStrategy {
  convert(text: string, format: 'bbcode' | 'worldanvil'): string {
    // Only convert for WorldAnvil format
    if (format !== 'worldanvil') {
      return text;
    }
    
    return this.convertDiceNotation(text);
  }

  /**
   * Convert dice notation like "3d6", "1d20+5", "2d4-1" to WorldAnvil BBCode format
   */
  private convertDiceNotation(text: string): string {
    // Regex to match dice notation: {number}d{number}[+/-{number}]
    // Matches patterns like: 3d6, 1d20, 100d8, 3d6+3, 2d4-2, 1d100+10
    const diceRegex = /\b(\d+d\d+(?:[+-]\d+)?)\b/g;
    
    return text.replace(diceRegex, '[dice]$1[/dice]');
  }
}