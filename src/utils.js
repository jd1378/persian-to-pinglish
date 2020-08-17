function isArrayEqual(arr1, arr2) {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  // Otherwise, return true
  return true;
}

const commonFactoriel = [1, 2, 6, 24, 120, 720]; // 1-6!
function factoriel(n) {
  if (n < 1 || n > 6) {
    return 0;
  }
  return commonFactoriel[n - 1];
}

function isHeja(object) {
  if (Array.isArray(object) && object[0].type) return true;
  return false;
}

function flatPossibilities(obj, soFar = []) {
  if (!obj.length) return [];

  let p = [];
  if (obj.every(isHeja)) {
    // leaf
    obj.forEach((o) => {
      p.push([...soFar, o]);
    });
  } else {
    for (let el of obj) {
      if (isHeja(el)) {
        if (el !== obj[0]) {
          // if not the first, then rest probably don't depend on it ?
          p.push([...soFar, el]);
        }
        soFar = [...soFar, obj[0]];
      } else {
        // go deeper
        p.push(...flatPossibilities(el, [...soFar]));
      }
    }
  }
  return p;
}

export default { isArrayEqual, factoriel, flatPossibilities };
export { isArrayEqual, factoriel, flatPossibilities };
