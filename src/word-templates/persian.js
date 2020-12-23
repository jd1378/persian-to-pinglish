import { oM, eM } from '../vaj';

const persian = [
  // مفاعله
  // from arabic, but persianized
  // mo faa e le
  {
    swingAr: 'مُفاعَلَ',
    swing: 'mo faa a la',
    frequency: 1,
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

const persianPrefix = [
  {
    pattern: [
      [
        { type: 's', letter: 'م' },
        { type: 'm', letter: 'ی' },
      ],
    ],
  },
  {
    pattern: [
      [
        { type: 's', letter: 'ب' },
        { type: 'm', letter: eM },
      ],
    ],
  },
];

const persianSuffix = [
  {
    pattern: [
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: eM },
      ],
    ],
  },
  {
    pattern: [
      [
        { type: 's', letter: 'ا' },
        { type: 'm', letter: 'ی' },
      ],
    ],
  },
];

export { persian, persianPrefix, persianSuffix };
