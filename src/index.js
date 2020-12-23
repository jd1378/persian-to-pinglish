import { getWords } from './sentence';
import { getBestWordMatch, toPinglishHejas } from './word';

/**
 *
 * @param {String} str - The input string to convert
 * @param {Object} options - see source for info
 * @param {String} [options.join] - joins words inside the string with this string as seperator
 */
function toPinglish(str, options) {
  if (!options) options = {};
  if (!options.join) options.join = ' ';

  return getWords(str)
    .filter(Boolean) // remove empty array elements
    .map((sentenceWords) => {
      return toPinglishHejas(getBestWordMatch(sentenceWords)).flat().join('');
    })
    .join(options.join);
}

export default toPinglish;
export { getWords, toPinglish, getBestWordMatch, toPinglishHejas };
