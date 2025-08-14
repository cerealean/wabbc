import { ConversionStrategy } from '../conversion-strategy';
import { EmphasisConversionStrategy } from '../emphasis-strategy';

/**
 * Converts markdown horizontal rules to WorldAnvil BBCode format
 * GitHub markdown horizontal rules: --- or *** (3 or more) on a line by itself
 * WorldAnvil: converts to [hr]
 */
export class WorldAnvilHorizontalRuleConversionStrategy implements ConversionStrategy {
  // Must run before emphasis strategy to avoid conflicts with *** patterns
  readonly runBefore = [EmphasisConversionStrategy] as const;

  convert(text: string): string {
    return this.convertHorizontalRules(text);
  }

  /**
   * Convert horizontal rules to WorldAnvil [hr] format
   */
  private convertHorizontalRules(text: string): string {
    // Split into lines, process each line, then rejoin
    const lines = text.split('\n');
    const processedLines = lines.map(line => {
      // Match lines that contain only dashes (3 or more) or asterisks (3 or more)
      // with optional leading/trailing whitespace
      if (/^\s*(?:-{3,}|\*{3,})\s*$/.test(line)) {
        return '[hr]';
      }
      return line;
    });
    
    return processedLines.join('\n');
  }
}