import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown emphasis (bold/italic) to BBCode format
 */
export class EmphasisConversionStrategy implements ConversionStrategy {
  readonly priority = 2;
  readonly name = 'EmphasisConversion';

  convert(text: string, _format: 'bbcode' | 'worldanvil'): string {
    // Bold: **text** or __text__
    text = text.replace(/\*\*(.*?)\*\*/g, '[b]$1[/b]');
    text = text.replace(/__(.*?)__/g, '[b]$1[/b]');
    
    // Italic: *text* or _text_
    text = text.replace(/\*(.*?)\*/g, '[i]$1[/i]');
    text = text.replace(/_(.*?)_/g, '[i]$1[/i]');
    
    return text;
  }
}
