const wordRegex = /[آابپتسجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]+/g;

function getWords(str) {
  return wordRegex.exec(str);
}

export default getWords;
