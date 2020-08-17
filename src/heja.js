import { flatPossibilities } from './utils';
import { getWordVajPattern } from './vaj';
import { getBestConnector } from './vajconnector';
import { all as allCharMaps, mosavet } from './charmap';

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

      if (
        pattern[3].letter === 'م' &&
        pattern[2].letter === 'ز' &&
        pattern[1].letter === 'ا'
      ) {
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
    let [heja, remainingWord] = getNextHeja(normWord, take, iter);
    if (heja) {
      if (remainingWord) {
        let possibleHejaPatterns = getPossibleHejaPatternsRecursive(
          remainingWord,
          iter + 1
        );
        if (possibleHejaPatterns.length) {
          hejaPossibilities.push([heja, possibleHejaPatterns]);
        }
      } else {
        hejaPossibilities.push(heja);
      }
    }
  }
  return hejaPossibilities;
}

function twoVajHejaRepeatDetector(wordParts) {
  let found = false;
  let rc = 0;
  for (let pLen of wordParts.map((p) => p.length)) {
    if (pLen === 2) {
      rc++;
      if (rc > 2) {
        found = true;
        break;
      }
    } else {
      rc = 0;
    }
  }
  return found;
}

function possibilityValidator(arr, word) {
  /* if (arr.length > 3) {
    if (twoVajHejaRepeatDetector(arr)) {
      return false;
    }
  } */
  // samets of results should be equal with source word
  let arraySametCount = arr
    .flat()
    .map((el) => el.type)
    .reduce((acc, curr) => {
      if (curr === 's') return acc + 1;
      return acc;
    }, 0);

  let wordVajPattern = getWordVajPattern(word, true).map((el) => el.type);
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
function getHejas(normalizedWord) {
  let possibleHejas = getPossibleHejaPatternsRecursive(normalizedWord);
  return flatPossibilities(possibleHejas).filter((arr) =>
    possibilityValidator(arr, normalizedWord)
  );
}

function getBestHejaMatch(word) {
  let nWord = normalizeWord(word);
  let possibleHejas = getHejas(nWord);
  function sortByBest(a, b) {
    // if 2 part and 5 , prefer shorter as first
    if (word.length === 4) {
      if (a.length === 2) {
        return -1;
      } else if (b.length === 2) {
        return 1;
      }
    }
    // if 2 part and 6 , prefer symmetric
    if (word.length === 5) {
      if (a.length === 2 && a.every((aEl) => aEl.length === a[0])) {
        return -1;
      } else if (b.length === 2 && b.every((bEl) => bEl.length === b[0])) {
        return 1;
      }
    }
    // if 3 parts, prefer 2, 2 , 3
    if (a.length === 3 && b.length === 3) {
      if (a[0].length === 2 && a[1].length === 2 && a[2].length === 3) {
        return -1;
      } else if (b[0].length === 2 && b[1].length === 2 && b[2].length === 3) {
        return 1;
      }
    }
    // if more than 3 parts, prefer 3, 3 , 2 , 3
    if (a.length > 3 && b.length > 3) {
      if (
        a[0].length === 3 &&
        a[1].length === 3 &&
        a[2].length === 2 &&
        a[3].length === 3
      ) {
        return -1;
      } else if (
        b[0].length === 3 &&
        b[1].length === 3 &&
        b[2].length === 2 &&
        b[3].length === 3
      ) {
        return 1;
      }
    }
    // TODO: if not possible, as a last resort sort by not same in a row
    return 0;
  }
  possibleHejas.sort(sortByBest);
  // TODO: score hejas properly
  return possibleHejas[0];
}

function replaceWithEnglish(wordParts) {
  return wordParts.map((heja) => {
    let vajMap = [];
    for (let vaj of heja) {
      if (vaj.type === 'm') {
        if (vaj.letter === 'و' && heja.length === 2) {
          vajMap.push('o');
        } else {
          vajMap.push(mosavet[vaj.letter]);
        }
      } else {
        vajMap.push(allCharMaps[vaj.letter]);
      }
    }
    return vajMap;
  });
}

export default {
  normalizeWord,
  getHejas,
  getBestHejaMatch,
  replaceWithEnglish,
};
export { normalizeWord, getHejas, getBestHejaMatch, replaceWithEnglish };
