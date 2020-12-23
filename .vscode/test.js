
import {getPossibleDiacriticedWords, normalizeStr, toPinglishHejas, getBestWordMatch } from '../src/word';

const word = 'بحث';

/// const convertedWords = getPossibleDiacriticedWords(normalizeStr(word));

// console.log(convertedWords.map(wordParts => wordParts.map(h => h.map(v => v.letter)).flat().join('')+':'+toPinglishHejas(wordParts).flat().join('')).join('\n'));
///

let bestMatch = getBestWordMatch(word);
let bestMatchWord = bestMatch.word;
console.log(bestMatchWord.map(h => h.map(v => v.letter)).flat().join('')+':'+toPinglishHejas(bestMatchWord).flat().join(''));