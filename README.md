# Persian to Pinglish/Finglish Converter

This package aims to convert persian words to their pinglish/finglish forms.

It does it in it's own way.

This is still in development and barely does It's job. use at your own discretion.

You can see it in action [here](https://jd1378.github.io/persian-to-pinglish/).

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

let str = "ضعیف";
let convStr = p2f(str);
console.log(convStr); // "zaeef"
```

## important changes

### 0.5.0

Updated rollup config to produce a umd version that can be used in browser environment. main function renamed to `toPinglish`.
this can be accessed from `PersianToPinglish.toPinglish('yourstr')`
this is a breaking change from last version.

### 0.4.0

Since this version the method used to generate the output is drastically changed. it generates all possible hejas then tries to find the best matching template from defined templates (available in source). then applies the template to get the output.
since there's a lot of work in persian (especially because of prefix/suffixes), it won't support many words right now.

## Want to support this project ?

or want me full time on this project?
Send me an email on hotmail: javad.mnjd
