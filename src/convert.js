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
      if (word in charmap.uncertain) {
        if (_word.length > 1) {
          let eq = '';
          switch (word) {
            case 'ه':
              eq = 'e';
              break;
            case 'ا':
              eq = 'aa';
              break;
            case 'ی':
              eq = 'i';
              break;
            case 'و':
              eq = 'oo';
              break;
          }
          cWord += eq;
        } else {
          cWord += charmap.uncertain[word];
        }
      } else {
        if (
          _word.length > 1 &&
          lastLetter.length &&
          lastLetter in charmap.confident
        ) {
          // TODO: get most common connector vowel here
          cWord += 'a';
        }
        cWord += charmap.confident[word] || '';
      }
      word = '';
    } else if (word.length > 1) {
      let fl = word.charAt(0);
      let sl = word.charAt(1);

      let eq = '';
      if (fl in charmap.uncertain) {
        cWord += charmap.uncertain[fl] || '';
        cWord += charmap.all[sl] || '';
      } else if (sl in charmap.uncertain) {
        switch (sl) {
          case 'و':
            eq = 'oo';
            break;
          case 'ی':
            eq = 'i';
            break;
          case 'ه':
            eq = 'h';
            break;
          case 'ا':
            eq = 'aa';
            break;
        }
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
