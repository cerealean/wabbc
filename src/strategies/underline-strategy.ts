import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts HTML <ins> tags to BBCode format for WorldAnvil only
 */
export class UnderlineConversionStrategy implements ConversionStrategy {
  convert(text: string, format: 'bbcode' | 'worldanvil' = 'bbcode'): string {
    // Only process underline for WorldAnvil format
    if (format !== 'worldanvil') {
      return text;
    }
    
    // Convert <ins>text</ins> to [u]text[/u]
    text = text.replace(/<ins>(.*?)<\/ins>/g, '[u]$1[/u]');
    
    return text;
  }
}