/**
 * Definition of a "Vaj" in this library:
 * A vaj is an Object containing "type" and "letter" properties.
 * @typedef {Object} Vaj
 * @property {String} type
 * @property {String} letter
 */

const aM = 'َ';
const oM = 'ُ';
const eM = 'ِ';

const shortMosavets = {
  [aM]: 'm', // a
  [oM]: 'm', // o
  [eM]: 'm', // e
};

const longMosavetLetters = ['و', 'ا', 'ی'];

const mosavets = {
  // mosavet
  ا: 'm',
  ...shortMosavets,
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
 * @param {String} normStr - min 2 char. normalized str (see word.js)
 */
function getStrVajPattern(normStr, wordMode = false) {
  let pattern = normStr.split('').map(getVaj);
  if (pattern[0].type === 'u' && ['ی', 'و'].includes(normStr.charAt(0))) {
    pattern[0].type = 's';
  }
  if (pattern.length > 1 && !wordMode) {
    if (pattern[1].type === 'u' && ['ی', 'و'].includes(normStr.charAt(1))) {
      pattern[1].type = 'm';
    }
  }
  return pattern;
}

export default {
  getVaj,
  getStrVajPattern,
  aM,
  oM,
  eM,
  shortMosavets,
  longMosavetLetters,
};
export {
  getVaj,
  getStrVajPattern,
  aM,
  oM,
  eM,
  shortMosavets,
  longMosavetLetters,
};
