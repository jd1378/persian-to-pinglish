import {
  getUncertainAtBoth,
  getUncertainAtBothComplementary,
  getUncertainAtFirst,
  getUncertainAtSecond,
  all,
  confident,
  uncertain,
} from './charmap';

/**
 *
 * @param {String} word
 */
function convert(_word) {
  if (!_word) {
    return '';
  }

  // clone string
  let word = `${_word}`;
  let cWord = '';
  let lastLetter = '';

  do {
    if (word.length === 1) {
      if (_word.length <= 1) {
        // single letter returns instantly
        return all[word] || '';
      }

      if (lastLetter in confident) {
        if (word in uncertain) {
          cWord += getUncertainAtSecond(word);
        } else if (_word.length > 3) {
          cWord += 'a';
          cWord += all[word];
        } else {
          cWord += all[word];
        }
      } else {
        // lastLetter is uncertain
        if (word in confident) {
          cWord += all[word];
        } else {
          // todo
          cWord += getUncertainAtBothComplementary(lastLetter, word);
        }
      }
      word = '';
    } else if (word.length > 1) {
      let fl = word.charAt(0);
      let sl = word.charAt(1);

      if (lastLetter.length && lastLetter in confident) {
        if (fl in uncertain) {
          // TODO
          // cWord += 'i';
        } else {
          cWord += 'a';
        }
      }

      if (fl in uncertain && sl in uncertain) {
        let eq = getUncertainAtBoth(fl, sl);
        cWord += eq;
      } else if (fl in uncertain) {
        if (!lastLetter) {
          cWord += getUncertainAtFirst(fl);
        } else {
          cWord += getUncertainAtSecond(fl);
        }
        cWord += all[sl] || '';
      } else if (sl in uncertain) {
        let eq = getUncertainAtSecond(sl);
        cWord += all[fl] || '';
        cWord += eq;
      } else {
        cWord += all[fl] || '';
        // TODO: get most common connector vowel here
        cWord += 'a';
        cWord += all[sl] || '';
      }
      lastLetter = sl;
      word = word.substr(2);
    }
  } while (word.length);

  return cWord;
}

export default convert;
