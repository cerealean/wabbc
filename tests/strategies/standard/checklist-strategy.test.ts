import { faker } from '@faker-js/faker';
import { StandardChecklistConversionStrategy } from '../../../src/strategies/standard/checklist-strategy';

describe('StandardChecklistConversionStrategy', () => {
  const strategy = new StandardChecklistConversionStrategy();

  test('should have dependencies to run before list strategies', () => {
    expect(strategy.runBefore).toBeDefined();
    expect(strategy.runBefore).toHaveLength(1);
    expect(strategy.runBefore.map(s => s.name)).toContain('StandardListConversionStrategy');
  });

  test('should convert unchecked checklist items to [ ] format', () => {
    const item = faker.lorem.words(3);
    const markdown = `- [ ] ${item}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`- [ ] ${item}`);
  });

  test('should convert checked checklist items (lowercase x) to [X] format', () => {
    const item = faker.lorem.words(3);
    const markdown = `- [x] ${item}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`- [X] ${item}`);
  });

  test('should convert checked checklist items (uppercase X) to [X] format', () => {
    const item = faker.lorem.words(3);
    const markdown = `- [X] ${item}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`- [X] ${item}`);
  });

  test('should handle different list markers', () => {
    const item = faker.lorem.words(2);
    
    expect(strategy.convert(`- [ ] ${item}`)).toBe(`- [ ] ${item}`);
    expect(strategy.convert(`* [ ] ${item}`)).toBe(`- [ ] ${item}`);
    expect(strategy.convert(`+ [ ] ${item}`)).toBe(`- [ ] ${item}`);
    expect(strategy.convert(`- [x] ${item}`)).toBe(`- [X] ${item}`);
    expect(strategy.convert(`* [x] ${item}`)).toBe(`- [X] ${item}`);
    expect(strategy.convert(`+ [x] ${item}`)).toBe(`- [X] ${item}`);
  });

  test('should handle nested checklist items with indentation', () => {
    const item1 = faker.lorem.words(2);
    const nestedItem = faker.lorem.words(3);
    const item2 = faker.lorem.words(2);
    
    const markdown = `- [ ] ${item1}\n  - [x] ${nestedItem}\n- [X] ${item2}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`- [ ] ${item1}\n  - [X] ${nestedItem}\n- [X] ${item2}`);
  });

  test('should handle mixed checklist items', () => {
    const unchecked = faker.lorem.words(2);
    const checkedLower = faker.lorem.words(3);
    const checkedUpper = faker.lorem.words(2);
    
    const markdown = `- [ ] ${unchecked}\n- [x] ${checkedLower}\n- [X] ${checkedUpper}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`- [ ] ${unchecked}\n- [X] ${checkedLower}\n- [X] ${checkedUpper}`);
  });

  test('should handle empty checkboxes with extra spaces', () => {
    const item = faker.lorem.words(2);
    const markdown = `- [  ] ${item}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`- [ ] ${item}`);
  });

  test('should not affect regular list items', () => {
    const item = faker.lorem.words(3);
    const markdown = `- ${item}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`- ${item}`);
  });

  test('should not affect text that looks like checkboxes but is not in list format', () => {
    const text = `This has [x] and [ ] but is not a list`;
    const result = strategy.convert(text);
    expect(result).toBe(text);
  });

  test('should work with worldanvil format parameter', () => {
    const item = faker.lorem.words(2);
    const markdown = `- [x] ${item}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`- [X] ${item}`);
  });
});
