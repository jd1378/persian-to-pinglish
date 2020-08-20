import { flatPossibilities, cartesianProduct } from './utils';
import { getStrVajPattern } from './vaj';
import {
  toPinglishVajs,
  getPossibleHejaPatternsRecursive,
  generatePossibleHejaShortMosavets,
} from './heja';
import { getBestFitTemplate, applyTemplateInPlace } from './word-templates';

/**
 * Definition of a "Word" in this library:
 * A word is an array of "Heja".
 * @typedef {Array<import('./heja').Heja>} Word
 */

/**
 *
 * @param {Word} word
 * @param {String} normStr - a normalized string containing only one persian word
 */
function isGeneratedWordValid(word, normStr) {
  // samets of results should be equal with source word
  let arraySametCount = word
    .flat()
    .map((el) => el.type)
    .reduce((acc, curr) => {
      if (curr === 's') return acc + 1;
      return acc;
    }, 0);

  let wordVajPattern = getStrVajPattern(normStr, true).map((el) => el.type);
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
 * Returns an array of possible words from a normalized string.
 * @param {String} normStr - a normalized string containing only one persian word
 * @returns {Array<Word>}
 */
function getPossibleWords(normStr) {
  let possibleWords = getPossibleHejaPatternsRecursive(normStr);
  let fp = flatPossibilities(possibleWords).filter((arr) =>
    isGeneratedWordValid(arr, normStr)
  );
  return fp;
}

function getPossibleDiacriticedWords(normStr) {
  return getPossibleWords(normStr).flatMap((word) =>
    generatePossibleWordShortMosavets(word)
  );
}

/**
 * Returns an array of possible words (heja arrays)
 * @param {Word} word
 *
 * @returns {Word[]}
 */
function generatePossibleWordShortMosavets(word) {
  // generate and replace possible hejas in-place
  const p = word.map((heja) => generatePossibleHejaShortMosavets(heja));
  // get cartesian product of possible hejas
  return cartesianProduct(p);
}

/**
 *
 * @param {String} persianWordStr
 * @returns {Word}
 */
function getBestWordMatch(persianWordStr) {
  let nStr = normalizeStr(persianWordStr);
  let words = getPossibleDiacriticedWords(nStr);
  let scoredWords = words.map(getBestFitTemplate);

  scoredWords.sort((a, b) => {
    // prefer persian over arabic
    if (b.persian || a.persian) {
      return b.persian - a.persian;
    }
    if (a.rate - b.rate > 0) {
      return -1;
    } else if (a.rate - b.rate === 0) {
      if (a.frequency === b.frequency) {
        return b.score - a.score;
      } else {
        return b.frequency - a.frequency;
      }
      return b.score - a.score;
    } else if (a.rate - b.rate < 0) {
      return 1;
    }
  });
  // TODO: score hejas properly
  return applyTemplateInPlace(scoredWords[0]);
}

const xRegex1 = /(خو)(ا|ی)(هر|هش|ب|ش|ن)/g;
const xRegex2 = /^ا/g;
const xRegex3 = /آ/g;
/**
 * @param {String} str
 */
function normalizeStr(str) {
  let nStr = str
    .replace(xRegex1, 'خ$2$3')
    .replace(xRegex2, 'ء')
    .replace(xRegex3, 'ءا');
  return nStr;
}

/**
 *
 * @param {Word} word
 */
function toPinglishHejas(word) {
  return word.map(toPinglishVajs);
}

export {
  generatePossibleWordShortMosavets,
  getPossibleDiacriticedWords,
  toPinglishHejas,
  getPossibleWords,
  getBestWordMatch,
  normalizeStr,
};
