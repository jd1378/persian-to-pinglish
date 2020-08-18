import { calculatePatternScore, arabic } from '../src/word-templates';
import isEqual from 'lodash/isEqual';
import { aM } from '../src/vaj';

describe('word-templates', () => {
  describe('patterns', () => {
    describe('duplicates', () => {
      it("doesn't have exact duplicate patterns", () => {
        let all = [...arabic];
        let duplicates = [];
        for (let wt of all) {
          all.forEach((_) => {
            if (isEqual(_.pattern, wt.pattern)) {
              duplicates.push(_);
            }
          });
          if (duplicates.length > 1) {
            break;
          } else if (duplicates.length === 1) {
            duplicates.pop();
          }
        }
        expect(duplicates.length).toBe(0);
      });
    });

    describe('score calculation', () => {
      it('counts non-empty letter as 1 score', () => {
        const testPatt0 = [[{ letter: '' }]];
        const testPatt1 = [[{ letter: '1' }]];

        expect(calculatePatternScore(testPatt0)).toBe(0);
        expect(calculatePatternScore(testPatt1)).toBe(1);
      });

      it('counts non-empty-non-standard letter as 1 score', () => {
        const patt = [[{ letter: aM }]];

        expect(calculatePatternScore(patt)).toBe(1);
      });

      it('counts letters in multiple vajs in the same heja', () => {
        const patt = [[{ letter: '1' }, { letter: '1' }]];
        expect(calculatePatternScore(patt)).toBe(2);
      });

      it('counts letters in multiple vajs across hejas', () => {
        const patt = [[{ letter: '1' }], [{ letter: '1' }]];
        expect(calculatePatternScore(patt)).toBe(2);
      });

      it('counts `u` type vaj as 0 score', () => {
        const patt = [[{ type: 'u' }]];

        expect(calculatePatternScore(patt)).toBe(0);
      });

      it('counts non empty type as 1 score', () => {
        const patt = [[{ type: 'z' }]];

        expect(calculatePatternScore(patt)).toBe(1);
      });
    });
  });
});
