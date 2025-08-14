import { ConversionStrategy } from './conversion-strategy';
import { LinkConversionStrategy } from './link-strategy';

/**
 * Converts markdown images to WorldAnvil BBCode format
 */
export class ImageConversionStrategy implements ConversionStrategy {
  readonly runBefore = [LinkConversionStrategy] as const;
  
  convert(text: string): string {
    // ![alt](url) -> [img:alt]url[/img]
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[img:$1]$2[/img]');
    
    return text;
  }
}
