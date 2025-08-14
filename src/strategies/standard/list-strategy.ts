import { ConversionStrategy } from '../conversion-strategy';

/**
 * Converts markdown lists to traditional BBCode format
 */
export class StandardListConversionStrategy implements ConversionStrategy {
  readonly name = 'StandardListConversion';

  convert(text: string, _format: 'bbcode' | 'worldanvil'): string {
    return this.convertTraditionalLists(text);
  }

  /**
   * Convert lists to traditional BBCode format
   */
  private convertTraditionalLists(text: string): string {
    // Convert unordered lists
    text = text.replace(/^(\s*)[-*+]\s+(.+)$/gm, '$1[*] $2');
    
    // Convert ordered lists
    text = text.replace(/^(\s*)\d+\.\s+(.+)$/gm, '$1[*] $2');
    
    // Wrap list items in [list] tags
    text = text.replace(/(\n|^)((?:\s*\[\*\][^\n]*(?:\n|$))+)/g, (match, start: string, listItems: string) => {
      return `${start}[list]\n${listItems.trim()}\n[/list]\n`;
    });
    
    return text;
  }
}
