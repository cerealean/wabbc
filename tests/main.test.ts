import { Converter, ConversionOptions } from '../src/main';
import DefaultConverter from '../src/main';
import { faker } from '@faker-js/faker';

describe('Main Entry Point', () => {
    test('should export Converter class', () => {
        expect(Converter).toBeDefined();
        expect(typeof Converter).toBe('function');
    });

    test('should export ConversionOptions interface', () => {
        // Test that we can use the interface by creating an object that matches it
        const options: ConversionOptions = { format: 'bbcode' };
        expect(options).toBeDefined();
    });

    test('should export default Converter class', () => {
        expect(DefaultConverter).toBeDefined();
        expect(typeof DefaultConverter).toBe('function');
        expect(DefaultConverter).toBe(Converter);
    });

    test('should work with exported Converter', () => {
        const text = faker.lorem.word();
        const converter = new Converter();
        expect(converter.convert(`**${text}**`)).toBe(`[b]${text}[/b]`);
    });

    test('should work with default export', () => {
        const text = faker.lorem.word();
        const converter = new DefaultConverter();
        expect(converter.convert(`**${text}**`)).toBe(`[b]${text}[/b]`);
    });

    test('should work with options using exported interface', () => {
        const headerText = faker.lorem.words(2);
        const options: ConversionOptions = { format: 'worldanvil' };
        const converter = new Converter(options);
        expect(converter.convert(`# ${headerText}`)).toBe(`[h1]${headerText}[/h1]`);
    });
});
