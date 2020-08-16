import words from './words.json';
import convert from '../src/convert';

describe('word conversion', () => {
  it('correctly converts words as expected', () => {
    for (let word in words) {
      expect(convert(word)).toBe(words[word]);
    }
  });
});
