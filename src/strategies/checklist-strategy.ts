import { ConversionStrategy } from './conversion-strategy';
import { StandardListConversionStrategy } from './standard/list-strategy';
import { WorldAnvilListConversionStrategy } from './worldanvil/list-strategy';

/**
 * Converts markdown checklists to BBCode format
 * 
 * For standard BBCode:
 * - [ ] item → [ ] item (unchecked)
 * - [x] item → [X] item (checked)
 * 
 * For WorldAnvil BBCode:
 * - [ ] item → [] item (unchecked)
 * - [x] item → [c] item (checked)
 * 
 * This strategy runs before list strategies to ensure checklist items
 * are properly converted before list formatting is applied.
 */
export class ChecklistConversionStrategy implements ConversionStrategy {
  readonly runBefore = [StandardListConversionStrategy, WorldAnvilListConversionStrategy] as const;

  convert(text: string, format: 'bbcode' | 'worldanvil' = 'bbcode'): string {
    if (format === 'worldanvil') {
      return this.convertWorldAnvilChecklists(text);
    } else {
      return this.convertStandardChecklists(text);
    }
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