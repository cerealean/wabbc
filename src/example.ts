/**
 * Example usage of the Markdown to WorldAnvil BBCode Converter
 */

import { Converter } from './converter';

// Create a converter instance
const converter = new Converter();

// Example markdown content
const markdown = `# Welcome to WorldAnvil

This is a **bold statement** with *italic text* and ~~strikethrough~~.

Here's a [link](https://worldanvil.com) to WorldAnvil.

## Lists

- First item
- Second item
  - Nested item
  - Another nested item

1. Numbered item
2. Another numbered item

## Code

Here's some \`inline code\` and a code block:

\`\`\`typescript
const message = "Hello, World!";
console.log(message);
\`\`\`

## WorldAnvil Features

- [x] Task completed
- [ ] Task pending

---

### Special WorldAnvil Features

Text with ^superscript^ and ~subscript~.

Some text with [u]underlined[/u] content.

Rolling dice: [1d20] for a random result.

Multiple line breaks:


Will be preserved.
`;

console.log('Original Markdown:');
console.log('==================');
console.log(markdown);
console.log();

console.log('Converted WorldAnvil BBCode:');
console.log('============================');
const result = converter.convert(markdown);
console.log(result);
