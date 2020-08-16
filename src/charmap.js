import { zwnj } from './common';

const confident = {
  آ: 'aa',
  ب: 'b',
  پ: 'p',
  پ: 'p',
  ت: 't',
  ط: 't',
  ث: 's',
  س: 's',
  ص: 's',
  ج: 'j',
  چ: 'ch',
  ح: 'h',
  خ: 'kh',
  د: 'd',
  ذ: 'z',
  ز: 'z',
  ض: 'z',
  ظ: 'z',
  ر: 'r',
  ش: 'sh',
  ق: 'q',
  غ: 'q',
  ف: 'f',
  ک: 'k',
  گ: 'g',
  ل: 'l',
  م: 'm',
  ن: 'n',
  ژ: 'zh',
  ع: '',
};
// letters that are not included in confidentMap:
// ه و ی ا

const uncertain = {
  ا: 'a',
  ی: 'y',
  و: 'v',
  ه: 'h',
};

const all = {
  ...confident,
  ...uncertain,
};

const compound = {
  ['ه' + zwnj + 'ی']: 'eye',
};

function getUncertainAtFirst(letter) {
  switch (letter) {
    case 'ه':
      return (
        'h' +
        //TODO
        'a'
      );
      break;
    case 'ا':
      return 'a';
      break;
    case 'ی':
      return (
        'y' +
        //TODO
        'a'
      );
      break;
    case 'و':
      return (
        'v' +
        //TODO
        'a'
      );
      break;
    default:
      return '';
  }
}

function getUncertainAtSecond(letter) {
  switch (letter) {
    case 'ه':
      return 'e';
      break;
    case 'ا':
      return 'aa';
      break;
    case 'ی':
      return 'i';
      break;
    case 'و':
      return 'oo';
      break;
    default:
      return '';
  }
}

function getUncertainAtBoth(firstLetter, secondLetter) {
  switch (firstLetter) {
    case 'ه':
      switch (secondLetter) {
        case 'ه':
          return 'he';
        case 'ا':
          return 'haa';
        case 'ی':
          return 'hi';
        case 'و':
          return 'hoo';
      }
      break;
    case 'ا':
      switch (secondLetter) {
        case 'ه':
          return 'aah';
        case 'ا':
          return 'aa';
        case 'ی':
          return 'ay';
        case 'و':
          return 'oo';
      }
      break;
    case 'ی':
      switch (secondLetter) {
        case 'ه':
          return 'ye';
        case 'ا':
          return 'ya';
        case 'ی':
          return 'i';
        case 'و':
          return 'yoo';
      }
      break;
    case 'و':
      switch (secondLetter) {
        case 'ه':
          return 've';
        case 'ا':
          return 'vaa';
        case 'ی':
          return 'vi';
        case 'و':
          return 'oo';
      }
      break;
    default:
      return '';
  }
}

function getUncertainAtBothComplementary(firstLetter, secondLetter) {
  switch (firstLetter) {
    case 'ه':
      switch (secondLetter) {
        case 'ه':
          return 'e';
        case 'ا':
          return 'aa';
        case 'ی':
          return 'i';
        case 'و':
          return 'oo';
      }
      break;
    case 'ا':
      switch (secondLetter) {
        case 'ه':
          return 'h';
        case 'ا':
          return 'aa';
        case 'ی':
          return 'y';
        case 'و':
          return 'oo';
      }
      break;
    case 'ی':
      switch (secondLetter) {
        case 'ه':
          return 'e';
        case 'ا':
          return 'aa';
        case 'ی':
          return 'i';
        case 'و':
          return 'oo';
      }
      break;
    case 'و':
      switch (secondLetter) {
        case 'ه':
          return 'e';
        case 'ا':
          return 'aa';
        case 'ی':
          return 'i';
        case 'و':
          return 'oo';
      }
      break;
    default:
      return '';
  }
}

export default {
  all,
  confident,
  compound,
  uncertain,
  getUncertainAtFirst,
  getUncertainAtSecond,
  getUncertainAtBoth,
  getUncertainAtBothComplementary,
};
export {
  all,
  confident,
  compound,
  uncertain,
  getUncertainAtFirst,
  getUncertainAtSecond,
  getUncertainAtBoth,
  getUncertainAtBothComplementary,
};
