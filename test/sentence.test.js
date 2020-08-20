import { cleanupStr, getWords } from '../src/sentence';
import { zwnj } from '../src/common';

describe('cleanupStr', () => {
  it('expands tashdids', () => {
    let s = 'او نجّار است';
    expect(cleanupStr(s)).toBe('او نججار است');
  });

  it('removes punctuations mark', () => {
    expect(cleanupStr('تست.')).toBe('تست');
    expect(cleanupStr('تست!')).toBe('تست');
    expect(cleanupStr('تست؟')).toBe('تست');
    expect(cleanupStr('تست?')).toBe('تست');
  });

  it('uses zwnj between lone `ya` and connected `he`', () => {
    expect(cleanupStr('خانه ی')).toBe('خانه' + zwnj + 'ی');
    expect(cleanupStr('خانه یا')).toBe('خانه یا');
    expect(cleanupStr('خانه ی ما')).toBe('خانه' + zwnj + 'ی ما');
  });

  it('uses zwnj between lone `ey` and connected `he`', () => {
    expect(cleanupStr('خانه ای')).toBe('خانه' + zwnj + 'ای');
    expect(cleanupStr('خانه ایا')).toBe('خانه ایا');
    expect(cleanupStr('خانه ای هست')).toBe('خانه' + zwnj + 'ای هست');
  });

  it('turns connected `ha` with hamza to connected `he` and ownership `ya`', () => {
    expect(cleanupStr('هٔ')).toBe('ه' + zwnj + 'ی');
  });

  it('replaces different forms of letters into their correct ones', () => {
    expect(cleanupStr('اًٱأإ')).toBe('اااا');
    expect(cleanupStr('يىۍې')).toBe('یییی');
    expect(cleanupStr('ك')).toBe('ک');
    expect(cleanupStr('ەھہ')).toBe('ههه');
    expect(cleanupStr('ة')).toBe('ت');
  });
});

describe('getWords', () => {
  it('returns words of a sentence or string', () => {
    expect(getWords('علی رفت').length).toBe(2);
    expect(getWords('علی رفته است').length).toBe(3);
    expect(getWords('خانه ما انجاست').length).toBe(3);
    expect(getWords('خانه ی ما انجاست').length).toBe(3);
  });
});
