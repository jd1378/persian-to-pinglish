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
  for (let i = 0; i < actualWord.length && i < templatePattern.length; i++) {
    wordScore += calculateHejaFitScore(actualWord[i], templatePattern[i]);
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
    // prefer persian over arabic
    if (b.persian || a.persian) {
      return b.persian - a.persian;
    }
    if (a.rate - b.rate > 0) {
      return -1;
    } else if (a.rate - b.rate === 0) {
      if (a.score === b.score) {
        return b.frequency - a.frequency;
      } else {
        return b.score - a.score;
      }
      return b.score - a.score;
    } else if (a.rate - b.rate < 0) {
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
        fitResult.word[i][j].letter = fitResult.pattern[i][j].letter;
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
