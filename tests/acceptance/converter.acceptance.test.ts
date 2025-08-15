import { 
    Converter
} from '../../src/converter';

import fs from 'node:fs';

describe('Converter Acceptance Tests', () => {

    test('rawr', async () => {
        const markdown = fs.readFileSync(`${process.cwd()}/tests/acceptance/data/kharakthi-species.md`, 'utf-8');
        const expectedBBCode = fs.readFileSync(`${process.cwd()}/tests/acceptance/data/kharakthi-species.bbcode.txt`, 'utf-8');

        const actualBBCode = new Converter().convert(markdown);

        expect(actualBBCode).toBe(expectedBBCode);
    });

});
