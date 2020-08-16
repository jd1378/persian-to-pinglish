## Persian to Pinglish/Finglish Converter

This package aims to convert persian words to their pinglish/finglish forms.

Some ideas were taken from [pinglish](https://www.npmjs.com/package/pinglish) and [f2f](https://www.npmjs.com/package/f2f), but is different.

## Usage

Add to your project:

```bash
npm add persian-to-pinglish
# or
yarn add persian-to-pinglish
```

then:

```js
const p2f = require ('persian-to-pinglish');

let str = "یه چیزی";
let convStr = p2f(str);
console.log(convStr); 
// prints "ye chizi"

// you can also use custom seperator
// example:

let str = "یه چیزی";
let convStr = p2f(str, { join: '-' });
console.log(convStr); 
// prints "ye-chizi"
```
