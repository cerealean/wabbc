import { ConversionStrategy } from '../conversion-strategy';
import { EmphasisConversionStrategy } from '../emphasis-strategy';

/**
 * Handles markdown horizontal rules for standard BBCode format
 * GitHub markdown horizontal rules: --- or *** (3 or more) on a line by itself
 * Standard BBCode: leaves horizontal rules unchanged
 */
export class StandardHorizontalRuleConversionStrategy implements ConversionStrategy {
  // Must run before emphasis strategy to avoid conflicts with *** patterns
  readonly runBefore = [EmphasisConversionStrategy] as const;

  convert(text: string, _format: 'bbcode' | 'worldanvil'): string {
    // For standard BBCode, leave horizontal rules unchanged
    return text;
  }
}