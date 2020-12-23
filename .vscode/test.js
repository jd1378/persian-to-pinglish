
// import {getPossibleDiacriticedWords, normalizeStr, toPinglishHejas, getBestWordMatch } from '../src/word';
import { toPinglishHejas, getBestWordMatch } from '../src/index';
import p2f from '../src/index';

const word = 'ضعیف';

/// const convertedWords = getPossibleDiacriticedWords(normalizeStr(word));

// console.log(convertedWords.map(wordParts => wordParts.map(h => h.map(v => v.letter)).flat().join('')+':'+toPinglishHejas(wordParts).flat().join('')).join('\n'));
///

let bestMatch = getBestWordMatch(word);
console.log(
  // the pattern:
  bestMatch.word.map(h => h.map(v => v.letter)).flat().join(''),
  // pinglish:
  toPinglishHejas(bestMatch).flat().join(''),
);

const sentence = "علی به خانه رفت";
console.log(p2f(sentence));
