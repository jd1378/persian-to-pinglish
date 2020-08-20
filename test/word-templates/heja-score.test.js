import { calculateHejaFitScore } from '../../src/word-templates';

describe('heja pattern score based on comparison', () => {
  it('counts empty and equal types as 0 score', () => {
    const wordPattern = [{ type: '' }];
    const templatePattern = [{ type: '' }];

    expect(calculateHejaFitScore(wordPattern, templatePattern)).toBe(0);
  });

  it('counts non-empty and equal type as 1 score', () => {
    const wordPattern = [{ type: 's' }];
    const templatePattern = [{ type: 's' }];

    expect(calculateHejaFitScore(wordPattern, templatePattern)).toBe(1);
  });

  it('counts non equal heja lengths as 0 score', () => {
    const wordPattern = [{ type: 'a' }, { type: '' }];
    const templatePattern = [{ type: 'a' }];

    expect(calculateHejaFitScore(wordPattern, templatePattern)).toBe(0);
  });

  it('counts non-empty type of word against empty template type as 0 score', () => {
    const wordPattern = [{ type: 's' }];
    const templatePattern = [{ type: '' }];

    expect(calculateHejaFitScore(wordPattern, templatePattern)).toBe(0);
  });

  it('counts non-matching type as 0 score', () => {
    const wordPattern = [{ type: 's' }];
    const templatePattern = [{ type: 'm' }];

    expect(calculateHejaFitScore(wordPattern, templatePattern)).toBe(0);
  });

  it('counts empty and equal letters as 0 score', () => {
    const wordPattern = [{ letter: '' }];
    const templatePattern = [{ letter: '' }];

    expect(calculateHejaFitScore(wordPattern, templatePattern)).toBe(0);
  });

  it('counts non-empty and equal letters as 1 score', () => {
    const wordPattern = [{ letter: 's' }];
    const templatePattern = [{ letter: 's' }];

    expect(calculateHejaFitScore(wordPattern, templatePattern)).toBe(1);
  });

  it('counts non-matching letters as 0 score', () => {
    const wordPattern = [{ letter: 's' }];
    const templatePattern = [{ letter: 'm' }];

    expect(calculateHejaFitScore(wordPattern, templatePattern)).toBe(0);
  });
});
