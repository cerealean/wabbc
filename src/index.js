/**
 * Markdown to BBCode Converter
 * Converts GitHub-flavored Markdown to BBCode or WorldAnvil BBCode
 */

/**
 * Converts markdown text to BBCode format
 * @param {string} markdown - The markdown text to convert
 * @param {Object} options - Conversion options
 * @param {string} options.format - 'bbcode' for traditional BBCode or 'worldanvil' for WorldAnvil BBCode
 * @returns {string} The converted BBCode text
 */
function convertMarkdownToBBCode(markdown, options = {}) {
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
function convertHeaders(text, format) {
    // H1-H6 headers
    for (let i = 6; i >= 1; i--) {
        const regex = new RegExp(`^#{${i}}\\s+(.+)$`, 'gm');
        if (format === 'worldanvil') {
            // WorldAnvil uses [h1], [h2], etc.
            text = text.replace(regex, `[h${i}]$1[/h${i}]`);
        } else {
            // Traditional BBCode uses [size] tags for headers
            const sizes = ['28', '24', '20', '18', '16', '14'];
            text = text.replace(regex, `[size=${sizes[i-1]}][b]$1[/b][/size]`);
        }
    }
    return text;
}

/**
 * Convert markdown emphasis to BBCode
 */
function convertEmphasis(text, format) {
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
function convertLinks(text, format) {
    // [text](url) - use negative lookbehind to avoid matching images
    text = text.replace(/(?<!\!)\[([^\]]+)\]\(([^)]+)\)/g, '[url=$2]$1[/url]');
    
    // Auto-links <url>
    text = text.replace(/<(https?:\/\/[^>]+)>/g, '[url]$1[/url]');
    
    return text;
}

/**
 * Convert markdown images to BBCode
 */
function convertImages(text, format) {
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
function convertCode(text, format) {
    // Code blocks with language
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
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
function convertLists(text, format) {
    // Convert unordered lists
    text = text.replace(/^(\s*)[-*+]\s+(.+)$/gm, '$1[*] $2');
    
    // Convert ordered lists
    text = text.replace(/^(\s*)\d+\.\s+(.+)$/gm, '$1[*] $2');
    
    // Wrap list items in [list] tags
    text = text.replace(/(\n|^)((?:\s*\[\*\][^\n]*(?:\n|$))+)/g, (match, start, listItems) => {
        return `${start}[list]\n${listItems.trim()}\n[/list]\n`;
    });
    
    return text;
}

/**
 * Convert markdown quotes to BBCode
 */
function convertQuotes(text, format) {
    // Block quotes
    text = text.replace(/^>\s*(.+)$/gm, '[quote]$1[/quote]');
    
    // Merge consecutive quotes
    text = text.replace(/\[\/quote\]\n\[quote\]/g, '\n');
    
    return text;
}

/**
 * Convert markdown strikethrough to BBCode
 */
function convertStrikethrough(text, format) {
    // ~~text~~
    text = text.replace(/~~(.*?)~~/g, '[s]$1[/s]');
    
    return text;
}

module.exports = {
    convertMarkdownToBBCode,
    convertHeaders,
    convertEmphasis,
    convertLinks,
    convertImages,
    convertCode,
    convertLists,
    convertQuotes,
    convertStrikethrough
};
