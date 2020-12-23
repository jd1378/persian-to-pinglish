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
  // فل
  {
    swingAr: 'فَل',
    swing: 'fal',
    frequency: 1,
    pattern: [
      // fal
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
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
        { type: 'm', letter: eM },
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
        { type: 'm', letter: aM },
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
