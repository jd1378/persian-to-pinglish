import { flatPossibilities } from './utils';
import { getWordVajPattern } from './vaj';
import { getBestConnector } from './vajconnector';

// every beginning heja has either two or three vaj
// every ending heja has two to four vaj
// second vaj in every heja is ALWAYS mosavet
// third vaj in every heja is optional, and it should samet
// theres never 2 mosavet in a heja
// theres never 3 samet in a row

const xRegex1 = /(خو)(ا|ی)(هر|هش|ب|ش|ن)/g;
const xRegex2 = /^ا/g;
const xRegex3 = /آ/g;
/**
 * @param {String} word
 */
function normalizeWord(word) {
  let ndWord = word
    .replace(xRegex1, 'خ$2$3')
    .replace(xRegex2, 'ء')
    .replace(xRegex3, 'ءا');
  return ndWord;
}

/**
 * @param {Array} pattern
 */
function isValidHeja(pattern) {
  if (pattern.length >= 2 && pattern.length <= 4) {
    // first vaj is always samet
    if (pattern[0].type !== 's') return false;
    // second vaj is always mosavet
    if (pattern[1].type !== 'm') return false;
    // third and fourth are always samet
    if (pattern.length === 3 && pattern[2].type !== 's') return false;
    if (pattern.length === 4 && pattern[3].type !== 's') return false;
    // if nothing is wrong, heja is valid
    return true;
  }
  return false;
}

/**
 * @param {String} word
 * @param {Number} take
 * @param {Number} iter
 */
function getNextHeja(word, take, iter) {
  if (word.length < take) return [false];
  if (iter === 0 && take === 4) return [false];

  let returnWord = word.substring(take);
  let vajPattern = getWordVajPattern(word.substr(0, take));
  if (vajPattern[1].type === 's') {
    if (take === 2 && iter === 0) {
      let delVaj = vajPattern.splice(1, 1, {
        type: 'm',
        letter: getBestConnector(vajPattern[0].letter, vajPattern[1].letter),
      });
      returnWord = delVaj[0].letter + returnWord;
    } else {
      vajPattern.splice(1, 0, {
        type: 'm',
        letter: getBestConnector(vajPattern[0].letter, vajPattern[1].letter),
      });
    }
  }
  if (!isValidHeja(vajPattern)) return [false];
  return [vajPattern, returnWord];
}

function getPossibleHejaPatternsRecursive(normWord, iter = 0) {
  let hejaPossibilities = [];
  for (let take = 2; take <= 4; take++) {
    let hejaPattern = [];
    let [heja, remainingWord] = getNextHeja(normWord, take, iter);
    if (heja) {
      hejaPattern.push(heja);
      if (remainingWord) {
        let possibleHejaPatterns = getPossibleHejaPatternsRecursive(
          remainingWord,
          iter + 1
        );
        if (possibleHejaPatterns.length) {
          hejaPattern.push(possibleHejaPatterns);
        } else {
          hejaPattern.pop();
        }
      }
      if (hejaPattern.length) {
        hejaPossibilities.push(hejaPattern);
      }
    }
  }
  return hejaPossibilities;
}

function possibilityValidator(arr, word) {
  // samets of results should be equal with source word
  let arraySametCount = arr
    .flat()
    .map((el) => el.type)
    .reduce((acc, curr) => {
      if (curr === 's') return acc + 1;
      return acc;
    }, 0);

  let wordVajPattern = getWordVajPattern(word).map((el) => el.type);
  let tolerance = wordVajPattern.reduce((acc, curr) => {
    if (curr === 'u') return acc + 1;
    return acc;
  }, 0);
  let wordSametCount = wordVajPattern.reduce((acc, curr) => {
    if (curr === 's') return acc + 1;
    return acc;
  }, 0);

  if (arraySametCount === wordSametCount) {
    return true;
  } else {
    if (arraySametCount >= wordSametCount) {
      if (arraySametCount - wordSametCount <= tolerance) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Returns best heja pattern match
 * @param {String} word - min 2 char.
 */
function getHejas(word) {
  let possibleHejaPatterns = getPossibleHejaPatternsRecursive(
    normalizeWord(word)
  );
  return flatPossibilities(possibleHejaPatterns).filter((arr) =>
    possibilityValidator(arr, normalizeWord(word))
  );
}

let result = getHejas('رفیعی');
for (let wordParts of result) {
  console.log('\n');

  console.log(
    wordParts
      .map((hejaPattern) => hejaPattern.map((vaj) => vaj.letter).join(''))
      .join('|')
  );
}

export default { normalizeWord, getHejas };
export { normalizeWord, getHejas };
