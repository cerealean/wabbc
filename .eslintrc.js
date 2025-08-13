module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    // Allow any type for now since this is a library conversion
    '@typescript-eslint/no-explicit-any': 'off',
    // Allow non-null assertion operator
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Allow empty interfaces
    '@typescript-eslint/no-empty-interface': 'off',
    // Allow unused vars that start with underscore
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    // Disable some rules that might cause issues with TypeScript
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
};
