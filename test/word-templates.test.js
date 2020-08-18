import arabic from '../src/word-templates/arabic';
import isEqual from 'lodash/isEqual';

describe('word-templates', () => {
  it("doesn't have exact duplicates", () => {
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
