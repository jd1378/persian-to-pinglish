// seperation for readability in editor
const alifbaLetters = 'آابپتسجچحخدذرزژسشصضطظعغفقکگلمنوهیئ';
const zwnj = '\u200c';

const cleanupRegex = new RegExp(
  `[^0-9۰-۹a-zA-Z${alifbaLetters}\s${zwnj}]`,
  'g'
);
const alifRegex = /[اًٱأإ]/g; // not including آ due to different sound
const yehRegex = /[يىۍې]/g; // not including ئ due to different sound
const ehRegex = /[ەھہ]/g;
const kehRegex = /[ك]/g;
const otherT = 'ة';
const hamza = 'هٔ';

// if theres a connected-yeh with a lone yeh in front of it
const seperateYeAsWordRegex = new RegExp(`[ه]\\s[ی][^${alifbaLetters}]*`, 'g');

const ownershipYeh = 'ه' + zwnj + 'ی';

function cleanup(str) {
  return str
    .replace(alifRegex, 'ا')
    .replace(hamza, ownershipYeh)
    .replace(otherT, 'ت')
    .replace(ehRegex, 'ه')
    .replace(kehRegex, 'ک')
    .replace(yehRegex, 'ی')
    .replace(seperateYeAsWordRegex, ownershipYeh)
    .replace(cleanupRegex, '');
}

export default cleanup;
