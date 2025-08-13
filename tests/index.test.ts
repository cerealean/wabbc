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
        });

        test('should convert links', () => {
            expect(converter.convert('[Link text](https://example.com)'))
                .toBe('[url=https://example.com]Link text[/url]');
        });

        test('should convert inline code', () => {
            expect(converter.convert('`code`')).toBe('[code]code[/code]');
        });

        test('should convert code blocks', () => {
            const markdown = '```javascript\nconsole.log("hello");\n```';
            expect(converter.convert(markdown)).toBe('[code]console.log("hello");[/code]');
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
        });

        test('should convert images to WorldAnvil format', () => {
            expect(converter.convert('![alt text](image.jpg)')).toBe('[img:alt text]image.jpg[/img]');
        });

        test('should convert code blocks with language to WorldAnvil format', () => {
            const markdown = '```javascript\nconsole.log("hello");\n```';
            expect(converter.convert(markdown)).toBe('[code:javascript]console.log("hello");[/code]');
        });
    });

    describe('Converter Class - Error handling', () => {
        test('should throw error for non-string input', () => {
            const converter = new Converter();
            expect(() => converter.convert(null as any)).toThrow('Markdown input must be a non-empty string');
            expect(() => converter.convert(123 as any)).toThrow('Markdown input must be a non-empty string');
        });

        test('should throw error for invalid format in constructor', () => {
            expect(() => new Converter({ format: 'invalid' as any }))
                .toThrow('Format must be either "bbcode" or "worldanvil"');
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
    });
});
