# Contributing to Markdown BBCode Converter

Thank you for your interest in contributing to this project! Here are some guidelines to help you get started.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run tests: `npm test`
5. Run example: `npm run example`

## TypeScript Development

This project is written in TypeScript. Here are the key commands:

- `npm run build` - Compile TypeScript to JavaScript
- `npm run build:watch` - Compile and watch for changes
- `npm run clean` - Remove build artifacts
- `npm test` - Run tests (builds automatically)
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Code Style

- Use TypeScript for all source code
- Follow existing code patterns and type annotations
- Write tests for new features
- Ensure all tests pass before submitting
- Use ESLint for code formatting

## Commit Guidelines

This project uses [Conventional Commits](https://conventionalcommits.org/). Your commit messages must follow this format:

```
<type>(<scope>): <description>
```

### Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

### Examples

```bash
git commit -m "feat: add support for table conversion"
git commit -m "fix: resolve image parsing issue in worldanvil format"
git commit -m "docs: update API documentation"
git commit -m "test: add tests for strikethrough conversion"
```

## Pre-commit Hooks

The project has pre-commit hooks that will:
1. Build the TypeScript project
2. Run all tests
3. Validate commit message format

If any step fails, the commit will be rejected.

## Testing

- Write unit tests for all new features
- Ensure existing tests continue to pass
- Test both BBCode and WorldAnvil formats
- Include edge cases in your tests

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass
4. Update documentation if needed
5. Submit a pull request with a clear description

## Questions?

Feel free to open an issue if you have any questions about contributing!
