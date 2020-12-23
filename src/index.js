import { getWords } from './sentence';
import { getBestWordMatch, toPinglishHejas } from './word';

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
    .map((word) => toPinglishHejas(getBestWordMatch(word)).flat().join(''))
    .join(options.join);
}

export default persianToPinglish;
export { getWords, persianToPinglish, getBestWordMatch, toPinglishHejas };
