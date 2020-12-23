import words from './words.json';
import p2f from '../src/index';

describe('word conversion', () => {
  it('correctly converts words as expected', () => {
    for (let word in words) {
      expect(p2f(word)).toBe(words[word]);
    }
  });
});
