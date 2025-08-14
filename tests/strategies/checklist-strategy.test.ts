import { faker } from '@faker-js/faker';
import { ChecklistConversionStrategy } from '../../src/strategies/checklist-strategy';

describe('ChecklistConversionStrategy', () => {
  const strategy = new ChecklistConversionStrategy();

  test('should have dependencies to run before list strategies', () => {
    expect(strategy.runBefore).toBeDefined();
    expect(strategy.runBefore).toHaveLength(2);
    expect(strategy.runBefore.map(s => s.name)).toContain('StandardListConversionStrategy');
    expect(strategy.runBefore.map(s => s.name)).toContain('WorldAnvilListConversionStrategy');
  });

  describe('Standard BBCode format', () => {
    test('should convert unchecked checklist items to [ ] format', () => {
      const item = faker.lorem.words(3);
      const markdown = `- [ ] ${item}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`- [ ] ${item}`);
    });

    test('should convert checked checklist items (lowercase x) to [X] format', () => {
      const item = faker.lorem.words(3);
      const markdown = `- [x] ${item}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`- [X] ${item}`);
    });

    test('should convert checked checklist items (uppercase X) to [X] format', () => {
      const item = faker.lorem.words(3);
      const markdown = `- [X] ${item}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`- [X] ${item}`);
    });

    test('should handle different list markers', () => {
      const item = faker.lorem.words(2);
      
      expect(strategy.convert(`- [ ] ${item}`, 'bbcode')).toBe(`- [ ] ${item}`);
      expect(strategy.convert(`* [ ] ${item}`, 'bbcode')).toBe(`- [ ] ${item}`);
      expect(strategy.convert(`+ [ ] ${item}`, 'bbcode')).toBe(`- [ ] ${item}`);
      expect(strategy.convert(`- [x] ${item}`, 'bbcode')).toBe(`- [X] ${item}`);
      expect(strategy.convert(`* [x] ${item}`, 'bbcode')).toBe(`- [X] ${item}`);
      expect(strategy.convert(`+ [x] ${item}`, 'bbcode')).toBe(`- [X] ${item}`);
    });

    test('should handle nested checklist items with indentation', () => {
      const item1 = faker.lorem.words(2);
      const nestedItem = faker.lorem.words(3);
      const item2 = faker.lorem.words(2);
      
      const markdown = `- [ ] ${item1}\n  - [x] ${nestedItem}\n- [X] ${item2}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`- [ ] ${item1}\n  - [X] ${nestedItem}\n- [X] ${item2}`);
    });

    test('should handle mixed checklist items', () => {
      const unchecked = faker.lorem.words(2);
      const checkedLower = faker.lorem.words(3);
      const checkedUpper = faker.lorem.words(2);
      
      const markdown = `- [ ] ${unchecked}\n- [x] ${checkedLower}\n- [X] ${checkedUpper}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`- [ ] ${unchecked}\n- [X] ${checkedLower}\n- [X] ${checkedUpper}`);
    });

    test('should handle empty checkboxes with extra spaces', () => {
      const item = faker.lorem.words(2);
      const markdown = `- [  ] ${item}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`- [ ] ${item}`);
    });

    test('should not affect regular list items', () => {
      const item = faker.lorem.words(3);
      const markdown = `- ${item}`;
      const result = strategy.convert(markdown, 'bbcode');
      expect(result).toBe(`- ${item}`);
    });

    test('should not affect text that looks like checkboxes but is not in list format', () => {
      const text = `This has [x] and [ ] but is not a list`;
      const result = strategy.convert(text, 'bbcode');
      expect(result).toBe(text);
    });
  });

  describe('WorldAnvil BBCode format', () => {
    test('should convert unchecked checklist items to [] format', () => {
      const item = faker.lorem.words(3);
      const markdown = `- [ ] ${item}`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(`- [] ${item}`);
    });

    test('should convert checked checklist items (lowercase x) to [c] format', () => {
      const item = faker.lorem.words(3);
      const markdown = `- [x] ${item}`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(`- [c] ${item}`);
    });

    test('should convert checked checklist items (uppercase X) to [c] format', () => {
      const item = faker.lorem.words(3);
      const markdown = `- [X] ${item}`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(`- [c] ${item}`);
    });

    test('should handle different list markers', () => {
      const item = faker.lorem.words(2);
      
      expect(strategy.convert(`- [ ] ${item}`, 'worldanvil')).toBe(`- [] ${item}`);
      expect(strategy.convert(`* [ ] ${item}`, 'worldanvil')).toBe(`- [] ${item}`);
      expect(strategy.convert(`+ [ ] ${item}`, 'worldanvil')).toBe(`- [] ${item}`);
      expect(strategy.convert(`- [x] ${item}`, 'worldanvil')).toBe(`- [c] ${item}`);
      expect(strategy.convert(`* [x] ${item}`, 'worldanvil')).toBe(`- [c] ${item}`);
      expect(strategy.convert(`+ [x] ${item}`, 'worldanvil')).toBe(`- [c] ${item}`);
    });

    test('should handle nested checklist items with indentation', () => {
      const item1 = faker.lorem.words(2);
      const nestedItem = faker.lorem.words(3);
      const item2 = faker.lorem.words(2);
      
      const markdown = `- [ ] ${item1}\n  - [x] ${nestedItem}\n- [X] ${item2}`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(`- [] ${item1}\n  - [c] ${nestedItem}\n- [c] ${item2}`);
    });

    test('should handle mixed checklist items', () => {
      const unchecked = faker.lorem.words(2);
      const checkedLower = faker.lorem.words(3);
      const checkedUpper = faker.lorem.words(2);
      
      const markdown = `- [ ] ${unchecked}\n- [x] ${checkedLower}\n- [X] ${checkedUpper}`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(`- [] ${unchecked}\n- [c] ${checkedLower}\n- [c] ${checkedUpper}`);
    });

    test('should handle empty checkboxes with extra spaces', () => {
      const item = faker.lorem.words(2);
      const markdown = `- [  ] ${item}`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(`- [] ${item}`);
    });

    test('should not affect regular list items', () => {
      const item = faker.lorem.words(3);
      const markdown = `- ${item}`;
      const result = strategy.convert(markdown, 'worldanvil');
      expect(result).toBe(`- ${item}`);
    });

    test('should not affect text that looks like checkboxes but is not in list format', () => {
      const text = `This has [x] and [ ] but is not a list`;
      const result = strategy.convert(text, 'worldanvil');
      expect(result).toBe(text);
    });
  });

  describe('Default format handling', () => {
    test('should default to bbcode format when no format specified', () => {
      const item = faker.lorem.words(2);
      const markdown = `- [x] ${item}`;
      const result = strategy.convert(markdown);
      expect(result).toBe(`- [X] ${item}`);
    });
  });
});