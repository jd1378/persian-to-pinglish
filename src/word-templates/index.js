import arabic from './arabic';
import persian from './persian';

function calculatePatternScore(pattern) {
  let score = 0;
  for (const heja of pattern) {
    for (const vaj of heja) {
      if (vaj.letter) {
        score++;
      }
      if (vaj.type && vaj.type !== 'u') {
        score++;
      }
    }
  }
  return score;
}

export default { calculatePatternScore, arabic, persian };
export { calculatePatternScore, arabic, persian };
