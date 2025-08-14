import { faker } from '@faker-js/faker';
import { StandardHeaderConversionStrategy } from '../../../src/strategies/standard/header-strategy';

describe('StandardHeaderConversionStrategy', () => {
  const strategy = new StandardHeaderConversionStrategy();

  test('should have no dependencies', () => {
    expect((strategy as any).runAfter).toBeUndefined();
  });

  test('should convert H1 headers for traditional BBCode', () => {
    const text = faker.lorem.words(3);
    const markdown = `# ${text}`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[size=28][b]${text}[/b][/size]`);
  });

  test('should convert all header levels for traditional BBCode', () => {
    const h1Text = faker.lorem.word();
    const h2Text = faker.lorem.word();
    const h3Text = faker.lorem.word();
    const h4Text = faker.lorem.word();
    const h5Text = faker.lorem.word();
    const h6Text = faker.lorem.word();
    
    expect(strategy.convert(`# ${h1Text}`, 'bbcode')).toBe(`[size=28][b]${h1Text}[/b][/size]`);
    expect(strategy.convert(`## ${h2Text}`, 'bbcode')).toBe(`[size=24][b]${h2Text}[/b][/size]`);
    expect(strategy.convert(`### ${h3Text}`, 'bbcode')).toBe(`[size=20][b]${h3Text}[/b][/size]`);
    expect(strategy.convert(`#### ${h4Text}`, 'bbcode')).toBe(`[size=18][b]${h4Text}[/b][/size]`);
    expect(strategy.convert(`##### ${h5Text}`, 'bbcode')).toBe(`[size=16][b]${h5Text}[/b][/size]`);
    expect(strategy.convert(`###### ${h6Text}`, 'bbcode')).toBe(`[size=14][b]${h6Text}[/b][/size]`);
  });

  test('should convert multiple header levels', () => {
    const h1Text = faker.lorem.words(2);
    const h2Text = faker.lorem.words(3);
    const markdown = `# ${h1Text}\n## ${h2Text}`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[size=28][b]${h1Text}[/b][/size]\n[size=24][b]${h2Text}[/b][/size]`);
  });
});
