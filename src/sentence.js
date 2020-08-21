import { shortMosavets } from './vaj';
import { alifbaLetters, zwnj, tashdid } from './letter';

const shortMosavetChars = Object.keys(shortMosavets);
// seperation for readability in editor
const cleanupRegex = new RegExp(
  `[^0-9۰-۹a-zA-Z${alifbaLetters}\\s${zwnj}${shortMosavetChars}${tashdid}]`,
  'g'
);
const alifRegex = /[ٱأإ]/g; // not including آ due to different sound
const yehRegex = /[يىۍې]/g; // not including ئ due to different sound
const ehRegex = /[ەھہ]/g;
const kehRegex = /[ك]/g;
const tashdidRegex = new RegExp(`([${alifbaLetters}])${tashdid}`, 'g');
const otherT = 'ة';
const hamza = 'هٔ';

// if theres a connected-yeh with a lone yeh in front of it
const seperateYeAsWordRegex = new RegExp(
  `[ه]\\s[ی](?=[^${alifbaLetters}]{1}|$)`,
  'g'
);

// if theres a connected-yeh with a lone yeh in front of it
const seperateEyAsWordRegex = new RegExp(
  `[ه]\\s(ای)(?=[^${alifbaLetters}]{1}|$)`,
  'g'
);

const ownershipYeh = 'ه' + zwnj + 'ی';
const nakarehEy = 'ه' + zwnj + 'ای';

function cleanupStr(str) {
  return str
    .replace(alifRegex, 'ا')
    .replace(hamza, ownershipYeh)
    .replace(otherT, 'ت')
    .replace(ehRegex, 'ه')
    .replace(kehRegex, 'ک')
    .replace(yehRegex, 'ی')
    .replace(seperateYeAsWordRegex, ownershipYeh)
    .replace(seperateEyAsWordRegex, nakarehEy)
    .replace(tashdidRegex, '$1$1') // expands tashdid letters to two letters: جذّاب = جذذاب
    .replace(cleanupRegex, '');
}

const wordRegex = new RegExp(`[${alifbaLetters}${zwnj}\w]+`, 'g');

function getWords(str) {
  return Array.from(cleanupStr(str).matchAll(wordRegex)).map((regMatch) =>
    regMatch.toString()
  );
}

export { cleanupStr, getWords };
