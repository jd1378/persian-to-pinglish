import { aM, eM, oM } from './vaj';

//
// This is just an idea, It can't be done without machine learning.
// but there is no data sets available to make this.
//

const scores = {
  آ: 0,
  ع: 0,
  ا: 1,
  ء: 5,
  ب: 1,
  پ: 1,
  ت: -2,
  ط: 1,
  ث: 1,
  س: 1,
  ص: 5,
  ج: 3,
  چ: 4,
  ح: 1,
  خ: 1,
  د: 1,
  ذ: 2,
  ز: 2,
  ض: 2,
  ظ: 2,
  ر: 1,
  ش: 7,
  ق: 1,
  غ: 0.5,
  ف: 5,
  ک: -3,
  گ: 6,
  ل: -1.5,
  م: -1.2,
  ن: 2,
  ژ: 1,

  '': 0,
  و: 0,
  ی: 0,
  ه: 0,
};

function getBestConnector(l1, l2) {
  if (scores[l1] + scores[l2] === 0) return '';

  if (scores[l1] + scores[l2] < 3) {
    return aM;
  } else if (scores[l1] + scores[l2] < 6) {
    return oM;
  } else {
    return eM;
  }
}

export default { getBestConnector };
export { getBestConnector };
