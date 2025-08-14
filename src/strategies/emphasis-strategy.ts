import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown emphasis to BBCode format
 */
export class EmphasisConversionStrategy implements ConversionStrategy {
  convert(text: string): string {
    // Bold and italic combined
    text = text.replace(/\*\*\*(.+?)\*\*\*/g, '[b][i]$1[/i][/b]');
    text = text.replace(/___(.+?)___/g, '[b][i]$1[/i][/b]');
    
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '[b]$1[/b]');
    text = text.replace(/__(.+?)__/g, '[b]$1[/b]');
    
    // Italic
    text = text.replace(/\*(.+?)\*/g, '[i]$1[/i]');
    text = text.replace(/_(.+?)_/g, '[i]$1[/i]');
    
    return text;
  }
}
