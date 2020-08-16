const cleanupRegex = /[^0-9۰-۹a-zA-Zآابپتسجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]/g;
const alifRegex = /[اًٱأإ]/g; // not including آ due to different sound
const yehRegex = /[يىۍې]/g; // not including ئ due to different sound
const tehRegex = /[ەھهٔةہ]/g;
const kehRegex = /[ك]/g;

function cleanup(str) {
  return str
    .replace(alifRegex, 'ا')
    .replace(tehRegex, 'ه')
    .replace(kehRegex, 'ک')
    .replace(yehRegex, 'ی')
    .replace(cleanupRegex, '');
}

export default cleanup;
