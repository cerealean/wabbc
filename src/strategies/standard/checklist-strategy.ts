import { ConversionStrategy } from '../conversion-strategy';
import { StandardListConversionStrategy } from './list-strategy';

/**
 * Converts markdown checklists to standard BBCode format
 * 
 * Examples:
 * - [ ] item → [ ] item (unchecked)
 * - [x] item → [X] item (checked)
 * 
 * This strategy runs before list strategies to ensure checklist items
 * are properly converted before list formatting is applied.
 */
export class StandardChecklistConversionStrategy implements ConversionStrategy {
  readonly runBefore = [StandardListConversionStrategy] as const;

  convert(text: string): string {
    return this.convertStandardChecklists(text);
  }

  /**
   * Convert checklists to standard BBCode format
   */
  private convertStandardChecklists(text: string): string {
    // Convert unchecked items: - [ ] → - [ ]
    text = text.replace(/^(\s*)[-*+]\s+\[\s*\]\s+(.+)$/gm, '$1- [ ] $2');
    
    // Convert checked items: - [x] or - [X] → - [X]
    text = text.replace(/^(\s*)[-*+]\s+\[[xX]\]\s+(.+)$/gm, '$1- [X] $2');
    
    return text;
  }
}