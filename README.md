# Markdown WorldAnvil BBCode Converter

A Node.js library written in TypeScript for converting GitHub-flavored Markdown to WorldAnvil BBCode format.

## Features

- Convert GitHub-flavored Markdown to WorldAnvil BBCode format
- Support for headers, emphasis, links, images, code blocks, lists, quotes, and more
- WorldAnvil-specific features like dice notation, subscript, superscript, underline, and horizontal rules
- Written in TypeScript with full type safety
- Comprehensive error handling
- Full test coverage
- Clean class-based API for better performance and reusability

## Installation

```bash
npm install markdown-bbcode-converter
```

## Usage

### JavaScript/Node.js
```javascript
const { Converter } = require('markdown-bbcode-converter');

// Create converter instance
const converter = new Converter();

// Convert to WorldAnvil BBCode
const worldAnvilCode = converter.convert('**Bold text** and *italic text*');
console.log(worldAnvilCode); // [b]Bold text[/b] and [i]italic text[/i]

// WorldAnvil-specific features
const specialCode = converter.convert('# Header\n\nText with ^superscript^ and ~subscript~.');
console.log(specialCode); // [h1]Header[/h1]\n\nText with [sup]superscript[/sup] and [sub]subscript[/sub].
```

### TypeScript
```typescript
import { Converter, ConversionOptions } from 'markdown-bbcode-converter';

// Create converter instance
const converter = new Converter();

// Convert to WorldAnvil BBCode
const worldAnvilCode: string = converter.convert('**Bold text** and *italic text*');
console.log(worldAnvilCode); // [b]Bold text[/b] and [i]italic text[/i]
```

## API

### `new Converter(options?)`

Creates a new converter instance for WorldAnvil BBCode conversion.

**Parameters:**
- `options` (ConversionOptions, optional): Reserved for future options

**Example:**
```typescript
const converter = new Converter();
```

### `converter.convert(markdown)`

Converts markdown text to WorldAnvil BBCode format.

**Parameters:**
- `markdown` (string): The markdown text to convert

**Returns:** string - The converted WorldAnvil BBCode text

**Throws:** Error if markdown input is not a string

**Example:**
```typescript
const converter = new Converter();
const result = converter.convert('**Bold text**');
// Returns: '[b]Bold text[/b]'
```

## Type Definitions

```typescript
interface ConversionOptions {
  // Reserved for future options
}
```

## Supported WorldAnvil BBCode Conversions

### Text Formatting
- **Bold**: `**text**` or `__text__` → `[b]text[/b]`
- **Italic**: `*text*` or `_text_` → `[i]text[/i]`
- **Strikethrough**: `~~text~~` → `[s]text[/s]`
- **Underline**: `[u]text[/u]` → `[u]text[/u]` (preserved)

### Headers
- `# Header` → `[h1]Header[/h1]`
- `## Header` → `[h2]Header[/h2]`
- `### Header` → `[h3]Header[/h3]`
- `#### Header` → `[h4]Header[/h4]`
- `##### Header` → `[h5]Header[/h5]`
- `###### Header` → `[h6]Header[/h6]`

### Links and Images
- **Links**: `[text](url)` → `[url=url]text[/url]`
- **Images**: `![alt](url)` → `[img:alt]url[/img]`

### Code
- **Inline code**: `` `code` `` → `[code]code[/code]`
- **Code blocks**: ````javascript\ncode\n```` → `[code:javascript]code[/code]`

### Lists
- **Unordered**: `- item` → `[list]\n[*] item\n[/list]`
- **Ordered**: `1. item` → `[olist]\n[*] item\n[/olist]`
- **Checklists**: `- [x] done` → `[*] ✓ done`

### Quotes
- `> quote` → `[quote]quote[/quote]`

### WorldAnvil-Specific Features
- **Horizontal rules**: `---` or `***` → `[hr]`
- **Superscript**: `^text^` → `[sup]text[/sup]`
- **Subscript**: `~text~` → `[sub]text[/sub]`
- **Dice notation**: `[1d20]` → `[1d20]` (preserved)
- **Line breaks**: Multiple newlines preserved
- **Tables**: Basic markdown tables → WorldAnvil table format

## Development

### Installation

```bash
git clone <repository>
cd markdown-bbcode-converter
npm install
```

### Building

```bash
# Build the TypeScript source
npm run build

# Build and watch for changes
npm run build:watch

# Clean build artifacts
npm run clean
```

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Example Usage

```bash
# Run the example (builds first)
npm run example
```

### Project Structure

```
src/
  ├── index.ts          # Main converter implementation
  ├── main.ts           # Library entry point
  └── example.ts        # Example usage
tests/
  └── index.test.ts     # Test suite
dist/                   # Built JavaScript output (generated)
  ├── index.js
  ├── index.d.ts
  ├── main.js
  ├── main.d.ts
  └── example.js
```

## License

ISC

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes following conventional commit format (see below)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Format

This project uses [Conventional Commits](https://conventionalcommits.org/) specification. All commit messages must follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting previous commits

**Examples:**
```
feat: add support for table conversion
fix: resolve image parsing issue in worldanvil format
docs: update API documentation
test: add tests for strikethrough conversion
```

The commit message will be automatically validated using commitlint before each commit.
