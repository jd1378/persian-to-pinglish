import charmap from './charmap';

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
        return charmap.all[word] || '';
      }

      if (lastLetter in charmap.confident) {
        if (word in charmap.uncertain) {
          cWord += charmap.getUncertainAtSecond(word);
        } else if (_word.length > 3) {
          cWord += 'a';
          cWord += charmap.all[word];
        } else {
          cWord += charmap.all[word];
        }
      } else {
        // lastLetter is uncertain
        if (word in charmap.confident) {
          cWord += charmap.all[word];
        } else {
          // todo
          cWord += charmap.getUncertainAtBothComplementary(lastLetter, word);
        }
      }
      word = '';
    } else if (word.length > 1) {
      let fl = word.charAt(0);
      let sl = word.charAt(1);

      if (lastLetter.length && lastLetter in charmap.confident) {
        if (fl in charmap.uncertain) {
          // TODO
          // cWord += 'i';
        } else {
          cWord += 'a';
        }
      }

      if (fl in charmap.uncertain && sl in charmap.uncertain) {
        let eq = charmap.getUncertainAtBoth(fl, sl);
        cWord += eq;
      } else if (fl in charmap.uncertain) {
        if (!lastLetter) {
          cWord += charmap.getUncertainAtFirst(fl);
        } else {
          cWord += charmap.getUncertainAtSecond(fl);
        }
        cWord += charmap.all[sl] || '';
      } else if (sl in charmap.uncertain) {
        let eq = charmap.getUncertainAtSecond(sl);
        cWord += charmap.all[fl] || '';
        cWord += eq;
      } else {
        cWord += charmap.all[fl] || '';
        // TODO: get most common connector vowel here
        cWord += 'a';
        cWord += charmap.all[sl] || '';
      }
      lastLetter = sl;
      word = word.substr(2);
    }
  } while (word.length);

  return cWord;
}

export default convert;
