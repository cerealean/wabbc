import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown quotes to BBCode format
 */
export class QuoteConversionStrategy implements ConversionStrategy {
  readonly priority = 7;
  readonly name = 'QuoteConversion';

  convert(text: string, _format: 'bbcode' | 'worldanvil'): string {
    // Block quotes
    text = text.replace(/^>\s*(.+)$/gm, '[quote]$1[/quote]');
    
    // Merge consecutive quotes
    text = text.replace(/\[\/quote\]\n\[quote\]/g, '\n');
    
    return text;
  }
}
