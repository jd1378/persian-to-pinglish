import arabic from './arabic';
import persian from './persian';

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
 * @param {Heja} templatePattern
 */
function calculateHejaFitScore(actual, templatePattern) {
  let actualScore = 0;
  if (actual.length === templatePattern.length) {
    for (let i = 0; i < actual.length; i++) {
      if (actual[i].type && actual[i].type === templatePattern[i].type) {
        actualScore++;
      }
      if (actual[i].letter && actual[i].letter === templatePattern[i].letter) {
        actualScore++;
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
  for (let i = 0; i < actualWord.length; i++) {
    wordScore += calculateHejaFitScore(actualWord[i], templatePattern[i]);
  }
  return wordScore;
}

function getWordFitScore(actualWord, templatePattern) {
  let templateScore = calculatePatternScore(templatePattern);

  if (templateScore !== 0) {
    let wordScore = calculateWordFitScore(actualWord, templatePattern);
    return { score: wordScore, rate: wordScore / templateScore };
  } else {
    return { score: 0, rate: 0 };
  }
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
    tArr.push(getScoredTemplate(actualWord, t));
  }
  for (const t of arabic) {
    tArr.push(getScoredTemplate(actualWord, t));
  }
  // from highest to lowest
  tArr.sort((a, b) => {
    if (a.rate - b.rate > 0) {
      return -1;
    } else if (a.rate - b.rate === 0) {
      return b.score - a.score;
    } else if (a.rate - b.rate < 0) {
      return 1;
    }
  });
  // return the template with highest score
  return tArr.length && tArr[0];
}

export default {
  calculatePatternScore,
  calculateHejaFitScore,
  getScoredTemplate,
  getWordFitScore,
  getBestFitTemplate,
  arabic,
  persian,
};
export {
  calculatePatternScore,
  calculateHejaFitScore,
  getScoredTemplate,
  getWordFitScore,
  getBestFitTemplate,
  arabic,
  persian,
};
