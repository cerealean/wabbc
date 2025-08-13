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
- Comprehensive error handling and test coverage

## Usage
```javascript
const { Converter } = require('markdown-bbcode-converter');

// Create converter instances
const bbcodeConverter = new Converter();
const worldAnvilConverter = new Converter({ format: 'worldanvil' });

// Convert text
const bbcode = bbcodeConverter.convert('**Bold text**');
const worldAnvil = worldAnvilConverter.convert('# Header');
```

## Development
- Run tests: `npm test`
- Run example: `npm run example`
- All tests passing, project ready for use

## Development Guidelines

**Always:**
- Commit your work (see below instructions)
- Write or update tests related to your work (see below instructions)
- Avoid barrel imports (index.ts files) - import directly from source files

### Committing Work
- **Always commit your work**
  - Frequently
    - Multiple smaller commits relating to the same changes are better than 1 large commit
  - At the end of making changes to ensure version control integrity
- Use conventional commit messages following the established commitlint configuration
- No need to run lint or tests before committing because the precommit hooks will run those tasks automatically

### Writing Tests
- Write tests for all new features and bug fixes
- Follow the established testing patterns and conventions
- Use descriptive test names to clearly convey the purpose of each test
- Use Faker, when applicable, to make tests more thorough and comprehensive
