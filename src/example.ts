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

### Unordered Lists
- List item 1
  - Nested item 1
  - Nested item 2
    - Sub-nested item
- List item 2
- List item 3

### Ordered Lists
1. First item
2. Second item
3. Third item

### Checklists
- [ ] Unchecked item
- [x] Checked item
- [X] Another checked item
  - [ ] Nested unchecked
  - [x] Nested checked

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
