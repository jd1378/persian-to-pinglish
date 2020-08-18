# Word templates

This folder contains word patterns. we use these to see if a word can be read like the pattern or not

## Props

Each template has these properties:

### `pattern`

This is an array of Heja patterns.

In summary:

```js
Word = [Heja, Heja, ...]
```

and so word pattern is:

```js
WordPattern = [HejaPattern, HejaPattern, ...]
```

### `score`

It's the count of known vaj types and letters as a total.
known means not empty.

then another score is calculated based on how much of a word has same known vajs

higher percentage means means a better match

### `frequency`

It's an artificial opinionated score (for now).

higher `frequency` means a better match
