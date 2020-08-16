const wordRegex = /[آابپتسجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]+/g;

function getWords(str) {
  return Array.from(str.matchAll(wordRegex)).map((regMatch) =>
    regMatch.toString()
  );
}

export default getWords;
