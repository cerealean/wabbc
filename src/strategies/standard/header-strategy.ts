import { ConversionStrategy } from '../conversion-strategy';

/**
 * Converts markdown headers to traditional BBCode format
 */
export class StandardHeaderConversionStrategy implements ConversionStrategy {
  convert(text: string, _format: 'bbcode' | 'worldanvil'): string {
    return this.convertTraditionalHeaders(text);
  }

  /**
   * Convert headers to traditional BBCode format using [size] tags
   */
  private convertTraditionalHeaders(text: string): string {
    // H1-H6 headers
    for (let i = 6; i >= 1; i--) {
      const regex = new RegExp(`^#{${i}}\\s+(.+)$`, 'gm');
      // Traditional BBCode uses [size] tags for headers
      const sizes = ['28', '24', '20', '18', '16', '14'];
      text = text.replace(regex, `[size=${sizes[i-1] as string}][b]$1[/b][/size]`);
    }
    return text;
  }
}
