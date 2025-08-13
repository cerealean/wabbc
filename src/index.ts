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
 * Converts markdown text to BBCode format
 * @param markdown - The markdown text to convert
 * @param options - Conversion options
 * @returns The converted BBCode text
 * @throws Error if markdown input is not a string or format is invalid
 */
export function convertMarkdownToBBCode(markdown: string, options: ConversionOptions = {}): string {
    const { format = 'bbcode' } = options;
    
    if (!markdown || typeof markdown !== 'string') {
        throw new Error('Markdown input must be a non-empty string');
    }
    
    if (!['bbcode', 'worldanvil'].includes(format)) {
        throw new Error('Format must be either "bbcode" or "worldanvil"');
    }
    
    let result = markdown;
    
    // Convert headers
    result = convertHeaders(result, format);
    
    // Convert emphasis (bold/italic)
    result = convertEmphasis(result, format);
    
    // Convert images (must be before links to avoid conflicts)
    result = convertImages(result, format);
    
    // Convert links
    result = convertLinks(result, format);
    
    // Convert code blocks and inline code
    result = convertCode(result, format);
    
    // Convert lists
    result = convertLists(result, format);
    
    // Convert quotes
    result = convertQuotes(result, format);
    
    // Convert strikethrough
    result = convertStrikethrough(result, format);
    
    return result.trim();
}

/**
 * Convert markdown headers to BBCode
 */
export function convertHeaders(text: string, format: 'bbcode' | 'worldanvil'): string {
    // H1-H6 headers
    for (let i = 6; i >= 1; i--) {
        const regex = new RegExp(`^#{${i}}\\s+(.+)$`, 'gm');
        if (format === 'worldanvil') {
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
export function convertEmphasis(text: string, format: 'bbcode' | 'worldanvil'): string {
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
export function convertLinks(text: string, format: 'bbcode' | 'worldanvil'): string {
    // [text](url) - use negative lookbehind to avoid matching images
    text = text.replace(/(?<!\!)\[([^\]]+)\]\(([^)]+)\)/g, '[url=$2]$1[/url]');
    
    // Auto-links <url>
    text = text.replace(/<(https?:\/\/[^>]+)>/g, '[url]$1[/url]');
    
    return text;
}

/**
 * Convert markdown images to BBCode
 */
export function convertImages(text: string, format: 'bbcode' | 'worldanvil'): string {
    // ![alt](url)
    if (format === 'worldanvil') {
        text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[img:$1]$2[/img]');
    } else {
        text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '[img]$2[/img]');
    }
    
    return text;
}

/**
 * Convert markdown code to BBCode
 */
export function convertCode(text: string, format: 'bbcode' | 'worldanvil'): string {
    // Code blocks with language
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang: string | undefined, code: string) => {
        if (format === 'worldanvil') {
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
export function convertLists(text: string, format: 'bbcode' | 'worldanvil'): string {
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
export function convertQuotes(text: string, format: 'bbcode' | 'worldanvil'): string {
    // Block quotes
    text = text.replace(/^>\s*(.+)$/gm, '[quote]$1[/quote]');
    
    // Merge consecutive quotes
    text = text.replace(/\[\/quote\]\n\[quote\]/g, '\n');
    
    return text;
}

/**
 * Convert markdown strikethrough to BBCode
 */
export function convertStrikethrough(text: string, format: 'bbcode' | 'worldanvil'): string {
    // ~~text~~
    text = text.replace(/~~(.*?)~~/g, '[s]$1[/s]');
    
    return text;
}
