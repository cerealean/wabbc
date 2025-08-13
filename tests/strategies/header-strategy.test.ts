import { faker } from '@faker-js/faker';
import { HeaderConversionStrategy } from '../../src/strategies/header-strategy';

describe('HeaderConversionStrategy', () => {
  const strategy = new HeaderConversionStrategy();

  test('should have correct priority and name', () => {
    expect(strategy.priority).toBe(1);
    expect(strategy.name).toBe('HeaderConversion');
  });

  test('should convert H1 headers for traditional BBCode', () => {
    const text = faker.lorem.words(3);
    const markdown = `# ${text}`;
    const result = strategy.convert(markdown, 'bbcode');
    expect(result).toBe(`[size=28][b]${text}[/b][/size]`);
  });

  test('should convert H1 headers for WorldAnvil', () => {
    const text = faker.lorem.words(3);
    const markdown = `# ${text}`;
    const result = strategy.convert(markdown, 'worldanvil');
    expect(result).toBe(`[h1]${text}[/h1]`);
  });

  test('should convert multiple header levels', () => {
    const h1Text = faker.lorem.words(2);
    const h2Text = faker.lorem.words(3);
    const markdown = `# ${h1Text}\n## ${h2Text}`;
    const result = strategy.convert(markdown, 'worldanvil');
    expect(result).toBe(`[h1]${h1Text}[/h1]\n[h2]${h2Text}[/h2]`);
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

  test('should convert all header levels for WorldAnvil', () => {
    const h1Text = faker.lorem.word();
    const h2Text = faker.lorem.word();
    const h3Text = faker.lorem.word();
    const h4Text = faker.lorem.word();
    const h5Text = faker.lorem.word();
    const h6Text = faker.lorem.word();
    
    expect(strategy.convert(`# ${h1Text}`, 'worldanvil')).toBe(`[h1]${h1Text}[/h1]`);
    expect(strategy.convert(`## ${h2Text}`, 'worldanvil')).toBe(`[h2]${h2Text}[/h2]`);
    expect(strategy.convert(`### ${h3Text}`, 'worldanvil')).toBe(`[h3]${h3Text}[/h3]`);
    expect(strategy.convert(`#### ${h4Text}`, 'worldanvil')).toBe(`[h4]${h4Text}[/h4]`);
    expect(strategy.convert(`##### ${h5Text}`, 'worldanvil')).toBe(`[h5]${h5Text}[/h5]`);
    expect(strategy.convert(`###### ${h6Text}`, 'worldanvil')).toBe(`[h6]${h6Text}[/h6]`);
  });
});
