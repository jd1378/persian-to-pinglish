import cleanup from './cleanup';
import getWords from './getwords';
import convert from './convert';

/**
 *
 * @param {String} str - The input string to convert
 * @param {Object} options - see source for info
 * @param {String} [options.join] - joins words inside the string with this string as seperator
 */
function persianToPinglish(str, options) {
  if (!options) options = {};
  if (!options.join) options.join = ' ';

  return getWords(cleanup(str))
    .map((word) => convert(word))
    .join(options.join);
}

export default persianToPinglish;
export { cleanup, getWords, convert, persianToPinglish };
