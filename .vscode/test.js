
// import {getPossibleDiacriticedWords, normalizeStr, toPinglishHejas, getBestWordMatch } from '../src/word';
import { toPinglishHejas, getBestWordMatch } from '../src/index';

const word = 'اُستخوان';

/// const convertedWords = getPossibleDiacriticedWords(normalizeStr(word));

// console.log(convertedWords.map(wordParts => wordParts.map(h => h.map(v => v.letter)).flat().join('')+':'+toPinglishHejas(wordParts).flat().join('')).join('\n'));
///

let bestMatch = getBestWordMatch(word);
let bestMatchWord = bestMatch.word;
console.log(
  // the pattern:
  bestMatchWord.map(h => h.map(v => v.letter)).flat().join(''),
  // pinglish:
  toPinglishHejas(bestMatchWord).flat().join(''),
);