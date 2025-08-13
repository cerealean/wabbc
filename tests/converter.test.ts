import { 
    Converter
} from '../src/converter';

describe('Markdown to BBCode Converter', () => {
    describe('Converter Class - Basic conversion', () => {
        let converter: Converter;
        
        beforeEach(() => {
            converter = new Converter();
        });

        test('should convert bold text', () => {
            expect(converter.convert('**bold text**')).toBe('[b]bold text[/b]');
            expect(converter.convert('__bold text__')).toBe('[b]bold text[/b]');
        });

        test('should convert italic text', () => {
            expect(converter.convert('*italic text*')).toBe('[i]italic text[/i]');
            expect(converter.convert('_italic text_')).toBe('[i]italic text[/i]');
        });

        test('should convert headers', () => {
            expect(converter.convert('# Header 1')).toBe('[size=28][b]Header 1[/b][/size]');
            expect(converter.convert('## Header 2')).toBe('[size=24][b]Header 2[/b][/size]');
            expect(converter.convert('### Header 3')).toBe('[size=20][b]Header 3[/b][/size]');
            expect(converter.convert('#### Header 4')).toBe('[size=18][b]Header 4[/b][/size]');
            expect(converter.convert('##### Header 5')).toBe('[size=16][b]Header 5[/b][/size]');
            expect(converter.convert('###### Header 6')).toBe('[size=14][b]Header 6[/b][/size]');
        });

        test('should convert links', () => {
            expect(converter.convert('[Link text](https://example.com)'))
                .toBe('[url=https://example.com]Link text[/url]');
            expect(converter.convert('<https://example.com>')).toBe('[url]https://example.com[/url]');
        });

        test('should convert inline code', () => {
            expect(converter.convert('`code`')).toBe('[code]code[/code]');
        });

        test('should convert code blocks', () => {
            const markdown = '```javascript\nconsole.log("hello");\n```';
            expect(converter.convert(markdown)).toBe('[code]console.log("hello");[/code]');
            expect(converter.convert('```\nplain code\n```')).toBe('[code]plain code[/code]');
        });

        test('should convert images', () => {
            expect(converter.convert('![Alt text](https://example.com/image.jpg)')).toBe('[img]https://example.com/image.jpg[/img]');
            expect(converter.convert('![](https://example.com/image.jpg)')).toBe('[img]https://example.com/image.jpg[/img]');
        });

        test('should convert lists', () => {
            expect(converter.convert('- Item 1\n- Item 2')).toBe('[list]\n[*] Item 1\n[*] Item 2\n[/list]');
            expect(converter.convert('* Item 1\n* Item 2')).toBe('[list]\n[*] Item 1\n[*] Item 2\n[/list]');
            expect(converter.convert('+ Item 1\n+ Item 2')).toBe('[list]\n[*] Item 1\n[*] Item 2\n[/list]');
        });

        test('should convert quotes', () => {
            expect(converter.convert('> This is a quote')).toBe('[quote]This is a quote[/quote]');
        });

        test('should convert strikethrough', () => {
            expect(converter.convert('~~strikethrough~~')).toBe('[s]strikethrough[/s]');
        });
    });

    describe('Converter Class - WorldAnvil format', () => {
        let converter: Converter;
        
        beforeEach(() => {
            converter = new Converter({ format: 'worldanvil' });
        });

        test('should convert headers to WorldAnvil format', () => {
            expect(converter.convert('# Header 1')).toBe('[h1]Header 1[/h1]');
            expect(converter.convert('## Header 2')).toBe('[h2]Header 2[/h2]');
            expect(converter.convert('### Header 3')).toBe('[h3]Header 3[/h3]');
            expect(converter.convert('#### Header 4')).toBe('[h4]Header 4[/h4]');
            expect(converter.convert('##### Header 5')).toBe('[h5]Header 5[/h5]');
            expect(converter.convert('###### Header 6')).toBe('[h6]Header 6[/h6]');
        });

        test('should convert images to WorldAnvil format', () => {
            expect(converter.convert('![alt text](image.jpg)')).toBe('[img:alt text]image.jpg[/img]');
        });

        test('should convert code blocks with language to WorldAnvil format', () => {
            const markdown = '```javascript\nconsole.log("hello");\n```';
            expect(converter.convert(markdown)).toBe('[code:javascript]console.log("hello");[/code]');
            expect(converter.convert('```\nplain code\n```')).toBe('[code]plain code[/code]');
        });

        test('should handle all other formatting the same as traditional BBCode', () => {
            expect(converter.convert('**bold**')).toBe('[b]bold[/b]');
            expect(converter.convert('*italic*')).toBe('[i]italic[/i]');
            expect(converter.convert('[link](url)')).toBe('[url=url]link[/url]');
            expect(converter.convert('`code`')).toBe('[code]code[/code]');
            expect(converter.convert('~~strike~~')).toBe('[s]strike[/s]');
        });
    });

    describe('Converter Class - Error handling', () => {
        test('should throw error for non-string input', () => {
            const converter = new Converter();
            expect(() => converter.convert(null as any)).toThrow('Markdown input must be a non-empty string');
            expect(() => converter.convert(123 as any)).toThrow('Markdown input must be a non-empty string');
            expect(() => converter.convert(undefined as any)).toThrow('Markdown input must be a non-empty string');
            expect(() => converter.convert('' as any)).toThrow('Markdown input must be a non-empty string');
        });

        test('should throw error for invalid format in constructor', () => {
            expect(() => new Converter({ format: 'invalid' as any }))
                .toThrow('Format must be either "bbcode" or "worldanvil"');
        });

        test('should work with empty options object', () => {
            const converter = new Converter({});
            expect(converter.convert('**test**')).toBe('[b]test[/b]');
        });

        test('should work with undefined options', () => {
            const converter = new Converter(undefined);
            expect(converter.convert('**test**')).toBe('[b]test[/b]');
        });
    });

    describe('Converter Class - Complex conversions', () => {
        let converter: Converter;
        
        beforeEach(() => {
            converter = new Converter();
        });

        test('should handle mixed formatting', () => {
            const markdown = '**Bold** and *italic* and `code`';
            const expected = '[b]Bold[/b] and [i]italic[/i] and [code]code[/code]';
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert lists', () => {
            const markdown = '- Item 1\n- Item 2\n- Item 3';
            const expected = '[list]\n[*] Item 1\n[*] Item 2\n[*] Item 3\n[/list]';
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert quotes', () => {
            const markdown = '> This is a quote\n> Multi-line quote';
            const expected = '[quote]This is a quote\nMulti-line quote[/quote]';
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert strikethrough', () => {
            expect(converter.convert('~~strikethrough~~')).toBe('[s]strikethrough[/s]');
        });

        test('should handle nested lists', () => {
            const markdown = '- Item 1\n  - Nested item\n- Item 2';
            const expected = '[list]\n[*] Item 1\n  [*] Nested item\n[*] Item 2\n[/list]';
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should handle complex mixed content', () => {
            const markdown = `# Header
**Bold** and *italic*
[Link](https://example.com)
\`code\`
- List item
> Quote`;
            const result = converter.convert(markdown);
            expect(result).toContain('[size=28][b]Header[/b][/size]');
            expect(result).toContain('[b]Bold[/b]');
            expect(result).toContain('[i]italic[/i]');
            expect(result).toContain('[url=https://example.com]Link[/url]');
            expect(result).toContain('[code]code[/code]');
            expect(result).toContain('[list]');
            expect(result).toContain('[*] List item');
            expect(result).toContain('[quote]Quote[/quote]');
        });

        test('should preserve image and link order correctly', () => {
            const markdown = '![image](img.jpg) and [link](url)';
            const expected = '[img]img.jpg[/img] and [url=url]link[/url]';
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should handle whitespace correctly', () => {
            const markdown = '  **bold**  ';
            const expected = '[b]bold[/b]';
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should handle empty code blocks', () => {
            expect(converter.convert('```\n\n```')).toBe('[code][/code]');
        });

        test('should handle single character formatting', () => {
            expect(converter.convert('**a**')).toBe('[b]a[/b]');
            expect(converter.convert('*b*')).toBe('[i]b[/i]');
            expect(converter.convert('`c`')).toBe('[code]c[/code]');
        });

        test('should handle consecutive quotes', () => {
            const markdown = '> Quote 1\n> Quote 2\n> Quote 3';
            const expected = '[quote]Quote 1\nQuote 2\nQuote 3[/quote]';
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should handle auto-links with different protocols', () => {
            expect(converter.convert('<https://example.com>')).toBe('[url]https://example.com[/url]');
            expect(converter.convert('<http://example.com>')).toBe('[url]http://example.com[/url]');
        });
    });
});
