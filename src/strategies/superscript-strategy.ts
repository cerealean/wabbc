import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts HTML superscript tags to BBCode format
 * Only converts for WorldAnvil format, leaves standard BBCode unchanged
 */
export class SuperscriptConversionStrategy implements ConversionStrategy {
  convert(text: string, format: 'bbcode' | 'worldanvil' = 'bbcode'): string {
    // Only convert for WorldAnvil format
    if (format === 'worldanvil') {
      // Convert <sup>text</sup> to [sup]text[/sup]
      text = text.replace(/<sup>(.*?)<\/sup>/g, '[sup]$1[/sup]');
    }
    
    return text;
  }
}