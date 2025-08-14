import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown headers to WorldAnvil BBCode format
 */
export class WorldAnvilHeaderConversionStrategy implements ConversionStrategy {
  convert(text: string): string {
    return this.convertWorldAnvilHeaders(text);
  }

  /**
   * Convert headers to WorldAnvil format using [h1], [h2], etc. tags
   */
  private convertWorldAnvilHeaders(text: string): string {
    // H1-H6 headers
    for (let i = 6; i >= 1; i--) {
      const regex = new RegExp(`^#{${i}}\\s+(.+)$`, 'gm');
      // WorldAnvil uses [h1], [h2], etc.
      text = text.replace(regex, `[h${i}]$1[/h${i}]`);
    }
    return text;
  }
}
