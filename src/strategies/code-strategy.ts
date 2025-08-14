import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown code blocks and inline code to WorldAnvil BBCode format
 */
export class CodeConversionStrategy implements ConversionStrategy {
  convert(text: string): string {
    // Code blocks with language support for WorldAnvil
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang: string | undefined, code: string) => {
      const cleanCode = code.trim();
      if (lang && lang.trim()) {
        return `[code:${lang.trim()}]${cleanCode}[/code]`;
      } else {
        return `[code]${cleanCode}[/code]`;
      }
    });
    
    // Inline code
    text = text.replace(/`([^`]+)`/g, '[code]$1[/code]');
    
    return text;
  }
}
