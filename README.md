## Persian to Pinglish/Finglish Converter

This package aims to convert persian words to their pinglish/finglish forms.

It does it in it's own way.

This is still in development.

## Usage

Add to your project:

```bash
npm add persian-to-pinglish
# or
yarn add persian-to-pinglish
```

then:

```js
const p2f = require('persian-to-pinglish'); // or use import

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
