import { ConversionStrategy } from '../conversion-strategy';

/**
 * Converts markdown code blocks and inline code to traditional BBCode format
 */
export class CodeConversionStrategy implements ConversionStrategy {
  convert(text: string): string {
    // Code blocks (always without language for traditional BBCode)
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang: string | undefined, code: string) => {
      const cleanCode = code.trim();
      return `[code]${cleanCode}[/code]`;
    });
    
    // Inline code
    text = text.replace(/`([^`]+)`/g, '[code]$1[/code]');
    
    return text;
  }
}
