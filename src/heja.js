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
    if (pattern.length === 4) {
      if (pattern[3].type !== 's') {
        return false;
      }

      if (pattern[3].letter === 'ر' && pattern[2].letter === 'چ') {
        return false;
      }

      if (
        ['ب', 'پ', 'د'].includes(pattern[3].letter) &&
        ['ب', 'پ', 'د'].includes(pattern[2].letter)
      ) {
        return false;
      }

      if (pattern[3].letter === 'ز' && pattern[2].letter === 'ب') {
        return false;
      }

      if (pattern[3].letter === 'ژ' && pattern[2].letter === 'ت') {
        return false;
      }

      if (pattern[3].letter === 'د' && pattern[2].letter === 'ش') {
        // TODO: Not sure
        return false;
      }
    }

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
  if (returnWord.length === 0 && word.length === 1) return [false];
  let vajPattern = getWordVajPattern(word.substr(0, take));
  if (
    vajPattern.length === 4 &&
    vajPattern[1].type === 'm' &&
    vajPattern[2].type === 'u' &&
    vajPattern[1].letter === vajPattern[2].letter
  ) {
    // tashdid fixer
    return [false];
  }
  if (vajPattern.length > 1 && vajPattern[1].type === 's') {
    vajPattern.splice(1, 0, {
      type: 'm',
      letter: getBestConnector(vajPattern[0].letter, vajPattern[1].letter),
    });
  } else if (vajPattern.length === 1) {
    vajPattern.push({
      type: 'm',
      letter: getBestConnector(
        vajPattern[0].letter,
        returnWord ? returnWord[0] : ''
      ),
    });
  }
  if (!isValidHeja(vajPattern)) return [false];
  return [vajPattern, returnWord];
}

function getPossibleHejaPatternsRecursive(normWord, iter = 0) {
  let hejaPossibilities = [];
  for (let take = 1; take <= 4; take++) {
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

  // TODO : remove adjacentUnknown possibility
  let prev = '';
  let adjacentUnknown = wordVajPattern.reduce((acc, curr) => {
    try {
      if (curr === 'u' && prev === 'u') return acc + 1;
    } finally {
      prev = curr;
    }
    return acc;
  }, 0);
  tolerance -= adjacentUnknown;

  let wordSametCount = wordVajPattern.reduce((acc, curr) => {
    if (curr === 's') return acc + 1;
    return acc;
  }, 0);

  if (arraySametCount === wordSametCount) {
    return true;
  } else {
    if (arraySametCount >= wordSametCount) {
      let diff = arraySametCount - wordSametCount;
      if (diff > 0 && diff <= tolerance) {
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

let result = getHejas('تصوور');
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
