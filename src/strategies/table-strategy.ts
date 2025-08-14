import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown tables to BBCode format
 */
export class TableConversionStrategy implements ConversionStrategy {
  convert(text: string, _format: 'bbcode' | 'worldanvil'): string {
    return this.convertTables(text);
  }

  /**
   * Convert markdown tables to BBCode format
   */
  private convertTables(text: string): string {
    // Match markdown table pattern
    const tableRegex = /^\|(.+)\|\s*\n\|[-\s|:]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm;
    
    return text.replace(tableRegex, (match, headerRow: string, bodyRows: string) => {
      let result = '[table]\n';
      
      // Process header row
      const headers = this.parseTableRow(headerRow);
      if (headers.length > 0) {
        result += '[tr]\n';
        for (const header of headers) {
          result += `[th]${header.trim()}[/th]\n`;
        }
        result += '[/tr]\n';
      }
      
      // Process body rows
      const rows = bodyRows.trim().split('\n');
      for (const row of rows) {
        if (row.trim() && row.includes('|')) {
          const cells = this.parseTableRow(row);
          if (cells.length > 0) {
            result += '[tr]\n';
            for (const cell of cells) {
              result += `[td]${cell.trim()}[/td]\n`;
            }
            result += '[/tr]\n';
          }
        }
      }
      
      result += '[/table]\n';
      return result;
    });
  }

  /**
   * Parse a table row and extract cell contents
   */
  private parseTableRow(row: string): string[] {
    // Remove leading and trailing pipes, then split by pipes
    const trimmed = row.replace(/^\||\|$/g, '');
    return trimmed.split('|').map(cell => cell.trim());
  }
}
