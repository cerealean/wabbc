import { 
    Converter,
    convertMarkdownToBBCode,
    convertHeaders,
    convertEmphasis,
    convertLinks,
    convertImages,
    convertCode,
    convertLists,
    convertQuotes,
    convertStrikethrough,
    ConversionOptions
} from '../src/index';

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

    // Backward compatibility tests for function-based API
    describe('Backward Compatibility - Function API', () => {
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
                const options: ConversionOptions = { format: 'worldanvil' };
                expect(convertMarkdownToBBCode('# Header 1', options))
                    .toBe('[h1]Header 1[/h1]');
                expect(convertMarkdownToBBCode('## Header 2', options))
                    .toBe('[h2]Header 2[/h2]');
            });

            test('should convert images to WorldAnvil format', () => {
                const options: ConversionOptions = { format: 'worldanvil' };
                expect(convertMarkdownToBBCode('![alt text](image.jpg)', options))
                    .toBe('[img:alt text]image.jpg[/img]');
            });

            test('should convert code blocks with language to WorldAnvil format', () => {
                const markdown = '```javascript\nconsole.log("hello");\n```';
                const options: ConversionOptions = { format: 'worldanvil' };
                expect(convertMarkdownToBBCode(markdown, options))
                    .toBe('[code:javascript]console.log("hello");[/code]');
            });
        });

        describe('Error handling', () => {
            test('should throw error for non-string input', () => {
                expect(() => convertMarkdownToBBCode(null as any)).toThrow('Markdown input must be a non-empty string');
                expect(() => convertMarkdownToBBCode(123 as any)).toThrow('Markdown input must be a non-empty string');
            });

            test('should throw error for invalid format', () => {
                expect(() => convertMarkdownToBBCode('test', { format: 'invalid' as any }))
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

    describe('Individual function tests (Deprecated)', () => {
        test('convertHeaders should work correctly', () => {
            expect(convertHeaders('# Test', 'bbcode')).toBe('[size=28][b]Test[/b][/size]');
            expect(convertHeaders('# Test', 'worldanvil')).toBe('[h1]Test[/h1]');
        });

        test('convertEmphasis should work correctly', () => {
            expect(convertEmphasis('**bold**', 'bbcode')).toBe('[b]bold[/b]');
            expect(convertEmphasis('*italic*', 'bbcode')).toBe('[i]italic[/i]');
        });

        test('convertLinks should work correctly', () => {
            expect(convertLinks('[test](url)', 'bbcode')).toBe('[url=url]test[/url]');
        });

        test('convertImages should work correctly', () => {
            expect(convertImages('![alt](url)', 'bbcode')).toBe('[img]url[/img]');
            expect(convertImages('![alt](url)', 'worldanvil')).toBe('[img:alt]url[/img]');
        });

        test('convertCode should work correctly', () => {
            expect(convertCode('`code`', 'bbcode')).toBe('[code]code[/code]');
        });

        test('convertLists should work correctly', () => {
            const result = convertLists('- item', 'bbcode');
            expect(result).toContain('[*] item');
            expect(result).toContain('[list]');
            expect(result).toContain('[/list]');
        });

        test('convertQuotes should work correctly', () => {
            expect(convertQuotes('> quote', 'bbcode')).toBe('[quote]quote[/quote]');
        });

        test('convertStrikethrough should work correctly', () => {
            expect(convertStrikethrough('~~text~~', 'bbcode')).toBe('[s]text[/s]');
        });
    });
});
