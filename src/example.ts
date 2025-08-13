import { Converter } from './main';

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

console.log('--- Traditional BBCode ---');
console.log(bbcodeConverter.convert(markdown));

console.log('\n--- WorldAnvil BBCode ---');
console.log(worldAnvilConverter.convert(markdown));
