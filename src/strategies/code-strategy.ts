import { ConversionStrategy } from './conversion-strategy';

/**
 * Converts markdown code blocks and inline code to BBCode format
 */
export class CodeConversionStrategy implements ConversionStrategy {
  convert(text: string, format: 'bbcode' | 'worldanvil'): string {
    // Code blocks with language
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang: string | undefined, code: string) => {
      const cleanCode = code.trim();
      if (lang && lang.trim() && format === 'worldanvil') {
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
