const wordRegex = /[آابپتسجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]+/g;

function getWords(str) {
  return Array.from(str.matchAll(wordRegex));
}

export default getWords;
