import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown lists to WorldAnvil BBCode format
 */
export class WorldAnvilListConversionStrategy implements ConversionStrategy {
  convert(text: string): string {
    return this.convertWorldAnvilLists(text);
  }

  /**
   * Convert lists to WorldAnvil BBCode format
   */
  private convertWorldAnvilLists(text: string): string {
    // Handle ordered lists first
    text = this.convertOrderedListsWorldAnvil(text);
    
    // Handle unordered lists with dash format
    text = this.convertUnorderedListsWorldAnvil(text);
    
    return text;
  }

  /**
   * Convert ordered lists to WorldAnvil format: [ol][li]...[/li][/ol]
   */
  private convertOrderedListsWorldAnvil(text: string): string {
    // Group consecutive ordered list items
    const lines = text.split('\n');
    const newLines: string[] = [];
    let inOrderedList = false;
    let currentIndent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] as string;
      const orderedMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
      
      if (orderedMatch) {
        const [, indent, content] = orderedMatch;
        
        if (!inOrderedList || indent !== currentIndent) {
          // Start new ordered list
          if (inOrderedList) {
            newLines.push('[/ol]');
          }
          newLines.push('[ol]');
          inOrderedList = true;
          currentIndent = indent as string;
        }
        
        newLines.push(`  [li]${content}[/li]`);
      } else {
        // End current ordered list if we were in one
        if (inOrderedList) {
          newLines.push('[/ol]');
          inOrderedList = false;
          currentIndent = '';
        }
        newLines.push(line);
      }
    }
    
    // Close any remaining ordered list
    if (inOrderedList) {
      newLines.push('[/ol]');
    }
    
    return newLines.join('\n');
  }

  /**
   * Convert unordered lists to WorldAnvil dash format
   */
  private convertUnorderedListsWorldAnvil(text: string): string {
    // Convert unordered list items to dash format based on indentation
    return text.replace(/^(\s*)[-*+]\s+(.+)$/gm, (match, indent: string, content: string) => {
      // Calculate nesting level based on indentation (assuming 2 spaces per level)
      const nestingLevel = Math.floor(indent.length / 2) + 1;
      const dashes = '-'.repeat(nestingLevel);
      return `${dashes} ${content}`;
    });
  }
}
