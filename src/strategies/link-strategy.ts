import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown links to BBCode format
 */
export class LinkConversionStrategy implements ConversionStrategy {
  readonly name = 'LinkConversion';
  readonly runAfter = ['ImageConversion'] as const;

  convert(text: string, _format: 'bbcode' | 'worldanvil'): string {
    // [text](url) - use negative lookbehind to avoid matching images
    text = text.replace(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g, '[url=$2]$1[/url]');
    
    // Auto-links <url>
    text = text.replace(/<(https?:\/\/[^>]+)>/g, '[url]$1[/url]');
    
    return text;
  }
}
