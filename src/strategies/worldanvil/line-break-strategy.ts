import { ConversionStrategy } from '../conversion-strategy';

/**
 * Converts markdown line breaks to WorldAnvil BBCode format
 * Handles GitHub Flavored Markdown line break syntax:
 * - Two spaces followed by newline: "  \n" -> "[br]"
 * - Backslash followed by newline: "\\\n" -> "[br]"
 */
export class LineBreakConversionStrategy implements ConversionStrategy {
  convert(text: string, format: 'bbcode' | 'worldanvil'): string {
    // Only apply to WorldAnvil format, leave standard BBCode unchanged
    if (format !== 'worldanvil') {
      return text;
    }
    
    // Convert backslash + newline to [br]
    text = text.replace(/\\\r?\n/g, '[br]');
    
    // Convert two spaces + newline to [br]
    text = text.replace(/ {2}\r?\n/g, '[br]');
    
    return text;
  }
}