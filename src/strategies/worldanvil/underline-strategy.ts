import { ConversionStrategy } from '../conversion-strategy';

/**
 * Converts HTML <ins> tags to BBCode format for WorldAnvil
 */
export class WorldAnvilUnderlineConversionStrategy implements ConversionStrategy {
  convert(text: string, format?: 'bbcode' | 'worldanvil'): string {
    // Convert <ins>text</ins> to [u]text[/u]
    text = text.replace(/<ins>(.*?)<\/ins>/g, '[u]$1[/u]');
    
    return text;
  }
}