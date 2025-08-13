import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown headers to BBCode format
 */
export class HeaderConversionStrategy implements ConversionStrategy {
  readonly priority = 1;
  readonly name = 'HeaderConversion';

  convert(text: string, format: 'bbcode' | 'worldanvil'): string {
    // H1-H6 headers
    for (let i = 6; i >= 1; i--) {
      const regex = new RegExp(`^#{${i}}\\s+(.+)$`, 'gm');
      if (format === 'worldanvil') {
        // WorldAnvil uses [h1], [h2], etc.
        text = text.replace(regex, `[h${i}]$1[/h${i}]`);
      } else {
        // Traditional BBCode uses [size] tags for headers
        const sizes = ['28', '24', '20', '18', '16', '14'];
        text = text.replace(regex, `[size=${sizes[i-1] as string}][b]$1[/b][/size]`);
      }
    }
    return text;
  }
}
