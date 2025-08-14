import { ConversionStrategy } from '../conversion-strategy';

/**
 * Converts HTML superscript tags to WorldAnvil BBCode format
 */
export class SuperscriptConversionStrategy implements ConversionStrategy {
  convert(text: string, _format: 'bbcode' | 'worldanvil' = 'worldanvil'): string {
    // Convert <sup>text</sup> to [sup]text[/sup]
    text = text.replace(/<sup>(.*?)<\/sup>/g, '[sup]$1[/sup]');
    
    return text;
  }
}