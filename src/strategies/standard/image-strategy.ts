import { ConversionStrategy } from '../conversion-strategy';

/**
 * Converts markdown images to standard BBCode format
 */
export class ImageConversionStrategy implements ConversionStrategy {
  convert(text: string): string {
    // ![alt](url) -> [img]url[/img]
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[img]$2[/img]');
    
    return text;
  }
}
