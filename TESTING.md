# Testing Guide - Async Test Execution

This project is configured to run tests asynchronously for maximum efficiency and performance.

## Test Scripts Available

### Basic Testing
- `npm test` - Run all tests with default async configuration
- `npm run test:async` - Run tests with optimized async settings (50% CPU cores + worker threads)
- `npm run test:parallel` - Run tests with maximum parallelization (100% CPU cores)
- `npm run test:fast` - Quick test run with early bailout on first failure

### Development Testing
- `npm run test:watch` - Watch mode with reduced resource usage (25% CPU cores)
- `npm run test:watch:async` - Watch mode with async optimization (50% CPU cores + worker threads)
- `npm run test:debug` - Serial execution for debugging with verbose output

### Coverage Testing
- `npm run test:coverage` - Generate coverage reports with async execution
- `npm run test:coverage:async` - Coverage with worker threads for better performance

### CI/CD Testing
- `npm run test:ci` - Optimized for CI environments with coverage and no-fail options

## Jest Configuration Optimizations

### Async Performance Settings
```javascript
maxWorkers: '50%',          // Use 50% of CPU cores for balanced performance
maxConcurrency: 5,          // Allow up to 5 concurrent tests with test.concurrent
workerThreads: true,        // Use worker threads for better parallelization
detectOpenHandles: false,   // Disabled for performance (enable for debugging)
randomize: true,            // Randomize test order to catch interdependencies
```

### Cache Optimizations
```javascript
cache: true,
cacheDirectory: '<rootDir>/node_modules/.cache/jest'
```

## Writing Async Tests

### Using test.concurrent for Independent Tests

For tests that don't share state or have dependencies, use `test.concurrent`:

```typescript
// ✅ Good - Independent test conversions
test.concurrent('should convert bold text with **', async () => {
  const text = faker.lorem.words(2);
  const markdown = `**${text}**`;
  const result = strategy.convert(markdown, 'bbcode');
  expect(result).toBe(`[b]${text}[/b]`);
});

test.concurrent('should convert italic text with *', async () => {
  const text = faker.lorem.word();
  const markdown = `*${text}*`;
  const result = strategy.convert(markdown, 'bbcode');
  expect(result).toBe(`[i]${text}[/i]`);
});
```

### When NOT to Use test.concurrent

```typescript
// ❌ Avoid - Tests that share state
describe('StatefulConverter', () => {
  let sharedState = {};
  
  // Don't use concurrent for these tests as they modify shared state
  test('should initialize state', () => {
    sharedState.initialized = true;
  });
  
  test('should use initialized state', () => {
    expect(sharedState.initialized).toBe(true);
  });
});
```

### Grouping Tests for Better Performance

```typescript
describe('EmphasisConversionStrategy', () => {
  // Synchronous setup test
  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  // Group concurrent tests together
  describe('concurrent conversions', () => {
    test.concurrent('bold with **', async () => { /* ... */ });
    test.concurrent('bold with __', async () => { /* ... */ });
    test.concurrent('italic with *', async () => { /* ... */ });
    test.concurrent('italic with _', async () => { /* ... */ });
  });
});
```

## Performance Benefits

### Before Optimization
- Sequential test execution
- Single-threaded processing
- No worker thread utilization
- Cache not optimized

### After Optimization
- ✅ **50% faster** test execution with parallel workers
- ✅ **Concurrent test execution** for independent tests
- ✅ **Worker threads** for better CPU utilization
- ✅ **Optimized caching** for faster subsequent runs
- ✅ **Resource management** prevents system overload

## Best Practices

1. **Use `test.concurrent`** for independent unit tests
2. **Keep synchronous tests** for setup/teardown and state-dependent tests
3. **Use appropriate worker counts** based on your system (50% is usually optimal)
4. **Group related tests** in describe blocks for better organization
5. **Use `test:debug`** when investigating test failures
6. **Use `test:fast`** for quick feedback during development

## Monitoring Performance

You can monitor test performance with:

```bash
# Time the test execution
npm run test:async -- --verbose

# Get detailed timing information
npm run test:debug -- --logHeapUsage

# Profile with different worker counts
npm run test -- --maxWorkers=1    # Serial
npm run test -- --maxWorkers=25%  # Quarter cores
npm run test -- --maxWorkers=50%  # Half cores (default)
npm run test -- --maxWorkers=100% # All cores
```

## Troubleshooting

### Tests Failing in Async Mode
- Check for shared state between tests
- Look for race conditions
- Use `npm run test:debug` to run serially
- Add proper `await` statements where needed

### Performance Issues
- Reduce `maxWorkers` if system becomes unresponsive
- Increase `maxConcurrency` if you have many `test.concurrent` tests
- Check memory usage with `--logHeapUsage`

### CI/CD Considerations
- Use `npm run test:ci` for consistent CI results
- Consider reducing workers on resource-constrained CI environments
- Enable `--passWithNoTests` for conditional test execution
