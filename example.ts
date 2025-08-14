import { Converter } from './src/main';

const converter = new Converter();

const markdown = `# Main Header

This is a **bold** text and this is *italic* text.

## Subheader

Here's a [link](https://example.com) and an image:

![Alt text](image.jpg)

### Code Example

\`\`\`javascript
console.log("Hello World!");
\`\`\`

Inline \`code\` is also supported.

> This is a quote
> with multiple lines

- List item 1
- List item 2
  - Nested item
  - Another nested item

1. Numbered list
2. Second item
   1. Nested numbered
   2. Another nested

~~Strikethrough text~~

Rolling for damage: [[d20+5]]

Some ^superscript^ and ~subscript~ text.

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`;

console.log('=== WorldAnvil BBCode Conversion ===');
console.log(converter.convert(markdown));
