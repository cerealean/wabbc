import { Converter } from './main';

// Test superscript conversion
console.log('=== SUPERSCRIPT CONVERSION TESTS ===');

const testCases = [
    'Simple superscript: x<sup>2</sup>',
    'Einstein: E = mc<sup>2</sup>',
    'Multiple: x<sup>2</sup> + y<sup>3</sup>',
    'With text: H<sup>2</sup>O is water',
    'Empty: <sup></sup>',
    'Complex: x<sup>2y+1</sup>',
    'Mixed case: <SUP>should not convert</SUP>'
];

const bbcodeConverter = new Converter();
const worldAnvilConverter = new Converter({ format: 'worldanvil' });

for (const testCase of testCases) {
    console.log(`\nInput: ${testCase}`);
    console.log(`BBCode: ${bbcodeConverter.convert(testCase)}`);
    console.log(`WorldAnvil: ${worldAnvilConverter.convert(testCase)}`);
}

// Original example markdown with superscript
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

> This is a quote
> that spans multiple lines

~~Strikethrough text~~

Testing superscript: x<sup>2</sup> + y<sup>3</sup> = z<sup>5</sup>
`;

console.log('\n=== EXAMPLE WITH SUPERSCRIPT ===');

console.log('--- Traditional BBCode ---');
console.log(bbcodeConverter.convert(markdown));

console.log('\n--- WorldAnvil BBCode ---');
console.log(worldAnvilConverter.convert(markdown));
