import { oM, eM } from '../vaj';

const persian = [
  // مفاعله
  // from arabic, but persianized
  // mo faa e le
  {
    frequency: 0,
    pattern: [
      // mo
      [
        { type: 's', letter: 'م' },
        { type: 'm', letter: oM },
      ],
      // faa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
      ],
      // le
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
      ],
    ],
  },
];

export default persian;
export { persian };
