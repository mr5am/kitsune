import { describe, it, expect } from 'vitest';
import { buildOutputs, buildSyncMap, buildSongName } from './buildOutputs';

const G = {
  bpm: '145',
  theme: 'hybrid lofi-electronic anime opening theme',
  lead: 'solo cello lead',
  mood: 'emotional cinematic',
};

function sec(typeId, feel, endingType = null) {
  return {
    typeId, prog: 'royal-road', feel, endingType,
    inst: { lead: [], harmony: [], rhythm: [], bass: [], texture: [], energy: [] },
  };
}

describe('buildOutputs', () => {
  it('returns all three fields', () => {
    const result = buildOutputs(G, [sec('intro', 'gentle')]);
    expect(result).toHaveProperty('style');
    expect(result).toHaveProperty('exclude');
    expect(result).toHaveProperty('lyrics');
  });

  it('style includes BPM', () => {
    const result = buildOutputs({ ...G, bpm: '160' }, [sec('intro', 'gentle')]);
    expect(result.style).toContain('160 BPM');
  });

  it('exclude is always the same constant regardless of input', () => {
    const a = buildOutputs(G, [sec('intro', 'dark')]);
    const b = buildOutputs({ ...G, bpm: '90' }, [sec('chorus', 'euphoric')]);
    expect(a.exclude).toBe(b.exclude);
  });
});

describe('buildSyncMap', () => {
  it('returns empty string for no sections', () => {
    expect(buildSyncMap(G, [])).toBe('');
  });

  it('timestamp format is [MM:SS–MM:SS]', () => {
    const result = buildSyncMap(G, [sec('intro', 'dark')]);
    expect(result).toMatch(/\[\d+:\d{2}–\d+:\d{2}\]/);
  });

  it('contains approx label', () => {
    const result = buildSyncMap(G, [sec('chorus', 'intense')]);
    expect(result).toContain('approx');
  });

  it('rit-fade section is shorter than standard', () => {
    const bpm = '120';
    const normal = buildSyncMap({ bpm }, [sec('chorus', 'intense', null)]);
    const ritFade = buildSyncMap({ bpm }, [sec('chorus', 'intense', 'rit-fade')]);
    const getEndSeconds = str => {
      const match = str.match(/\[\d+:\d{2}–(\d+):(\d{2})\]/);
      return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0;
    };
    expect(getEndSeconds(ritFade)).toBeLessThan(getEndSeconds(normal));
  });

  it('feel maps to correct camera note', () => {
    const result = buildSyncMap(G, [sec('chorus', 'euphoric')]);
    expect(result).toContain('golden hour');
  });
});

describe('buildSongName', () => {
  it('returns null for empty sections', () => {
    expect(buildSongName(G, [], 0)).toBeNull();
  });

  it('is deterministic for the same state', () => {
    const sections = [sec('intro', 'warm'), sec('chorus', 'intense')];
    expect(buildSongName(G, sections, 0)).toBe(buildSongName(G, sections, 0));
  });

  it('cycles 3 distinct alternatives', () => {
    const sections = [sec('intro', 'dark')];
    const n0 = buildSongName(G, sections, 0);
    const n1 = buildSongName(G, sections, 1);
    const n2 = buildSongName(G, sections, 2);
    expect(new Set([n0, n1, n2]).size).toBe(3);
  });

  it('includes capitalized lead word in name', () => {
    const sections = [sec('intro', 'gentle')];
    expect(buildSongName(G, sections, 0)).toContain('Solo');
  });

  it('uses dominant feel adjective', () => {
    const sections = [sec('intro', 'dark'), sec('theme', 'dark'), sec('chorus', 'warm')];
    expect(buildSongName(G, sections, 0)).toContain('Tense');
  });
});

describe('Copy All format', () => {
  it('assembled text contains all three labeled sections', () => {
    const { style, exclude, lyrics } = buildOutputs(G, [sec('intro', 'gentle')]);
    const text = `Style:\n${style}\n\nExclude:\n${exclude}\n\nLyrics:\n${lyrics}`;
    expect(text).toMatch(/^Style:\n/);
    expect(text).toContain('\n\nExclude:\n');
    expect(text).toContain('\n\nLyrics:\n');
  });
});
