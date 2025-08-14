import { StandardTableConversionStrategy } from '../../../src/strategies/standard/table-strategy';

describe('StandardTableConversionStrategy', () => {
  let strategy: StandardTableConversionStrategy;

  beforeEach(() => {
    strategy = new StandardTableConversionStrategy();
  });

  describe('convert', () => {
    it('should convert a simple markdown table to BBCode format', () => {
      const input = `| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |`;

      const expected = `[table]
[tr]
[th]Header 1[/th]
[th]Header 2[/th]
[/tr]
[tr]
[td]Cell 1[/td]
[td]Cell 2[/td]
[/tr]
[tr]
[td]Cell 3[/td]
[td]Cell 4[/td]
[/tr]
[/table]
`;

      const result = strategy.convert(input, 'bbcode');
      expect(result).toBe(expected);
    });

    it('should handle tables with different alignment markers', () => {
      const input = `| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |`;

      const expected = `[table]
[tr]
[th]Left[/th]
[th]Center[/th]
[th]Right[/th]
[/tr]
[tr]
[td]L1[/td]
[td]C1[/td]
[td]R1[/td]
[/tr]
[tr]
[td]L2[/td]
[td]C2[/td]
[td]R2[/td]
[/tr]
[/table]
`;

      const result = strategy.convert(input, 'bbcode');
      expect(result).toBe(expected);
    });

    it('should handle tables with varying amounts of whitespace', () => {
      const input = `|Header 1|Header 2|Header 3|
|---|---|---|
|Cell1|Cell2|Cell3|
| Spaced | Cells | Here |`;

      const expected = `[table]
[tr]
[th]Header 1[/th]
[th]Header 2[/th]
[th]Header 3[/th]
[/tr]
[tr]
[td]Cell1[/td]
[td]Cell2[/td]
[td]Cell3[/td]
[/tr]
[tr]
[td]Spaced[/td]
[td]Cells[/td]
[td]Here[/td]
[/tr]
[/table]
`;

      const result = strategy.convert(input, 'bbcode');
      expect(result).toBe(expected);
    });

    it('should handle tables with empty cells', () => {
      const input = `| Name | Value | Notes |
|------|-------|-------|
| Item1|  100  |       |
|      |   50  | Empty |`;

      const expected = `[table]
[tr]
[th]Name[/th]
[th]Value[/th]
[th]Notes[/th]
[/tr]
[tr]
[td]Item1[/td]
[td]100[/td]
[td][/td]
[/tr]
[tr]
[td][/td]
[td]50[/td]
[td]Empty[/td]
[/tr]
[/table]
`;

      const result = strategy.convert(input, 'bbcode');
      expect(result).toBe(expected);
    });

    it('should handle multiple tables in the same text', () => {
      const input = `First table:
| A | B |
|---|---|
| 1 | 2 |

Some text between tables.

Second table:
| X | Y | Z |
|---|---|---|
| a | b | c |`;

      const expected = `First table:
[table]
[tr]
[th]A[/th]
[th]B[/th]
[/tr]
[tr]
[td]1[/td]
[td]2[/td]
[/tr]
[/table]
Some text between tables.

Second table:
[table]
[tr]
[th]X[/th]
[th]Y[/th]
[th]Z[/th]
[/tr]
[tr]
[td]a[/td]
[td]b[/td]
[td]c[/td]
[/tr]
[/table]
`;

      const result = strategy.convert(input, 'bbcode');
      expect(result).toBe(expected);
    });

    it('should handle tables with markdown formatting in cells', () => {
      const input = `| **Bold** | *Italic* | \`Code\` |
|----------|----------|----------|
| Normal   | _Emphasis_ | **Strong** |`;

      const expected = `[table]
[tr]
[th]**Bold**[/th]
[th]*Italic*[/th]
[th]\`Code\`[/th]
[/tr]
[tr]
[td]Normal[/td]
[td]_Emphasis_[/td]
[td]**Strong**[/td]
[/tr]
[/table]
`;

      const result = strategy.convert(input, 'bbcode');
      expect(result).toBe(expected);
    });

    it('should not convert text that is not a table', () => {
      const input = `This is not a table.
Just some regular text.
| This might look like | a table header |
But it's missing the separator line.`;

      const result = strategy.convert(input, 'bbcode');
      expect(result).toBe(input);
    });

    it('should handle single column tables', () => {
      const input = `| Single |
|--------|
| Row1   |
| Row2   |`;

      const expected = `[table]
[tr]
[th]Single[/th]
[/tr]
[tr]
[td]Row1[/td]
[/tr]
[tr]
[td]Row2[/td]
[/tr]
[/table]
`;

      const result = strategy.convert(input, 'bbcode');
      expect(result).toBe(expected);
    });

    it('should handle tables with numeric content', () => {
      const input = `| Item | Price | Quantity |
|------|-------|----------|
| Apple| $1.50 | 10       |
| Banana| $0.75| 25       |`;

      const expected = `[table]
[tr]
[th]Item[/th]
[th]Price[/th]
[th]Quantity[/th]
[/tr]
[tr]
[td]Apple[/td]
[td]$1.50[/td]
[td]10[/td]
[/tr]
[tr]
[td]Banana[/td]
[td]$0.75[/td]
[td]25[/td]
[/tr]
[/table]
`;

      const result = strategy.convert(input, 'bbcode');
      expect(result).toBe(expected);
    });
  });
});
