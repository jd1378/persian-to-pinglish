import { oM, eM, aM } from '../vaj';

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
        { type: 'm', letter: oM, short: true },
      ],
      // faa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
      ],
      // le
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
      ],
    ],
  },
  // فل
  {
    swingAr: 'فَل',
    swing: 'fal',
    frequency: 1,
    pattern: [
      // fal
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // [s]eM
  {
    swingAr: 'فِ',
    swing: 'fe',
    frequency: 1.5,
    pattern: [
      // fe
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
      ],
    ],
  },
  // مفعول
  // somewhat same swing, but not including 'م' in pattern
  {
    swingAr: 'مَفعول',
    swing: 'maf ool',
    frequency: 0.3,
    pattern: [
      // maf
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // ool
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'و' },
        { type: 's', letter: '' },
      ],
    ],
  },
  {
    swingAr: 'مَفعِلَت',
    swing: 'maf e lat',
    frequency: 0.1,
    pattern: [
      // maf
      [
        { type: 's', letter: 'م' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
      ],
      // lat
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: 'ت' },
      ],
    ],
  },
  {
    swingAr: 'فَشْتْی',
    swing: 'fash ti',
    frequency: 0.1,
    pattern: [
      // fash
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: 'ش' },
      ],
      // li
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: 'ی' },
      ],
    ],
  },
  {
    swingAr: 'فول',
    swing: 'fool',
    frequency: 0.1,
    pattern: [
      // fool
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'و' },
        { type: 's', letter: '' },
      ],
    ],
  },
  {
    swingAr: 'فیلا',
    swing: 'fi la',
    frequency: 0.1,
    pattern: [
      // fi
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ی' },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
      ],
    ],
  },
  {
    swingAr: 'فیل',
    swing: 'fil',
    frequency: 0.1,
    pattern: [
      // fil
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ی' },
        { type: 's', letter: '' },
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
        { type: 'm', letter: eM, short: true },
      ],
    ],
  },
];

const persianSuffix = [
  {
    pattern: [
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: eM, short: true },
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
