/**
 * Markdown to BBCode Converter
 * Converts GitHub-flavored Markdown to BBCode or WorldAnvil BBCode
 */

/**
 * Options for converting markdown to BBCode
 */
export interface ConversionOptions {
  /** Format to convert to: 'bbcode' for traditional BBCode or 'worldanvil' for WorldAnvil BBCode */
  format?: 'bbcode' | 'worldanvil';
}

/**
 * Converter class for converting Markdown to BBCode
 */
export class Converter {
    private format: 'bbcode' | 'worldanvil';

    /**
     * Creates a new Converter instance
     * @param options - Conversion options
     */
    constructor(options: ConversionOptions = {}) {
        const { format = 'bbcode' } = options;
        
        if (!['bbcode', 'worldanvil'].includes(format)) {
            throw new Error('Format must be either "bbcode" or "worldanvil"');
        }
        
        this.format = format;
    }

    /**
     * Converts markdown text to BBCode format
     * @param markdown - The markdown text to convert
     * @returns The converted BBCode text
     * @throws Error if markdown input is not a string
     */
    convert(markdown: string): string {
        if (!markdown || typeof markdown !== 'string') {
            throw new Error('Markdown input must be a non-empty string');
        }
        
        let result = markdown;
        
        // Convert headers
        result = this.convertHeaders(result);
        
        // Convert emphasis (bold/italic)
        result = this.convertEmphasis(result);
        
        // Convert images (must be before links to avoid conflicts)
        result = this.convertImages(result);
        
        // Convert links
        result = this.convertLinks(result);
        
        // Convert code blocks and inline code
        result = this.convertCode(result);
        
        // Convert lists
        result = this.convertLists(result);
        
        // Convert quotes
        result = this.convertQuotes(result);
        
        // Convert strikethrough
        result = this.convertStrikethrough(result);
        
        return result.trim();
    }

    /**
     * Convert markdown headers to BBCode
     */
    private convertHeaders(text: string): string {
        // H1-H6 headers
        for (let i = 6; i >= 1; i--) {
            const regex = new RegExp(`^#{${i}}\\s+(.+)$`, 'gm');
            if (this.format === 'worldanvil') {
                // WorldAnvil uses [h1], [h2], etc.
                text = text.replace(regex, `[h${i}]$1[/h${i}]`);
            } else {
                // Traditional BBCode uses [size] tags for headers
                const sizes = ['28', '24', '20', '18', '16', '14'];
                text = text.replace(regex, `[size=${sizes[i-1] as string}][b]$1[/b][/size]`);
            }
        }
        return text;
    }

    /**
     * Convert markdown emphasis to BBCode
     */
    private convertEmphasis(text: string): string {
        // Bold: **text** or __text__
        text = text.replace(/\*\*(.*?)\*\*/g, '[b]$1[/b]');
        text = text.replace(/__(.*?)__/g, '[b]$1[/b]');
        
        // Italic: *text* or _text_
        text = text.replace(/\*(.*?)\*/g, '[i]$1[/i]');
        text = text.replace(/_(.*?)_/g, '[i]$1[/i]');
        
        return text;
    }

    /**
     * Convert markdown links to BBCode
     */
    private convertLinks(text: string): string {
        // [text](url) - use negative lookbehind to avoid matching images
        text = text.replace(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g, '[url=$2]$1[/url]');
        
        // Auto-links <url>
        text = text.replace(/<(https?:\/\/[^>]+)>/g, '[url]$1[/url]');
        
        return text;
    }

    /**
     * Convert markdown images to BBCode
     */
    private convertImages(text: string): string {
        // ![alt](url)
        if (this.format === 'worldanvil') {
            text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[img:$1]$2[/img]');
        } else {
            text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[img]$2[/img]');
        }
        
        return text;
    }

    /**
     * Convert markdown code to BBCode
     */
    private convertCode(text: string): string {
        // Code blocks with language
        text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang: string | undefined, code: string) => {
            if (this.format === 'worldanvil') {
                return `[code${lang ? `:${lang}` : ''}]${code.trim()}[/code]`;
            } else {
                return `[code]${code.trim()}[/code]`;
            }
        });
        
        // Inline code
        text = text.replace(/`([^`]+)`/g, '[code]$1[/code]');
        
        return text;
    }

    /**
     * Convert markdown lists to BBCode
     */
    private convertLists(text: string): string {
        if (this.format === 'worldanvil') {
            return this.convertWorldAnvilLists(text);
        } else {
            return this.convertTraditionalLists(text);
        }
    }

    /**
     * Convert lists to WorldAnvil BBCode format
     */
    private convertWorldAnvilLists(text: string): string {
        // Handle ordered lists first
        text = this.convertOrderedListsWorldAnvil(text);
        
        // Handle unordered lists with dash format
        text = this.convertUnorderedListsWorldAnvil(text);
        
        return text;
    }

    /**
     * Convert ordered lists to WorldAnvil format: [ol][li]...[/li][/ol]
     */
    private convertOrderedListsWorldAnvil(text: string): string {
        // Group consecutive ordered list items
        let result = text;
        const lines = result.split('\n');
        const newLines: string[] = [];
        let inOrderedList = false;
        let currentIndent = '';
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i] as string;
            const orderedMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
            
            if (orderedMatch) {
                const [, indent, content] = orderedMatch;
                
                if (!inOrderedList || indent !== currentIndent) {
                    // Start new ordered list
                    if (inOrderedList) {
                        newLines.push('[/ol]');
                    }
                    newLines.push('[ol]');
                    inOrderedList = true;
                    currentIndent = indent as string;
                }
                
                newLines.push(`  [li]${content}[/li]`);
            } else {
                // End current ordered list if we were in one
                if (inOrderedList) {
                    newLines.push('[/ol]');
                    inOrderedList = false;
                    currentIndent = '';
                }
                newLines.push(line);
            }
        }
        
        // Close any remaining ordered list
        if (inOrderedList) {
            newLines.push('[/ol]');
        }
        
        return newLines.join('\n');
    }

    /**
     * Convert unordered lists to WorldAnvil dash format
     */
    private convertUnorderedListsWorldAnvil(text: string): string {
        // Convert unordered list items to dash format based on indentation
        return text.replace(/^(\s*)[-*+]\s+(.+)$/gm, (match, indent: string, content: string) => {
            // Calculate nesting level based on indentation (assuming 2 spaces per level)
            const nestingLevel = Math.floor(indent.length / 2) + 1;
            const dashes = '-'.repeat(nestingLevel);
            return `${dashes} ${content}`;
        });
    }

    /**
     * Convert lists to traditional BBCode format
     */
    private convertTraditionalLists(text: string): string {
        // Convert unordered lists
        text = text.replace(/^(\s*)[-*+]\s+(.+)$/gm, '$1[*] $2');
        
        // Convert ordered lists
        text = text.replace(/^(\s*)\d+\.\s+(.+)$/gm, '$1[*] $2');
        
        // Wrap list items in [list] tags
        text = text.replace(/(\n|^)((?:\s*\[\*\][^\n]*(?:\n|$))+)/g, (match, start: string, listItems: string) => {
            return `${start}[list]\n${listItems.trim()}\n[/list]\n`;
        });
        
        return text;
    }

    /**
     * Convert markdown quotes to BBCode
     */
    private convertQuotes(text: string): string {
        // Block quotes
        text = text.replace(/^>\s*(.+)$/gm, '[quote]$1[/quote]');
        
        // Merge consecutive quotes
        text = text.replace(/\[\/quote\]\n\[quote\]/g, '\n');
        
        return text;
    }

    /**
     * Convert markdown strikethrough to BBCode
     */
    private convertStrikethrough(text: string): string {
        // ~~text~~
        text = text.replace(/~~(.*?)~~/g, '[s]$1[/s]');
        
        return text;
    }
}
