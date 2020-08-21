import { getWordFitScore } from '../../src/word-templates';

describe('getWordFitScore function', () => {
  it('returns score and rate', () => {
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
    const result = getWordFitScore(wordPattern, template.pattern);
    expect(result).toStrictEqual({ score: 1, rate: 1 });
  });

  it('handles template with 0 score', () => {
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
    const result = getWordFitScore(wordPattern, template.pattern);
    expect(result).toStrictEqual({ score: 0, rate: 0 });
  });

  it('handles template with multiple heja', () => {
    const wordPattern = [
      [
        { type: 's', letter: 'l' }, // type match, letter mismatch = 0
        { type: 't', letter: 'a' }, // type mismatch, letter non-match = -1
      ],
      [{ type: 's' }], // type match = 1
    ]; // = 0
    const template = {
      // 5 score total
      pattern: [
        //
        [{ type: 's', letter: 'z' }, { type: 'm' }],
        [{ type: 's', letter: 'z' }],
      ],
    };
    const result = getWordFitScore(wordPattern, template.pattern);
    expect(result.score).toBe(0);
    expect(result.rate).toBe(0);
  });

  it('scores 0 for no match of known data', () => {
    const wordPattern = [
      //
      [{ type: '' }],
    ];
    const template = {
      pattern: [
        //
        [{ type: 's' }],
      ],
    };

    let result = getWordFitScore(wordPattern, template.pattern);
    expect(result.score).toBe(0);
    expect(result.rate).toBe(0);
  });

  it('scores and rates 1 for exact match of known data', () => {
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

    let result = getWordFitScore(wordPattern, template.pattern);
    expect(result.score).toBe(1);
    expect(result.rate).toBe(1);
  });

  it('returns rates 0.5 for half match of known data', () => {
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

    expect(getWordFitScore(wordPattern, template.pattern).rate).toBe(0.5);
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

    expect(getWordFitScore(wordPattern, template.pattern).rate).toBe(1);
  });
});
