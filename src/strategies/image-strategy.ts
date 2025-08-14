import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown images to BBCode format
 */
export class ImageConversionStrategy implements ConversionStrategy {
  readonly name = 'ImageConversion';

  convert(text: string, format: 'bbcode' | 'worldanvil'): string {
    // ![alt](url)
    if (format === 'worldanvil') {
      text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[img:$1]$2[/img]');
    } else {
      text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[img]$2[/img]');
    }
    
    return text;
  }
}
