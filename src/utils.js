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

function flatPossibilities(obj, soFar = []) {
  let p = [];
  if (Array.isArray(obj)) {
    let foundOnePath = false;
    for (let element of obj) {
      if (Array.isArray(element) && element[0].type === undefined) {
        if (element.length) {
          p.push(...flatPossibilities(element, [...soFar]));
        }
      } else {
        if (foundOnePath) soFar.pop();
        soFar = [...soFar, element];
        p.push([...soFar]);
        foundOnePath = true;
      }
    }
  } else {
    p.push([...soFar, obj]);
  }
  return p;
}

export default { isArrayEqual, factoriel, flatPossibilities };
export { isArrayEqual, factoriel, flatPossibilities };
