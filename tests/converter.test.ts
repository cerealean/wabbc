import { 
    Converter
} from '../src/converter';
import { StandardHeaderConversionStrategy } from '../src/strategies/standard/header-strategy';
import { ImageConversionStrategy as StandardImageConversionStrategy } from '../src/strategies/standard/image-strategy';
import { ImageConversionStrategy as WorldAnvilImageConversionStrategy } from '../src/strategies/worldanvil/image-strategy';
import { LinkConversionStrategy } from '../src/strategies/link-strategy';
import { faker } from '@faker-js/faker';

describe('Markdown to BBCode Converter', () => {
    describe('Converter Class - Basic conversion', () => {
        let converter: Converter;
        
        beforeEach(() => {
            converter = new Converter();
        });

        test('should convert bold text', () => {
            const text = faker.lorem.words(3);
            expect(converter.convert(`**${text}**`)).toBe(`[b]${text}[/b]`);
            expect(converter.convert(`__${text}__`)).toBe(`[b]${text}[/b]`);
        });

        test('should convert italic text', () => {
            const text = faker.lorem.words(2);
            expect(converter.convert(`*${text}*`)).toBe(`[i]${text}[/i]`);
            expect(converter.convert(`_${text}_`)).toBe(`[i]${text}[/i]`);
        });

        test('should convert headers', () => {
            const h1Text = faker.lorem.words(2);
            const h2Text = faker.lorem.words(3);
            const h3Text = faker.lorem.words(2);
            const h4Text = faker.lorem.words(4);
            const h5Text = faker.lorem.words(2);
            const h6Text = faker.lorem.words(3);
            
            expect(converter.convert(`# ${h1Text}`)).toBe(`[size=28][b]${h1Text}[/b][/size]`);
            expect(converter.convert(`## ${h2Text}`)).toBe(`[size=24][b]${h2Text}[/b][/size]`);
            expect(converter.convert(`### ${h3Text}`)).toBe(`[size=20][b]${h3Text}[/b][/size]`);
            expect(converter.convert(`#### ${h4Text}`)).toBe(`[size=18][b]${h4Text}[/b][/size]`);
            expect(converter.convert(`##### ${h5Text}`)).toBe(`[size=16][b]${h5Text}[/b][/size]`);
            expect(converter.convert(`###### ${h6Text}`)).toBe(`[size=14][b]${h6Text}[/b][/size]`);
        });

        test('should convert links', () => {
            const linkText = faker.lorem.words(2);
            const url = faker.internet.url();
            const autoUrl = faker.internet.url();
            
            expect(converter.convert(`[${linkText}](${url})`))
                .toBe(`[url=${url}]${linkText}[/url]`);
            expect(converter.convert(`<${autoUrl}>`)).toBe(`[url]${autoUrl}[/url]`);
        });

        test('should convert inline code', () => {
            const code = faker.lorem.word();
            expect(converter.convert(`\`${code}\``)).toBe(`[code]${code}[/code]`);
        });

        test('should convert code blocks', () => {
            const jsCode = `console.log("${faker.lorem.word()}");`;
            const plainCode = faker.lorem.words(2);
            
            const jsMarkdown = `\`\`\`javascript\n${jsCode}\n\`\`\``;
            expect(converter.convert(jsMarkdown)).toBe(`[code]${jsCode}[/code]`);
            expect(converter.convert(`\`\`\`\n${plainCode}\n\`\`\``)).toBe(`[code]${plainCode}[/code]`);
        });

        test('should convert images', () => {
            const altText = faker.lorem.words(2);
            const imageUrl = faker.image.url();
            const imageUrl2 = faker.image.url();
            
            expect(converter.convert(`![${altText}](${imageUrl})`)).toBe(`[img]${imageUrl}[/img]`);
            expect(converter.convert(`![](${imageUrl2})`)).toBe(`[img]${imageUrl2}[/img]`);
        });

        test('should convert lists', () => {
            const item1 = faker.lorem.words(2);
            const item2 = faker.lorem.words(3);
            
            expect(converter.convert(`- ${item1}\n- ${item2}`)).toBe(`[list]\n[*] ${item1}\n[*] ${item2}\n[/list]`);
            expect(converter.convert(`* ${item1}\n* ${item2}`)).toBe(`[list]\n[*] ${item1}\n[*] ${item2}\n[/list]`);
            expect(converter.convert(`+ ${item1}\n+ ${item2}`)).toBe(`[list]\n[*] ${item1}\n[*] ${item2}\n[/list]`);
        });

        test('should convert ordered lists to traditional BBCode format', () => {
            const item1 = faker.lorem.words(2);
            const item2 = faker.lorem.words(3);
            const item3 = faker.lorem.words(2);
            
            const markdown = `1. ${item1}\n2. ${item2}\n3. ${item3}`;
            const expected = `[list]\n[*] ${item1}\n[*] ${item2}\n[*] ${item3}\n[/list]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert quotes', () => {
            const quote = faker.lorem.sentence();
            expect(converter.convert(`> ${quote}`)).toBe(`[quote]${quote}[/quote]`);
        });

        test('should convert strikethrough', () => {
            const text = faker.lorem.words(2);
            expect(converter.convert(`~~${text}~~`)).toBe(`[s]${text}[/s]`);
        });
    });

    describe('Converter Class - WorldAnvil format', () => {
        let converter: Converter;
        
        beforeEach(() => {
            converter = new Converter({ format: 'worldanvil' });
        });

        test('should convert headers to WorldAnvil format', () => {
            const h1Text = faker.lorem.words(2);
            const h2Text = faker.lorem.words(3);
            const h3Text = faker.lorem.words(2);
            const h4Text = faker.lorem.words(4);
            const h5Text = faker.lorem.words(2);
            const h6Text = faker.lorem.words(3);
            
            expect(converter.convert(`# ${h1Text}`)).toBe(`[h1]${h1Text}[/h1]`);
            expect(converter.convert(`## ${h2Text}`)).toBe(`[h2]${h2Text}[/h2]`);
            expect(converter.convert(`### ${h3Text}`)).toBe(`[h3]${h3Text}[/h3]`);
            expect(converter.convert(`#### ${h4Text}`)).toBe(`[h4]${h4Text}[/h4]`);
            expect(converter.convert(`##### ${h5Text}`)).toBe(`[h5]${h5Text}[/h5]`);
            expect(converter.convert(`###### ${h6Text}`)).toBe(`[h6]${h6Text}[/h6]`);
        });

        test('should convert images to WorldAnvil format', () => {
            const altText = faker.lorem.words(2);
            const imageName = `${faker.lorem.word()}.jpg`;
            expect(converter.convert(`![${altText}](${imageName})`)).toBe(`[img:${altText}]${imageName}[/img]`);
        });

        test('should convert code blocks with language to WorldAnvil format', () => {
            const jsCode = `console.log("${faker.lorem.word()}");`;
            const plainCode = faker.lorem.words(2);
            
            const jsMarkdown = `\`\`\`javascript\n${jsCode}\n\`\`\``;
            expect(converter.convert(jsMarkdown)).toBe(`[code:javascript]${jsCode}[/code]`);
            expect(converter.convert(`\`\`\`\n${plainCode}\n\`\`\``)).toBe(`[code]${plainCode}[/code]`);
        });

        test('should handle all other formatting the same as traditional BBCode', () => {
            const boldText = faker.lorem.word();
            const italicText = faker.lorem.word();
            const linkText = faker.lorem.word();
            const url = faker.internet.url();
            const code = faker.lorem.word();
            const strikeText = faker.lorem.word();
            
            expect(converter.convert(`**${boldText}**`)).toBe(`[b]${boldText}[/b]`);
            expect(converter.convert(`*${italicText}*`)).toBe(`[i]${italicText}[/i]`);
            expect(converter.convert(`[${linkText}](${url})`)).toBe(`[url=${url}]${linkText}[/url]`);
            expect(converter.convert(`\`${code}\``)).toBe(`[code]${code}[/code]`);
            expect(converter.convert(`~~${strikeText}~~`)).toBe(`[s]${strikeText}[/s]`);
        });

        test('should convert unordered lists to WorldAnvil dash format', () => {
            const item1 = faker.lorem.words(2);
            const subItem = faker.lorem.words(3);
            const item2 = faker.lorem.words(2);
            const subSubItem = faker.lorem.words(2);
            
            const markdown = `- ${item1}\n  - ${subItem}\n- ${item2}\n    - ${subSubItem}`;
            const expected = `- ${item1}\n-- ${subItem}\n- ${item2}\n--- ${subSubItem}`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert complex nested unordered lists to WorldAnvil format', () => {
            const item1 = faker.lorem.words(2);
            const subItem1 = faker.lorem.words(3);
            const item2 = faker.lorem.words(2);
            const subItem2 = faker.lorem.words(2);
            const subSubItem = faker.lorem.words(3);
            const subSubSubItem = faker.lorem.words(2);
            
            const markdown = `- ${item1}\n  - ${subItem1}\n- ${item2}\n  - ${subItem2}\n    - ${subSubItem}\n      - ${subSubSubItem}`;
            const expected = `- ${item1}\n-- ${subItem1}\n- ${item2}\n-- ${subItem2}\n--- ${subSubItem}\n---- ${subSubSubItem}`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert ordered lists to WorldAnvil format', () => {
            const item1 = faker.lorem.words(2);
            const item2 = faker.lorem.words(3);
            const item3 = faker.lorem.words(2);
            
            const markdown = `1. ${item1}\n2. ${item2}\n3. ${item3}`;
            const expected = `[ol]\n  [li]${item1}[/li]\n  [li]${item2}[/li]\n  [li]${item3}[/li]\n[/ol]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should handle mixed unordered and ordered lists in WorldAnvil format', () => {
            const unorderedItem = faker.lorem.words(2);
            const orderedItem1 = faker.lorem.words(3);
            const orderedItem2 = faker.lorem.words(2);
            
            const markdown = `- ${unorderedItem}\n\n1. ${orderedItem1}\n2. ${orderedItem2}`;
            const expected = `- ${unorderedItem}\n\n[ol]\n  [li]${orderedItem1}[/li]\n  [li]${orderedItem2}[/li]\n[/ol]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert underline tags to WorldAnvil format', () => {
            const text = faker.lorem.words(2);
            const markdown = `<ins>${text}</ins>`;
            const result = converter.convert(markdown);
            expect(result).toBe(`[u]${text}[/u]`);
        });

        test('should handle multiple underline tags in WorldAnvil format', () => {
            const text1 = faker.lorem.word();
            const text2 = faker.lorem.word();
            const markdown = `<ins>${text1}</ins> and <ins>${text2}</ins>`;
            const result = converter.convert(markdown);
            expect(result).toBe(`[u]${text1}[/u] and [u]${text2}[/u]`);
        });

        test('should convert underline mixed with other formatting in WorldAnvil format', () => {
            const boldText = faker.lorem.word();
            const underlineText = faker.lorem.word();
            const italicText = faker.lorem.word();
            const markdown = `**${boldText}** with <ins>${underlineText}</ins> and *${italicText}*`;
            const result = converter.convert(markdown);
            expect(result).toBe(`[b]${boldText}[/b] with [u]${underlineText}[/u] and [i]${italicText}[/i]`);
        });
    });

    describe('Converter Class - BBCode vs WorldAnvil underline behavior', () => {
        test('should ignore underline tags in traditional BBCode format', () => {
            const bbcodeConverter = new Converter();
            const text = faker.lorem.words(2);
            const markdown = `<ins>${text}</ins>`;
            const result = bbcodeConverter.convert(markdown);
            expect(result).toBe(markdown); // Should remain unchanged
        });

        test('should convert underline tags in WorldAnvil format', () => {
            const worldanvilConverter = new Converter({ format: 'worldanvil' });
            const text = faker.lorem.words(2);
            const markdown = `<ins>${text}</ins>`;
            const result = worldanvilConverter.convert(markdown);
            expect(result).toBe(`[u]${text}[/u]`);
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
            const boldText = faker.lorem.word();
            const italicText = faker.lorem.word();
            const code = faker.lorem.word();
            
            const markdown = `**${boldText}** and *${italicText}* and \`${code}\``;
            const expected = `[b]${boldText}[/b] and [i]${italicText}[/i] and [code]${code}[/code]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert lists', () => {
            const item1 = faker.lorem.words(2);
            const item2 = faker.lorem.words(3);
            const item3 = faker.lorem.words(2);
            
            const markdown = `- ${item1}\n- ${item2}\n- ${item3}`;
            const expected = `[list]\n[*] ${item1}\n[*] ${item2}\n[*] ${item3}\n[/list]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert quotes', () => {
            const quote1 = faker.lorem.sentence();
            const quote2 = faker.lorem.sentence();
            
            const markdown = `> ${quote1}\n> ${quote2}`;
            const expected = `[quote]${quote1}\n${quote2}[/quote]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should convert strikethrough', () => {
            const text = faker.lorem.words(2);
            expect(converter.convert(`~~${text}~~`)).toBe(`[s]${text}[/s]`);
        });

        test('should handle nested lists', () => {
            const item1 = faker.lorem.words(2);
            const nestedItem = faker.lorem.words(3);
            const item2 = faker.lorem.words(2);
            
            const markdown = `- ${item1}\n  - ${nestedItem}\n- ${item2}`;
            const expected = `[list]\n[*] ${item1}\n  [*] ${nestedItem}\n[*] ${item2}\n[/list]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should handle complex mixed content', () => {
            const headerText = faker.lorem.words(2);
            const boldText = faker.lorem.word();
            const italicText = faker.lorem.word();
            const linkText = faker.lorem.words(2);
            const url = faker.internet.url();
            const code = faker.lorem.word();
            const listItem = faker.lorem.words(3);
            const quote = faker.lorem.sentence();
            
            const markdown = `# ${headerText}
**${boldText}** and *${italicText}*
[${linkText}](${url})
\`${code}\`
- ${listItem}
> ${quote}`;
            const result = converter.convert(markdown);
            expect(result).toContain(`[size=28][b]${headerText}[/b][/size]`);
            expect(result).toContain(`[b]${boldText}[/b]`);
            expect(result).toContain(`[i]${italicText}[/i]`);
            expect(result).toContain(`[url=${url}]${linkText}[/url]`);
            expect(result).toContain(`[code]${code}[/code]`);
            expect(result).toContain('[list]');
            expect(result).toContain(`[*] ${listItem}`);
            expect(result).toContain(`[quote]${quote}[/quote]`);
        });

        test('should preserve image and link order correctly', () => {
            const imageUrl = faker.image.url();
            const linkText = faker.lorem.words(2);
            const url = faker.internet.url();
            
            const markdown = `![image](${imageUrl}) and [${linkText}](${url})`;
            const expected = `[img]${imageUrl}[/img] and [url=${url}]${linkText}[/url]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should handle whitespace correctly', () => {
            const text = faker.lorem.word();
            const markdown = `  **${text}**  `;
            const expected = `[b]${text}[/b]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should handle empty code blocks', () => {
            expect(converter.convert('```\n\n```')).toBe('[code][/code]');
        });

        test('should handle single character formatting', () => {
            const charA = faker.string.alpha(1);
            const charB = faker.string.alpha(1);
            const charC = faker.string.alpha(1);
            
            expect(converter.convert(`**${charA}**`)).toBe(`[b]${charA}[/b]`);
            expect(converter.convert(`*${charB}*`)).toBe(`[i]${charB}[/i]`);
            expect(converter.convert(`\`${charC}\``)).toBe(`[code]${charC}[/code]`);
        });

        test('should handle consecutive quotes', () => {
            const quote1 = faker.lorem.sentence();
            const quote2 = faker.lorem.sentence();
            const quote3 = faker.lorem.sentence();
            
            const markdown = `> ${quote1}\n> ${quote2}\n> ${quote3}`;
            const expected = `[quote]${quote1}\n${quote2}\n${quote3}[/quote]`;
            expect(converter.convert(markdown)).toBe(expected);
        });

        test('should handle auto-links with different protocols', () => {
            const httpsUrl = faker.internet.url({ protocol: 'https' });
            const httpUrl = faker.internet.url({ protocol: 'http' });
            
            expect(converter.convert(`<${httpsUrl}>`)).toBe(`[url]${httpsUrl}[/url]`);
            expect(converter.convert(`<${httpUrl}>`)).toBe(`[url]${httpUrl}[/url]`);
        });
    });

    describe('Converter Strategy Management', () => {
        let converter: Converter;
        
        beforeEach(() => {
            converter = new Converter();
        });

        test('should expose strategies for debugging', () => {
            const strategies = converter.getStrategies();
            
            expect(strategies).toHaveLength(9);
            expect(strategies.some(s => s instanceof StandardHeaderConversionStrategy)).toBeTruthy();
        });

        test('should have both image and link strategies', () => {
            const strategies = converter.getStrategies();
            const imageIndex = strategies.findIndex(s => s instanceof StandardImageConversionStrategy);
            const linkIndex = strategies.findIndex(s => s instanceof LinkConversionStrategy);
            
            expect(imageIndex).toBeGreaterThanOrEqual(0);
            expect(linkIndex).toBeGreaterThanOrEqual(0);
        });

        test('should return a copy of strategies array', () => {
            const strategies1 = converter.getStrategies();
            const strategies2 = converter.getStrategies();
            
            expect(strategies1).not.toBe(strategies2); // Different array instances
            expect(strategies1).toEqual(strategies2); // Same content
        });

        test('should have all expected strategies', () => {
            const strategies = converter.getStrategies();
            const strategyTypes = strategies.map(s => s.constructor.name);
            
            expect(strategyTypes).toContain('StandardHeaderConversionStrategy');
            expect(strategyTypes).toContain('EmphasisConversionStrategy');
            expect(strategyTypes).toContain('ImageConversionStrategy');
            expect(strategyTypes).toContain('LinkConversionStrategy');
            expect(strategyTypes).toContain('CodeConversionStrategy');
            expect(strategyTypes).toContain('StandardListConversionStrategy');
            expect(strategyTypes).toContain('QuoteConversionStrategy');
            expect(strategyTypes).toContain('StrikethroughConversionStrategy');
        });

        test('should ensure image strategy runs before link strategy', () => {
            const strategies = converter.getStrategies();
            const imageIndex = strategies.findIndex(s => s instanceof StandardImageConversionStrategy);
            const linkIndex = strategies.findIndex(s => s instanceof LinkConversionStrategy);
            
            expect(imageIndex).toBeGreaterThanOrEqual(0);
            expect(linkIndex).toBeGreaterThanOrEqual(0);
            expect(imageIndex).toBeLessThan(linkIndex);
        });
    });

    describe('Converter Strategy Management - WorldAnvil', () => {
        let converter: Converter;
        
        beforeEach(() => {
            converter = new Converter({ format: 'worldanvil' });
        });

        test('should have all expected strategies for WorldAnvil format', () => {
            const strategies = converter.getStrategies();
            const strategyTypes = strategies.map(s => s.constructor.name);
            
            expect(strategyTypes).toContain('WorldAnvilHeaderConversionStrategy');
            expect(strategyTypes).toContain('EmphasisConversionStrategy');
            expect(strategyTypes).toContain('ImageConversionStrategy');
            expect(strategyTypes).toContain('LinkConversionStrategy');
            expect(strategyTypes).toContain('CodeConversionStrategy');
            expect(strategyTypes).toContain('WorldAnvilListConversionStrategy');
            expect(strategyTypes).toContain('TableConversionStrategy');
            expect(strategyTypes).toContain('QuoteConversionStrategy');
            expect(strategyTypes).toContain('StrikethroughConversionStrategy');
        });

        test('should ensure image strategy runs before link strategy in WorldAnvil format', () => {
            const strategies = converter.getStrategies();
            const imageIndex = strategies.findIndex(s => s instanceof WorldAnvilImageConversionStrategy);
            const linkIndex = strategies.findIndex(s => s instanceof LinkConversionStrategy);
            
            expect(imageIndex).toBeGreaterThanOrEqual(0);
            expect(linkIndex).toBeGreaterThanOrEqual(0);
            expect(imageIndex).toBeLessThan(linkIndex);
        });
    });

    describe('Table Conversion', () => {
        test('should convert markdown tables to BBCode format', () => {
            const converter = new Converter();
            const markdown = `| Name | Age | City |
|------|-----|------|
| John | 25  | NYC  |
| Jane | 30  | LA   |`;

            const result = converter.convert(markdown);
            
            expect(result).toContain('[table]');
            expect(result).toContain('[tr]');
            expect(result).toContain('[th]Name[/th]');
            expect(result).toContain('[td]John[/td]');
            expect(result).toContain('[/table]');
        });

        test('should convert markdown tables to WorldAnvil format', () => {
            const converter = new Converter({ format: 'worldanvil' });
            const markdown = `| Feature | Status |
|---------|--------|
| Tables  | Done   |`;

            const result = converter.convert(markdown);
            
            expect(result).toContain('[table]');
            expect(result).toContain('[th]Feature[/th]');
            expect(result).toContain('[td]Tables[/td]');
            expect(result).toContain('[/table]');
        });

        test('should preserve formatting within table cells', () => {
            const converter = new Converter();
            const markdown = `| **Bold** | *Italic* | \`Code\` |
|----------|----------|---------|
| Normal   | Text     | Here    |`;

            const result = converter.convert(markdown);
            
            expect(result).toContain('[th][b]Bold[/b][/th]');
            expect(result).toContain('[th][i]Italic[/i][/th]');
            expect(result).toContain('[th][code]Code[/code][/th]');
        });
    });
});
