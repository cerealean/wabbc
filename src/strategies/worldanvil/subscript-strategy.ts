import { ConversionStrategy } from '../conversion-strategy';

/**
 * Converts HTML subscript tags to WorldAnvil BBCode format
 */
export class WorldAnvilSubscriptConversionStrategy implements ConversionStrategy {
  convert(text: string): string {
    // Convert <sub>text</sub> to [sub]text[/sub]
    return text.replace(/<sub>(.*?)<\/sub>/g, '[sub]$1[/sub]');
  }
}