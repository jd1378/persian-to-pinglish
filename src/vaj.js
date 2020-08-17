const aM = 'َ';
const oM = 'ُ';
const eM = 'ِ';

const mosavets = {
  // mosavet
  ا: 'm',
  [aM]: 'm', // a
  [oM]: 'm', // o
  [eM]: 'm', // e
  // unknown
  و: 'u',
  ی: 'u',
  // anything else is samet
};
// including 'ـَ', 'ـِ', 'ـُ',
// and "و"

/**
 * @param {String} letter
 */
function getVaj(letter) {
  return {
    type: mosavets[letter] || 's',
    letter,
  };
}

/**
 * @param {String} word - min 2 char. normalized word (see heja.js)
 */
function getWordVajPattern(word) {
  let pattern = word.split('').map(getVaj);
  if (pattern[0].type === 'u' && ['ی', 'و'].includes(word.charAt(0))) {
    pattern[0].type = 's';
  }
  if (pattern.length > 1) {
    if (pattern[1].type === 'u' && ['ی', 'و'].includes(word.charAt(1))) {
      pattern[1].type = 'm';
    }
  }
  return pattern;
}

export default { getVaj, getWordVajPattern, aM, oM, eM };
export { getVaj, getWordVajPattern, aM, oM, eM };
