import { flatPossibilities, cartesianProduct } from './utils';
import {
  toPinglishVajs,
  getPossibleHejaPatternsRecursive,
  generatePossibleHejaShortMosavets,
} from './heja';
import { getBestFitTemplate, applyTemplateInPlace } from './word-templates';
import convert from './heuristic';
import { eM } from './vaj';

/**
 * Definition of a "Word" in this library:
 * A word is an array of "Heja".
 * @typedef {Array<import('./heja').Heja>} Word
 */

/**
 * Definition of a "BestMatch" in this library:
 * @typedef {Object} BestMatch
 * @property {Word} word
 * @property {{
 *  word: Word,
 *  heuristic: true,
 * }} [heuristic]
 * @property {Number} frequency
 * @property {Number} score - how many letters/thigns of the word is same as in template
 * @property {Number} rate - is resulted from "score / templateScore", templateScore is the count of known things in pattern
 * @property {Word} Pattern - the matched pattern
 */

/**
 * Returns an array of possible words from a normalized string.
 * @param {String} normStr - a normalized string containing only one persian word
 * @returns {Array<Word>}
 */
function getPossibleWords(normStr) {
  let possibleWords = getPossibleHejaPatternsRecursive(normStr);
  let fp = flatPossibilities(possibleWords);
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
 * @returns {BestMatch}
 */
function getBestWordMatch(persianWordStr) {
  let nStr = normalizeStr(persianWordStr);

  // heuristic for 1 letters
  if (nStr.length === 1) {
    return {
      heuristic: true,
      word: [Array.from(convert(nStr))],
    };
  }

  let words = getPossibleWords(nStr);
  let scoredWords = words.map(getBestFitTemplate);

  scoredWords.sort((a, b) => {
    if (a.rate - b.rate > 0) {
      return -1;
    } else if (a.rate - b.rate === 0) {
      if (a.score === b.score) {
        if (a.frequency === b.frequency) {
          // prefer persian over arabic
          if (b.persian || a.persian) {
            return b.persian - a.persian;
          } else {
            return 0;
          }
        } else {
          return b.frequency - a.frequency;
        }
      } else {
        return b.score - a.score;
      }
    } else {
      // if (a.rate - b.rate < 0)
      return 1;
    }
  });
  // TODO: score hejas properly
  return applyTemplateInPlace(scoredWords[0]);
}

const xRegex1 = /(خو)(ا|ی)(هر|هش|ب|ش|ن)/g;
const xRegex2 = /^ا/g;
const xRegex3 = /آ/g;
const xRegex4 = /^([^ردذزژوظطضص])ه$/g;
/**
 * @param {String} str
 */
function normalizeStr(str) {
  let nStr = str
    .replace(xRegex1, 'خ$2$3')
    .replace(xRegex2, 'ء')
    .replace(xRegex3, 'ءا')
    .replace(xRegex4, '$1' + eM);
  return nStr;
}

/**
 *
 * @param {BestMatch} bestMatch
 */
function toPinglishHejas(bestMatch) {
  if (bestMatch.heuristic) {
    return bestMatch.word;
  }
  return bestMatch.word.map(toPinglishVajs);
}

export {
  generatePossibleWordShortMosavets,
  getPossibleDiacriticedWords,
  toPinglishHejas,
  getPossibleWords,
  getBestWordMatch,
  normalizeStr,
};
