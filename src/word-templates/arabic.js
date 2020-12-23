import { aM, oM, eM } from '../vaj';
// s = samet
// m = mosavet
// these are heja maps
// each word has one or more heja
// each heja has two to four vaj
// each vaj can be samet (s) or mosavet (m)

// swing is for debugging purposes

// these may be different from their original form
const arabic = [
  // ######################################################### names
  {
    swingAr: 'فاعل',
    swing: 'fa el',
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
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'مَفعول',
    swing: 'maf ool',
    frequency: 0,
    pattern: [
      // maf
      [
        { type: 's', letter: 'م' },
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
  // -----
  {
    swingAr: 'فعیل',
    swing: 'fa eel',
    frequency: 1,
    pattern: [
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
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
  // (not repeating maf al because not frequent)
  {
    swingAr: 'مفعِل',
    swing: 'maf el',
    frequency: 0,
    pattern: [
      // maf
      [
        { type: 's', letter: 'م' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'فَعَل',
    swing: 'fa al',
    frequency: 0,
    pattern: [
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // al
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'فعلان',
    swing: "fe' lan",
    frequency: 0,
    pattern: [
      // fe'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
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
  {
    swingAr: 'فَعل',
    swing: "fa'l",
    frequency: 1, // +1 over fa al
    pattern: [
      // fa'l
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'فَعّال',
    swing: "fa' aal",
    frequency: 0,
    pattern: [
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
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
  {
    swingAr: 'فعّیل',
    swing: "fe' eel",
    frequency: 0,
    pattern: [
      // fe'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
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
  {
    swingAr: 'فَعِل',
    swing: 'fa el',
    frequency: 0,
    pattern: [
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'فعول',
    swing: 'fa ool',
    frequency: 0,
    pattern: [
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
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
  {
    swingAr: 'افعل',
    swing: 'af al',
    frequency: 0,
    pattern: [
      // af
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // al
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'فعلی',
    swing: "fo' laa",
    frequency: 0,
    pattern: [
      // fo'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM, short: true },
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
  {
    swingAr: 'مِفعَل',
    swing: 'mef al',
    frequency: 0,
    pattern: [
      // mef
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
      // al
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'مِفْعَلَة',
    swing: 'mef a la',
    frequency: 0,
    pattern: [
      // mef
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
    ],
  },
  // -----
  {
    swingAr: 'مفْعال',
    swing: 'mef aal',
    frequency: 0,
    pattern: [
      // mef
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
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
  {
    swingAr: 'افعال',
    swing: 'af a la',
    frequency: 0,
    pattern: [
      // af
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: '' },
      ],
    ],
  },
  // ----------
  {
    swingAr: 'یُفعِلُ',
    swing: 'yof e lo',
    frequency: 0,
    pattern: [
      // yof
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: oM, short: true },
        { type: 's', letter: '' },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: '' },
      ],
    ],
  },
  // -------
  {
    swingAr: 'افعِل',
    swing: 'af el',
    frequency: 0,
    pattern: [
      // af
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  {
    swingAr: 'افعال',
    swing: 'ef aal',
    frequency: 0,
    pattern: [
      // ef
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
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
  {
    swingAr: 'انفَعَل',
    swing: 'en fa a la',
    frequency: 0,
    pattern: [
      // en
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: 'ن' },
      ],
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
    ],
  },
  // -------
  {
    swingAr: 'یَنفَعِلُ',
    swing: 'yan fa e lo',
    frequency: 0,
    pattern: [
      // yan
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: 'ن' },
      ],
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM, short: true },
      ],
    ],
  },
  // --------
  {
    swingAr: 'انفَعِل',
    swing: 'en fa el',
    frequency: 0,
    pattern: [
      // en
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: 'ن' },
      ],
      // fa
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  //
  {
    swingAr: 'انفعال',
    swing: 'en fe aal',
    frequency: 0,
    pattern: [
      // en
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: 'ن' },
      ],
      // fe
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
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
  {
    swingAr: 'افتَعَلَ',
    swing: 'ef ta a la',
    frequency: 0,
    pattern: [
      // ef
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
    ],
  },
  //
  {
    swingAr: 'یَفتَعِلُ',
    swing: 'yaf ta e lo',
    frequency: 0,
    pattern: [
      // yaf
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM, short: true },
      ],
    ],
  },
  // -----
  {
    swingAr: 'افتَعِل',
    swing: 'ef ta el',
    frequency: 0,
    pattern: [
      // ef
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // ------
  {
    swingAr: 'افتعال',
    swing: 'ef te aal',
    frequency: 0,
    pattern: [
      // ef
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
      // te
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: eM, short: true },
      ],
      // aal
      [
        { type: 's', letter: '' },
        { type: 'm', letter: 'ا' },
        { type: 's', letter: '' },
      ],
    ],
  },
  // ----- استفعال
  {
    swingAr: 'استفعَلَ',
    swing: 'es taf a la',
    frequency: 0,
    pattern: [
      // es
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: 'س' },
      ],
      // taf
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
    ],
  },
  {
    swingAr: 'یَستَفعِلُ',
    swing: 'yas taf e lo',
    frequency: 0,
    pattern: [
      // yas
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: 'س' },
      ],
      // taf
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // e
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM, short: true },
      ],
    ],
  },
  // -----
  {
    swingAr: 'استَفعِل',
    swing: 'es taf el',
    frequency: 0,
    pattern: [
      // es
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: 'س' },
      ],
      // taf
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // el
      [
        { type: 's', letter: '' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'استفعال',
    swing: 'es tef aal',
    frequency: 0,
    pattern: [
      // es
      [
        { type: 's', letter: 'ء' },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: 'س' },
      ],
      // tef
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: eM, short: true },
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
  // ----- تفعیل

  {
    swingAr: 'فَعَّلَ',
    swing: "fa' a la",
    frequency: 0,
    pattern: [
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
    ],
  },
  {
    swingAr: 'یُفَعِّلُ',
    swing: "yo fa' e lo",
    frequency: 0,
    pattern: [
      // yo
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: oM, short: true },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // e
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: eM, short: true },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM, short: true },
      ],
    ],
  },
  {
    swingAr: 'فَعِّل',
    swing: "fa' el",
    frequency: 0,
    pattern: [
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // el
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: eM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'تفعیل',
    swing: 'taf eel',
    frequency: 0,
    pattern: [
      // taf
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
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
  // ----- تَفَعُّل
  {
    swingAr: 'تَفَعَلَ',
    swing: "ta fa' a la",
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
    ],
  },
  {
    swingAr: 'یَتَفَعَّلَ',
    swing: "ya ta fa' a lo",
    frequency: 0,
    pattern: [
      // ya
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM, short: true },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // a
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: aM, short: true },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM, short: true },
      ],
    ],
  },
  // -----
  {
    swingAr: 'تَفَعَّل',
    swing: "ta fa' al",
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // al
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'تَفَعُّل',
    swing: "ta fa' ol",
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
      ],
      // fa'
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
      // ol
      [
        { type: 's', letter: '', dupe: true },
        { type: 'm', letter: oM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // ----- تَفاعل
  {
    swingAr: 'تَفاعَلَ',
    swing: 'ta faa a la',
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
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
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
    ],
  },
  // -----
  {
    swingAr: 'یَتَفاعَلُ',
    swing: 'ya ta faa a lo',
    frequency: 0,
    pattern: [
      // ya
      [
        { type: 's', letter: 'ی' },
        { type: 'm', letter: aM, short: true },
      ],
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
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
        { type: 'm', letter: aM, short: true },
      ],
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM, short: true },
      ],
    ],
  },
  // -----
  {
    swingAr: 'تَفاعَل',
    swing: 'ta faa al',
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
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
        { type: 'm', letter: aM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // -----
  {
    swingAr: 'تَفاعُل',
    swing: 'ta faa ol',
    frequency: 0,
    pattern: [
      // ta
      [
        { type: 's', letter: 'ت' },
        { type: 'm', letter: aM, short: true },
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
        { type: 'm', letter: oM, short: true },
        { type: 's', letter: '' },
      ],
    ],
  },
  // ----- مفاعَلَه
  {
    swingAr: 'فاعَلَ',
    swing: 'faa a la',
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
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
    ],
  },
  // -----
  {
    swingAr: 'یُفاعَلَ',
    swing: 'yo faa e lo',
    frequency: 0,
    pattern: [
      // yo
      [
        { type: 's', letter: 'ی' },
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
      // lo
      [
        { type: 's', letter: '' },
        { type: 'm', letter: oM, short: true },
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
  //     { type: 'm', letter: eM, short: true},
  //     { type: 's', letter: '' },
  //   ],
  // ],
  // -----
  {
    swingAr: 'مُفاعَلَ',
    swing: 'mo faa a la',
    frequency: 0,
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
      // a
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
      // la
      [
        { type: 's', letter: '' },
        { type: 'm', letter: aM, short: true },
      ],
    ],
  },
];

export { arabic };
