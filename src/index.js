import cleanup from './cleanup';
import { getWords } from './sentence';
import convert from './convert';
import { getBestHejaMatch, replaceWithEnglish } from './heja';

/**
 *
 * @param {String} str - The input string to convert
 * @param {Object} options - see source for info
 * @param {String} [options.join] - joins words inside the string with this string as seperator
 */
function persianToPinglish(str, options) {
  if (!options) options = {};
  if (!options.join) options.join = ' ';

  return getWords(str)
    .filter(Boolean) // remove empty array elements
    .map((word) => convert(word))
    .join(options.join);
}

function p2fHeja(str, options) {
  if (!options) options = {};
  if (!options.join) options.join = ' ';

  return getWords(str)
    .filter(Boolean) // remove empty array elements
    .map((word) => replaceWithEnglish(getBestHejaMatch(word)).flat().join(''))
    .join(options.join); // join words to sentence
}

export default persianToPinglish;
export { cleanup, getWords, convert, persianToPinglish, p2fHeja };
