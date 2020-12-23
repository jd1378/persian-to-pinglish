import { getStrVajPattern, shortMosavets, longMosavetLetters, eM } from './vaj';
import { all as allCharMaps, mosavet } from './charmap';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Definition of a "Heja" in this library:
 * A heja is an array of "Vaj".
 * @typedef {Array<import('./vaj').Vaj>} Heja
 */

// every beginning heja has either two or three vaj
// every ending heja has two to four vaj
// second vaj in every heja is ALWAYS mosavet
// third vaj in every heja is optional, and it should samet
// theres never 2 mosavet in a heja
// theres never 3 samet in a row

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

      if (pattern[2].letter === 'چ' && ['ل', 'ر'].includes(pattern[3].letter)) {
        // TODO: Not sure
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
 * @param {String} normStr
 * @param {Number} take - how many letters to take from the normStr
 * @param {Number} iter
 */
function getNextHeja(normStr, take, iter) {
  if (normStr.length < take) return [false];
  if (iter === 0 && take === 4) return [false];

  let returnWord = normStr.substring(take);
  if (returnWord.length === 0 && normStr.length === 1) return [false];
  let vajPattern = getStrVajPattern(normStr.substr(0, take));
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
      letter: '',
      short: true,
    });
  } else if (vajPattern.length === 1) {
    vajPattern.push({
      type: 'm',
      letter: '',
      short: true,
    });
  }
  if (!isValidHeja(vajPattern)) return [false];

  if (
    returnWord.length === 0 &&
    vajPattern.length === 3 &&
    vajPattern[2].letter === 'ه' &&
    !longMosavetLetters.includes(vajPattern[1].letter) &&
    iter !== 0
  ) {
    vajPattern.splice(2);
    vajPattern[1].letter = eM;
  }

  return [vajPattern, returnWord];
}

/**
 *
 * @param {String} normStr - a normalized string containing only one persian word
 * @param {Number} iter - how deep are we in recursion
 */
function getPossibleHejaPatternsRecursive(normStr, iter = 0) {
  let hejaPossibilities = [];
  for (let take = 1; take <= 4; take++) {
    let [heja, remainingWord] = getNextHeja(normStr, take, iter);
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

function stripShortMosavets(heja) {
  let copy = cloneDeep(heja);
  for (let vaj of copy) {
    if (vaj.letter in shortMosavets) {
      vaj.letter = '';
    }
  }
  return copy;
}

/**
 *
 * @param {Heja} heja
 */
function generatePossibleHejaShortMosavets(heja) {
  let p = [];
  if (longMosavetLetters.includes(heja[1].letter)) {
    p.push(heja);
  } else {
    Object.keys(shortMosavets).forEach((sM) => {
      let copy = cloneDeep(heja);
      copy[1].letter = sM;
      copy[1].short = true;
      p.push(copy);
    });
  }
  return p;
}

function toPinglishVajs(heja) {
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
}

export {
  getPossibleHejaPatternsRecursive,
  stripShortMosavets,
  generatePossibleHejaShortMosavets,
  toPinglishVajs,
};
