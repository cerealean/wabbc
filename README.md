# Markdown BBCode Converter

A Node.js library written in TypeScript for converting GitHub-flavored Markdown to BBCode or WorldAnvil BBCode.

## Features

- Convert GitHub-flavored Markdown to traditional BBCode
- Convert GitHub-flavored Markdown to WorldAnvil BBCode format
- Support for headers, emphasis, links, images, code blocks, lists, quotes, and more
- Written in TypeScript with full type safety
- Comprehensive error handling
- Full test coverage

## Installation

```bash
npm install markdown-bbcode-converter
```

## Usage

### JavaScript/Node.js
```javascript
const { convertMarkdownToBBCode } = require('markdown-bbcode-converter');

// Convert to traditional BBCode
const bbcode = convertMarkdownToBBCode('**Bold text** and *italic text*');
console.log(bbcode); // [b]Bold text[/b] and [i]italic text[/i]

// Convert to WorldAnvil BBCode
const worldAnvilCode = convertMarkdownToBBCode('# Header', { format: 'worldanvil' });
console.log(worldAnvilCode); // [h1]Header[/h1]
```

### TypeScript
```typescript
import { convertMarkdownToBBCode, ConversionOptions } from 'markdown-bbcode-converter';

// Convert to traditional BBCode
const bbcode: string = convertMarkdownToBBCode('**Bold text** and *italic text*');
console.log(bbcode); // [b]Bold text[/b] and [i]italic text[/i]

// Convert to WorldAnvil BBCode
const options: ConversionOptions = { format: 'worldanvil' };
const worldAnvilCode: string = convertMarkdownToBBCode('# Header', options);
console.log(worldAnvilCode); // [h1]Header[/h1]
```

## API

### `convertMarkdownToBBCode(markdown, options)`

Converts markdown text to BBCode format.

#### Parameters

- `markdown` (string): The markdown text to convert
- `options` (ConversionOptions, optional): Conversion options
  - `format` ('bbcode' | 'worldanvil'): Either 'bbcode' (default) for traditional BBCode or 'worldanvil' for WorldAnvil BBCode

#### Returns

- (string): The converted BBCode text

#### Throws

- Error if markdown input is not a string
- Error if format is not 'bbcode' or 'worldanvil'

## Type Definitions

```typescript
interface ConversionOptions {
  format?: 'bbcode' | 'worldanvil';
}
```

## Supported Conversions

### Headers
- Markdown: `# Header 1` → BBCode: `[size=28][b]Header 1[/b][/size]`
- Markdown: `# Header 1` → WorldAnvil: `[h1]Header 1[/h1]`

### Emphasis
- Markdown: `**bold**` → BBCode: `[b]bold[/b]`
- Markdown: `*italic*` → BBCode: `[i]italic[/i]`

### Links
- Markdown: `[text](url)` → BBCode: `[url=url]text[/url]`

### Images
- Markdown: `![alt](url)` → BBCode: `[img]url[/img]`
- Markdown: `![alt](url)` → WorldAnvil: `[img:alt]url[/img]`

### Code
- Markdown: `` `code` `` → BBCode: `[code]code[/code]`
- Markdown: ````javascript\ncode\n```` → BBCode: `[code]code[/code]`
- Markdown: ````javascript\ncode\n```` → WorldAnvil: `[code:javascript]code[/code]`

### Lists
- Markdown: `- item` → BBCode: `[list]\n[*] item\n[/list]`

### Quotes
- Markdown: `> quote` → BBCode: `[quote]quote[/quote]`

### Strikethrough
- Markdown: `~~text~~` → BBCode: `[s]text[/s]`

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
