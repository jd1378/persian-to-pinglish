import { arabic } from './arabic';
import { persian } from './persian';
import { shortMosavets } from '../vaj';

function calculatePatternScore(pattern) {
  let score = 0;
  for (const heja of pattern) {
    for (const vaj of heja) {
      if (vaj.letter) {
        score++;
      }
      if (vaj.type && vaj.type !== 'u') {
        score++;
      }
    }
  }
  return score;
}

/**
 * @typedef {import('../vaj').Vaj} Vaj
 */

/**
 * @typedef {import('../heja').Heja} Heja
 */
/**
 * @typedef {import('../word').Word} Word
 */

/**
 * @param {Heja} actual
 * @param {Heja} templateHeja
 */
function calculateHejaFitScore(actual, templateHeja, prevHeja) {
  let actualScore = 0;
  if (actual.length === templateHeja.length) {
    for (let i = 0; i < actual.length; i++) {
      if (actual[i].type && templateHeja[i].type) {
        if (actual[i].type === templateHeja[i].type) {
          actualScore++;
        } else {
          actualScore--;
        }
      }
      if (actual[i].letter && templateHeja[i].letter) {
        if (actual[i].letter === templateHeja[i].letter) {
          actualScore++;
        } else {
          actualScore--;
        }
      }
      if (templateHeja[i].dupe) {
        if (prevHeja[prevHeja.length - 1].letter === actual[i].letter) {
          actualScore++;
        } else {
          actualScore--;
        }
      }
    }
  }
  return actualScore;
}

/**
 * @param {Word} actualWord
 * @param {Word} templatePattern
 */
function calculateWordFitScore(actualWord, templatePattern) {
  let wordScore = 0;
  for (let i = 0; i < actualWord.length && i < templatePattern.length; i++) {
    wordScore += calculateHejaFitScore(
      actualWord[i],
      templatePattern[i],
      i > 0 ? actualWord[i - 1] : undefined
    );
  }
  return wordScore;
}

function getWordFitScore(actualWord, templatePattern) {
  let templateScore = calculatePatternScore(templatePattern);

  if (actualWord.length !== templatePattern.length || templateScore === 0) {
    return { score: 0, rate: 0 }; // we don't need these
  }

  let wordScore = calculateWordFitScore(actualWord, templatePattern);
  return { score: wordScore, rate: wordScore / templateScore };
}

function getScoredTemplate(actualWord, wordTemplate) {
  let scoreData = getWordFitScore(actualWord, wordTemplate.pattern);
  let tWithScore = { word: actualWord, ...wordTemplate, ...scoreData };
  return tWithScore;
}

/**
 * @param {Word} actualWord
 */
function getBestFitTemplate(actualWord) {
  const tArr = [];
  for (const t of persian) {
    let result = getScoredTemplate(actualWord, t);
    if (result.score !== 0) {
      result.persian = true;
      tArr.push(result);
    }
  }
  for (const t of arabic) {
    let result = getScoredTemplate(actualWord, t);
    if (result.score !== 0) {
      result.arabic = true;
      tArr.push(result);
    }
  }
  // from highest to lowest
  tArr.sort((a, b) => {
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
  // return the template with highest score
  return tArr.length && tArr[0];
}

function applyTemplateInPlace(fitResult) {
  for (
    let i = 0;
    i < fitResult.pattern.length && i < fitResult.word.length;
    i++
  ) {
    for (
      let j = 0;
      j < fitResult.pattern[i].length && j < fitResult.word[i].length;
      j++
    ) {
      // it always have type I guess.
      if (fitResult.pattern[i][j].letter) {
        // don't replace short mosavets of actual words, because they are helpers
        if (!shortMosavets[fitResult.word[i][j].letter]) {
          fitResult.word[i][j].letter = fitResult.pattern[i][j].letter;
        }
      }
    }
  }
  return fitResult;
}

export {
  calculatePatternScore,
  calculateHejaFitScore,
  getScoredTemplate,
  getWordFitScore,
  getBestFitTemplate,
  applyTemplateInPlace,
  arabic,
  persian,
};
