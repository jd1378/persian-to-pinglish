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

export default { all, confident, compound, uncertain };
export { all, confident, compound, uncertain };
