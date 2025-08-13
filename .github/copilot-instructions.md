<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements
	<!-- Project: Node.js/JavaScript library for converting GitHub-flavored Markdown to BBCode/WorldAnvil BBCode -->

- [x] Scaffold the Project
	<!-- Node.js library structure created with src/, tests/, package.json, README.md, and example files -->

- [x] Customize the Project
	<!-- Implemented full markdown to BBCode converter with support for both traditional BBCode and WorldAnvil format, including comprehensive test suite -->

- [x] Install Required Extensions
	<!-- No extensions specified -->

- [x] Compile the Project
	<!-- Dependencies installed successfully, all tests passing -->

- [x] Create and Run Task
	<!-- No additional tasks needed for this library project -->

- [x] Launch the Project
	<!-- Library project complete - no launch needed -->

- [x] Ensure Documentation is Complete
	<!-- README.md, CONTRIBUTING.md, and copilot-instructions.md files exist with current project information. Git configuration with commitlint and pre-commit hooks added. -->

## Project Overview

This is a Node.js library for converting GitHub-flavored Markdown to BBCode or WorldAnvil BBCode format.

## Key Features
- Class-based API with `Converter` class for better performance and reusability
- Converts GitHub-flavored Markdown to traditional BBCode
- Converts GitHub-flavored Markdown to WorldAnvil BBCode format  
- Supports headers, emphasis, links, images, code blocks, lists, quotes, strikethrough
- Backward compatibility with function-based API
- Comprehensive error handling and test coverage

## Usage
### Class-based API (Recommended)
```javascript
const { Converter } = require('markdown-bbcode-converter');

// Create converter instances
const bbcodeConverter = new Converter();
const worldAnvilConverter = new Converter({ format: 'worldanvil' });

// Convert text
const bbcode = bbcodeConverter.convert('**Bold text**');
const worldAnvil = worldAnvilConverter.convert('# Header');
```

### Function-based API (Backward Compatibility)
```javascript
const { convertMarkdownToBBCode } = require('markdown-bbcode-converter');

// Traditional BBCode
const bbcode = convertMarkdownToBBCode('**Bold text**');

// WorldAnvil BBCode
const worldAnvil = convertMarkdownToBBCode('# Header', { format: 'worldanvil' });
```

## Development
- Run tests: `npm test`
- Run example: `npm run example`
- All tests passing, project ready for use
