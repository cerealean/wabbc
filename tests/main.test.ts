import { Converter, ConversionOptions } from '../src/main';
import DefaultConverter from '../src/main';

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
        const converter = new Converter();
        expect(converter.convert('**test**')).toBe('[b]test[/b]');
    });

    test('should work with default export', () => {
        const converter = new DefaultConverter();
        expect(converter.convert('**test**')).toBe('[b]test[/b]');
    });

    test('should work with options using exported interface', () => {
        const options: ConversionOptions = { format: 'worldanvil' };
        const converter = new Converter(options);
        expect(converter.convert('# Header')).toBe('[h1]Header[/h1]');
    });
});
