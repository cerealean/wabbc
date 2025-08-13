import { Converter, convertMarkdownToBBCode, ConversionOptions } from './main';

// Example markdown
const markdown = `
# Main Header

This is **bold text** and this is *italic text*.

Here's a [link](https://example.com) and an image:
![Alt text](https://example.com/image.jpg)

## Code Example

\`\`\`javascript
console.log("Hello, world!");
\`\`\`

- List item 1
- List item 2
- List item 3

> This is a quote
> that spans multiple lines

~~Strikethrough text~~
`;

console.log('=== CLASS-BASED APPROACH ===');

// Create converters for each format
const bbcodeConverter = new Converter();
const worldAnvilConverter = new Converter({ format: 'worldanvil' });

console.log('--- Traditional BBCode (Class) ---');
console.log(bbcodeConverter.convert(markdown));

console.log('\n--- WorldAnvil BBCode (Class) ---');
console.log(worldAnvilConverter.convert(markdown));

console.log('\n=== BACKWARD COMPATIBLE FUNCTIONS ===');

console.log('--- Traditional BBCode (Function) ---');
console.log(convertMarkdownToBBCode(markdown));

console.log('\n--- WorldAnvil BBCode (Function) ---');
const worldAnvilOptions: ConversionOptions = { format: 'worldanvil' };
console.log(convertMarkdownToBBCode(markdown, worldAnvilOptions));
