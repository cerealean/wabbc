const { Converter } = require('./dist/main.js');

console.log('Testing WorldAnvil List Conversion\n');

const converter = new Converter({ format: 'worldanvil' });

// Test unordered lists with nesting
const unorderedTest = `- I am a bullet
  - I am a sub-bullet
- I am another bullet
  - I am another sub bullet
    - I am a sub-sub bullet
      - I am a sub-sub-sub bullet`;

console.log('=== Unordered List Test ===');
console.log('Input:');
console.log(unorderedTest);
console.log('\nOutput:');
console.log(converter.convert(unorderedTest));

// Test ordered lists
const orderedTest = `1. First item
2. Second item
3. Third item`;

console.log('\n=== Ordered List Test ===');
console.log('Input:');
console.log(orderedTest);
console.log('\nOutput:');
console.log(converter.convert(orderedTest));

// Test mixed lists
const mixedTest = `- Unordered item
  - Nested unordered

1. First ordered
2. Second ordered

- Another unordered`;

console.log('\n=== Mixed List Test ===');
console.log('Input:');
console.log(mixedTest);
console.log('\nOutput:');
console.log(converter.convert(mixedTest));
