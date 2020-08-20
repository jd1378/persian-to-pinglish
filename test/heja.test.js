import { generatePossibleHejaShortMosavets } from '../src/heja';

describe('generatePossibleHejaShortMosavets', () => {
  it('only touches second vaj of every heja', () => {
    let heja = [
      { type: 's', letter: 'ت' },
      { type: 'm', letter: '' },
    ];
    let result = generatePossibleHejaShortMosavets(heja)[0]; // take one

    expect(result[0].type).toBe('s');
    expect(result[0].letter).toBe('ت');
    expect(result[1].type).toBe('m');
    expect(result[1].letter).toBeTruthy();
  });

  it('only touches hejas with short mosavets', () => {
    let heja = [
      { type: 's', letter: 'ت' },
      { type: 'm', letter: 'ا' },
    ];
    let result = generatePossibleHejaShortMosavets(heja)[0]; // take one

    expect(result[0].type).toBe('s');
    expect(result[0].letter).toBe('ت');
    expect(result[1].type).toBe('m');
    expect(result[1].letter).toBe('ا');
  });
});
