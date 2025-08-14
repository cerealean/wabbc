import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown strikethrough to BBCode format
 */
export class StrikethroughConversionStrategy implements ConversionStrategy {
  readonly priority = 9;
  readonly name = 'StrikethroughConversion';

  convert(text: string, _format: 'bbcode' | 'worldanvil'): string {
    // ~~text~~
    text = text.replace(/~~(.*?)~~/g, '[s]$1[/s]');
    
    return text;
  }
}
