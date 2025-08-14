import { ConversionStrategy } from '../conversion-strategy';
import { WorldAnvilListConversionStrategy } from './list-strategy';

/**
 * Converts markdown checklists to WorldAnvil BBCode format
 * 
 * Examples:
 * - [ ] item → [] item (unchecked)
 * - [x] item → [c] item (checked)
 * 
 * This strategy runs before list strategies to ensure checklist items
 * are properly converted before list formatting is applied.
 */
export class WorldAnvilChecklistConversionStrategy implements ConversionStrategy {
  readonly runBefore = [WorldAnvilListConversionStrategy] as const;

  convert(text: string, _format: 'bbcode' | 'worldanvil'): string {
    return this.convertWorldAnvilChecklists(text);
  }

  /**
   * Convert checklists to WorldAnvil BBCode format
   */
  private convertWorldAnvilChecklists(text: string): string {
    // Convert unchecked items: - [ ] → - []
    text = text.replace(/^(\s*)[-*+]\s+\[\s*\]\s+(.+)$/gm, '$1- [] $2');
    
    // Convert checked items: - [x] or - [X] → - [c]
    text = text.replace(/^(\s*)[-*+]\s+\[[xX]\]\s+(.+)$/gm, '$1- [c] $2');
    
    return text;
  }
}