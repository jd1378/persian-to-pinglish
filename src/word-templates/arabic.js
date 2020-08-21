import { aM, oM, eM } from '../vaj';
// s = samet
// m = mosavet
// these are heja maps
// each word has one or more heja
// each heja has two to four vaj
// each vaj can be samet (s) or mosavet (m)

// these may be different from their original form
const arabic = [
  // ######################################################### names
  // فاعل
  // fa el
  {
    frequency: 0,
    pattern: [
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // مفعول
  // maf ool
  {
    frequency: 0,
    pattern: [
      // maf
      [
        { type: 's', letter: 'م' },
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
  // -----
  // فعیل
  // fa eel
  {
    frequency: 1,
    pattern: [
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // eel
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ی' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // مفعل
  // (not repeating maf al because not frequent)
  // maf el
  {
    frequency: 0,
    pattern: [
      // maf
      [
        { type: 's', letter: 'م' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // فَعَل
  // fa al
  {
    frequency: 0,
    pattern: [
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // al
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // فعلان
  // fe' lan
  {
    frequency: 0,
    pattern: [
      // fe'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // lan
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: 'ن' },
      ],
    ],
  },
  // -----
  // فَعل
  // fa'l
  {
    frequency: 1, // +1 over fa al
    pattern: [
      // fa'l
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // فَعّال
  // fa' aal
  {
    frequency: 0,
    pattern: [
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // aal
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // فعّیل
  // fe' eel
  {
    frequency: 0,
    pattern: [
      // fe'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // eel
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: 'ی' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // فَعِل
  // fa el
  {
    frequency: 0,
    pattern: [
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // فعول
  // fa ool
  {
    frequency: 0,
    pattern: [
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // ool
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'و' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // افعل
  // af al
  {
    frequency: 0,
    pattern: [
      // af
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // al
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // فعلی
  // fo' laa
  {
    frequency: 0,
    pattern: [
      // fo'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM },
        { type: 's', letter: '' },
      ],
      // laa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
      ],
    ],
  },
  // -----
  // مِفعَل
  // mef al
  {
    frequency: 0,
    pattern: [
      // mef
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // al
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // مِفْعَلَة
  // mef a la
  {
    frequency: 0,
    pattern: [
      // mef
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
    ],
  },
  // -----
  // مفْعال
  // mef aal
  {
    frequency: 0,
    pattern: [
      // mef
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // aal
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // ######################################################### Verbs
  // افعال
  // af a la
  {
    frequency: 0,
    pattern: [
      // af
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: '' },
      ],
    ],
  },
  // yof e lo
  {
    frequency: 0,
    pattern: [
      // yof
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: oM },
        { type: 's', letter: '' },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: '' },
      ],
    ],
  },
  // af el
  {
    frequency: 0,
    pattern: [
      // af
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // ef aal
  {
    frequency: 0,
    pattern: [
      // ef
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // aal
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // انفعال
  // en fa a la
  {
    frequency: 0,
    pattern: [
      // en
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: 'ن' },
      ],
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
    ],
  },
  // yan fa e lo
  {
    frequency: 0,
    pattern: [
      // yan
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM },
        { type: 's', letter: 'ن' },
      ],
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM },
      ],
    ],
  },
  // en fa el
  {
    frequency: 0,
    pattern: [
      // en
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: 'ن' },
      ],
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // en fe aal
  {
    frequency: 0,
    pattern: [
      // en
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: 'ن' },
      ],
      // fe
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
      ],
      // aal
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // افتعال
  // ef ta a la
  {
    frequency: 0,
    pattern: [
      // ef
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: eM },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
    ],
  },
  // yaf ta e lo
  {
    frequency: 0,
    pattern: [
      // yaf
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM },
      ],
    ],
  },
  // ef ta el
  {
    frequency: 0,
    pattern: [
      // ef
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // ef te aal
  {
    frequency: 0,
    pattern: [
      // ef
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // te
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: eM },
      ],
      // aal
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // استفعال
  // es taf a la
  {
    frequency: 0,
    pattern: [
      // es
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: 'س' },
      ],
      // taf
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
    ],
  },
  // yas taf e lo
  {
    frequency: 0,
    pattern: [
      // yas
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM },
        { type: 's', letter: 'س' },
      ],
      // taf
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM },
      ],
    ],
  },
  // es taf el
  {
    frequency: 0,
    pattern: [
      // es
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: 'س' },
      ],
      // taf
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // es tef aal
  {
    frequency: 0,
    pattern: [
      // es
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM },
        { type: 's', letter: 'س' },
      ],
      // tef
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
      // aal
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // تفعیل
  // fa' a la
  {
    frequency: 0,
    pattern: [
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
    ],
  },
  // yo fa' e lo
  {
    frequency: 0,
    pattern: [
      // yo
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: oM },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // e
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: eM },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM },
      ],
    ],
  },
  // fa' el
  {
    frequency: 0,
    pattern: [
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // el
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: eM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // taf eel
  {
    frequency: 0,
    pattern: [
      // taf
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // eel
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ی' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // تَفَعُّل
  // ta fa' a la
  {
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
    ],
  },
  // ya ta fa' a lo
  {
    frequency: 0,
    pattern: [
      // ya
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: aM },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM },
      ],
    ],
  },
  // ta fa' al
  {
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // al
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // ta fa' ol
  {
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
      // ol
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: oM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // تَفاعل
  // ta faa a la
  {
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // faa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
    ],
  },
  // ya ta faa a lo
  {
    frequency: 0,
    pattern: [
      // ya
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // faa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM },
      ],
    ],
  },
  // ta faa al
  {
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // faa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
      // al
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // ta faa ol
  {
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM },
      ],
      // faa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
      // ol
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  // مفاعَلَه
  // faa a la
  {
    frequency: 0,
    pattern: [
      // faa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
    ],
  },
  // yo faa e lo
  {
    frequency: 0,
    pattern: [
      // yo
      [
        { type: 's', letter: 'ی' },
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
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM },
      ],
    ],
  },
  // faa el ######## duplicate of faa el (name)
  // [
  //   // faa
  //   [
  //     { type: 's', letter: '' },
  //     { type: 'm', letter: 'ا' },
  //   ],
  //   // el
  //   [
  //     { type: 's', letter: '' },
  //     { type: 'm', letter: eM },
  //     { type: 's', letter: '' },
  //   ],
  // ],
  // mo faa a la
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
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM },
      ],
    ],
  },
];

export default arabic;
export { arabic };
