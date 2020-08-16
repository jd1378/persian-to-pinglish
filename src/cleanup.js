const cleanupRegex = /[^0-9۰-۹a-zA-Zآابپتسجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]/g;
const alifRegex = /[اًٱأإ]/g; // not including آ due to different sound
const yehRegex = /[يىۍې]/g; // not including ئ due to different sound
const ehRegex = /[ەھهٔہ]/g;
const kehRegex = /[ك]/g;
const otherT = 'ة';

function cleanup(str) {
  return str
    .replace(alifRegex, 'ا')
    .replace(otherT, 'ت')
    .replace(ehRegex, 'ه')
    .replace(kehRegex, 'ک')
    .replace(yehRegex, 'ی')
    .replace(cleanupRegex, '');
}

export default cleanup;
