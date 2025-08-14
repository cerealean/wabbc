import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts HTML subscript tags to WorldAnvil BBCode format
 * Only applies to WorldAnvil format - standard BBCode is left unchanged
 */
export class SubscriptConversionStrategy implements ConversionStrategy {
  convert(text: string, format: 'bbcode' | 'worldanvil'): string {
    // Only convert for WorldAnvil format
    if (format === 'worldanvil') {
      // Convert <sub>text</sub> to [sub]text[/sub]
      text = text.replace(/<sub>(.*?)<\/sub>/g, '[sub]$1[/sub]');
    }
    
    return text;
  }
}