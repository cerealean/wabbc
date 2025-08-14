module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/example.ts',  // Exclude example file from coverage
    '!src/index.ts',    // Exclude duplicate implementation
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  // Async/performance optimizations
  maxWorkers: '50%',          // Use 50% of available CPU cores for better resource management
  maxConcurrency: 5,          // Allow up to 5 concurrent tests when using test.concurrent
  workerThreads: true,        // Use worker threads for better parallelization
  detectOpenHandles: false,   // Disable for better performance (enable only for debugging)
  randomize: true,            // Randomize test order to catch interdependencies
  verbose: false,             // Reduce output for cleaner async execution
  // Cache optimizations
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest'
};
