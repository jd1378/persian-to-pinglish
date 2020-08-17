
import {getHejas, normalizeWord, replaceWithEnglish} from '../src/heja';

const word = 'قسطنطنیه';

const convertedWords = getHejas(normalizeWord(word));

console.log(convertedWords.map(wordParts => wordParts.map(h => h.map(v => v.letter)).flat().join('')+':'+replaceWithEnglish(wordParts).flat().join('')).join('\n'));
