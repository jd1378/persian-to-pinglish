import { getWordFitPercent } from '../../src/word-templates';

describe('getWordFitPercent function', () => {
  it('returns 0 for template pattern with 0 score', () => {
    const wordPattern = [
      //
      [{ type: '' }],
    ];
    const template = {
      pattern: [
        //
        [{ type: '' }],
      ],
    };

    expect(getWordFitPercent(wordPattern, template.pattern)).toBe(0);
  });

  it('returns 0 for no match of known data', () => {
    const wordPattern = [
      //
      [{ type: 'm' }],
    ];
    const template = {
      pattern: [
        //
        [{ type: 's' }],
      ],
    };

    expect(getWordFitPercent(wordPattern, template.pattern)).toBe(0);
  });

  it('returns 1 for exact match of known data', () => {
    const wordPattern = [
      //
      [{ type: 's' }],
    ];
    const template = {
      pattern: [
        //
        [{ type: 's' }],
      ],
    };

    expect(getWordFitPercent(wordPattern, template.pattern)).toBe(1);
  });

  it('returns 0.5 for half match of known data', () => {
    const wordPattern = [
      //
      [{ type: 's' }],
    ];
    const template = {
      pattern: [
        //
        [{ type: 's', letter: 't' }],
      ],
    };

    expect(getWordFitPercent(wordPattern, template.pattern)).toBe(0.5);
  });

  it('ignores extra data', () => {
    const wordPattern = [
      //
      [{ type: 's', letter: 't' }],
    ];
    const template = {
      pattern: [
        //
        [{ type: 's', letter: '' }],
      ],
    };

    expect(getWordFitPercent(wordPattern, template.pattern)).toBe(1);
  });
});
