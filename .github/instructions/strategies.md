---
applyTo: "src/strategies/**/*-strategy.ts"
---

# Strategy Development Instructions

When working with conversion strategies in the `src/strategies` directory:

## File Organization

1. **Format-specific strategies**: If WorldAnvil and typical BBCode conversion logic differs, place strategy files in the respective subdirectories:
   - `src/strategies/standard/` - for traditional BBCode format strategies
   - `src/strategies/worldanvil/` - for WorldAnvil-specific format strategies

2. **Shared strategies**: If the strategy doesn't differ between WorldAnvil and BBCode formats, a single file may be placed directly in the `src/strategies/` directory.

## Implementation Guidelines

- All strategies must implement the `ConversionStrategy` interface
- Use sequential priority numbers (1-10 currently assigned)
- Format-specific strategies should have format-specific class names:
  - `StandardExampleConversionStrategy` for standard BBCode
  - `WorldAnvilExampleConversionStrategy` for WorldAnvil format
- Shared strategies use generic names: `ExampleConversionStrategy`

## Examples

- **Format-specific**: Headers and Lists (different output formats)
- **Shared**: Emphasis, Images, Links, Code, Quotes, Strikethrough (same output)

## Testing

- Create corresponding test files in `tests/strategies/standard/` or `tests/strategies/worldanvil/` for format-specific strategies
- Create test files in `tests/strategies/` for shared strategies
- Update `tests/strategies/strategy-interface.test.ts` when adding new strategies
- Update `src/strategy-chain-factory.ts` to include new strategies in the appropriate format chains
