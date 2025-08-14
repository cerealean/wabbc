import { ConversionStrategy } from '../conversion-strategy';
import { LinkConversionStrategy } from '../link-strategy';

/**
 * Converts markdown images to standard BBCode format
 */
export class ImageConversionStrategy implements ConversionStrategy {
  readonly runBefore = [LinkConversionStrategy] as const;
  
  convert(text: string): string {
    // ![alt](url) -> [img]url[/img]
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[img]$2[/img]');
    
    return text;
  }
}
