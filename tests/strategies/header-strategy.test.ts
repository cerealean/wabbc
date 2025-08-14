import { faker } from '@faker-js/faker';
import { WorldAnvilHeaderConversionStrategy } from '../../src/strategies/worldanvil/header-strategy';

describe('WorldAnvilHeaderConversionStrategy', () => {
  const strategy = new WorldAnvilHeaderConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test('should convert H1 headers for WorldAnvil', () => {
    const text = faker.lorem.words(3);
    const markdown = `# ${text}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[h1]${text}[/h1]`);
  });

  test('should convert all header levels for WorldAnvil', () => {
    const h1Text = faker.lorem.word();
    const h2Text = faker.lorem.word();
    const h3Text = faker.lorem.word();
    const h4Text = faker.lorem.word();
    const h5Text = faker.lorem.word();
    const h6Text = faker.lorem.word();
    
    expect(strategy.convert(`# ${h1Text}`)).toBe(`[h1]${h1Text}[/h1]`);
    expect(strategy.convert(`## ${h2Text}`)).toBe(`[h2]${h2Text}[/h2]`);
    expect(strategy.convert(`### ${h3Text}`)).toBe(`[h3]${h3Text}[/h3]`);
    expect(strategy.convert(`#### ${h4Text}`)).toBe(`[h4]${h4Text}[/h4]`);
    expect(strategy.convert(`##### ${h5Text}`)).toBe(`[h5]${h5Text}[/h5]`);
    expect(strategy.convert(`###### ${h6Text}`)).toBe(`[h6]${h6Text}[/h6]`);
  });

  test('should convert multiple header levels', () => {
    const h1Text = faker.lorem.words(2);
    const h2Text = faker.lorem.words(3);
    const markdown = `# ${h1Text}\n## ${h2Text}`;
    const result = strategy.convert(markdown);
    expect(result).toBe(`[h1]${h1Text}[/h1]\n[h2]${h2Text}[/h2]`);
  });
});
