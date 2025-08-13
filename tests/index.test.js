const { convertMarkdownToBBCode } = require('../src/index');

describe('Markdown to BBCode Converter', () => {
    describe('Basic conversion', () => {
        test('should convert bold text', () => {
            expect(convertMarkdownToBBCode('**bold text**')).toBe('[b]bold text[/b]');
            expect(convertMarkdownToBBCode('__bold text__')).toBe('[b]bold text[/b]');
        });

        test('should convert italic text', () => {
            expect(convertMarkdownToBBCode('*italic text*')).toBe('[i]italic text[/i]');
            expect(convertMarkdownToBBCode('_italic text_')).toBe('[i]italic text[/i]');
        });

        test('should convert headers', () => {
            expect(convertMarkdownToBBCode('# Header 1')).toBe('[size=28][b]Header 1[/b][/size]');
            expect(convertMarkdownToBBCode('## Header 2')).toBe('[size=24][b]Header 2[/b][/size]');
        });

        test('should convert links', () => {
            expect(convertMarkdownToBBCode('[Link text](https://example.com)'))
                .toBe('[url=https://example.com]Link text[/url]');
        });

        test('should convert inline code', () => {
            expect(convertMarkdownToBBCode('`code`')).toBe('[code]code[/code]');
        });

        test('should convert code blocks', () => {
            const markdown = '```javascript\nconsole.log("hello");\n```';
            expect(convertMarkdownToBBCode(markdown)).toBe('[code]console.log("hello");[/code]');
        });
    });

    describe('WorldAnvil format', () => {
        test('should convert headers to WorldAnvil format', () => {
            expect(convertMarkdownToBBCode('# Header 1', { format: 'worldanvil' }))
                .toBe('[h1]Header 1[/h1]');
            expect(convertMarkdownToBBCode('## Header 2', { format: 'worldanvil' }))
                .toBe('[h2]Header 2[/h2]');
        });

        test('should convert images to WorldAnvil format', () => {
            expect(convertMarkdownToBBCode('![alt text](image.jpg)', { format: 'worldanvil' }))
                .toBe('[img:alt text]image.jpg[/img]');
        });

        test('should convert code blocks with language to WorldAnvil format', () => {
            const markdown = '```javascript\nconsole.log("hello");\n```';
            expect(convertMarkdownToBBCode(markdown, { format: 'worldanvil' }))
                .toBe('[code:javascript]console.log("hello");[/code]');
        });
    });

    describe('Error handling', () => {
        test('should throw error for non-string input', () => {
            expect(() => convertMarkdownToBBCode(null)).toThrow('Markdown input must be a non-empty string');
            expect(() => convertMarkdownToBBCode(123)).toThrow('Markdown input must be a non-empty string');
        });

        test('should throw error for invalid format', () => {
            expect(() => convertMarkdownToBBCode('test', { format: 'invalid' }))
                .toThrow('Format must be either "bbcode" or "worldanvil"');
        });
    });

    describe('Complex conversions', () => {
        test('should handle mixed formatting', () => {
            const markdown = '**Bold** and *italic* and `code`';
            const expected = '[b]Bold[/b] and [i]italic[/i] and [code]code[/code]';
            expect(convertMarkdownToBBCode(markdown)).toBe(expected);
        });

        test('should convert lists', () => {
            const markdown = '- Item 1\n- Item 2\n- Item 3';
            const expected = '[list]\n[*] Item 1\n[*] Item 2\n[*] Item 3\n[/list]';
            expect(convertMarkdownToBBCode(markdown)).toBe(expected);
        });

        test('should convert quotes', () => {
            const markdown = '> This is a quote\n> Multi-line quote';
            const expected = '[quote]This is a quote\nMulti-line quote[/quote]';
            expect(convertMarkdownToBBCode(markdown)).toBe(expected);
        });

        test('should convert strikethrough', () => {
            expect(convertMarkdownToBBCode('~~strikethrough~~')).toBe('[s]strikethrough[/s]');
        });
    });
});
