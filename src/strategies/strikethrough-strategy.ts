import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown strikethrough to BBCode format
 */
export class StrikethroughConversionStrategy implements ConversionStrategy {
  convert(text: string): string {
    // ~~text~~
    text = text.replace(/~~(.*?)~~/g, '[s]$1[/s]');
    
    return text;
  }
}
