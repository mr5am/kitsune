import { PROGS, TYPES, ENDING_TYPES, FEEL_CAMERA } from '../data';

const NAME_POOLS = {
  gentle: [
    ['Reverie', 'Solace', 'Whisper', 'Serenity', 'Stillness', 'Lullaby', 'Murmur', 'Silence'],
    ['Quiet Dawn', 'Pale Light', 'Still Water', 'Glass Horizon', 'Silver Hour', 'Soft Current'],
    ['Before the Rain', 'A Gentle Tide', 'Where Stars Rest', 'Into the Quiet', 'After It Fades'],
  ],
  warm: [
    ['Nostalgia', 'Belonging', 'Ember', 'Longing', 'Homecoming', 'Twilight', 'Kinship', 'Warmth'],
    ['Golden Hour', 'Dear Memory', "Summer's End", 'Late Afternoon', 'Familiar Road', 'Tender Sky'],
    ['Where We Were', 'Carry Me Home', 'I Remember This', 'The Way Back', 'A Memory of You'],
  ],
  intense: [
    ['Surge', 'Ignite', 'Strike', 'Velocity', 'Onslaught', 'Drive', 'Impact', 'Breakthrough'],
    ['Burning Edge', 'Rising Tide', 'Iron Will', 'Full Throttle', 'Storm Front', 'Blazing Run'],
    ['Break Through', 'No Turning Back', 'Run With Me', 'At the Edge', 'Push Past the Limit'],
  ],
  dark: [
    ['Hollow', 'Fracture', 'Eclipse', 'Shadow', 'Dusk', 'Rift', 'Sorrow', 'Void'],
    ['Dark Veil', 'Broken Light', 'Cold Throne', 'Black Current', 'Last Ember', 'Fading Signal'],
    ['Where Shadows Fall', 'Lost in the Dark', 'The Weight of It', 'Beyond the Silence', 'Into the Rift'],
  ],
  euphoric: [
    ['Ascent', 'Bloom', 'Zenith', 'Luminance', 'Transcend', 'Soar', 'Apex', 'Radiance'],
    ['Open Sky', 'Endless Light', 'New Dawn', 'Breaking Free', 'Bright Horizon', 'Above the Clouds'],
    ['Into the Light', 'Finally Free', 'We Made It Here', 'All the Way Up', 'Higher Than Before'],
  ],
};

export function buildSongName(G, sections, index = 0) {
  if (!sections.length) return null;
  const feelCounts = {};
  sections.forEach(s => { feelCounts[s.feel] = (feelCounts[s.feel] || 0) + 1; });
  const dominantFeel = sections.reduce((best, s) =>
    feelCounts[s.feel] > feelCounts[best.feel] ? s : best
  ).feel;
  const pools = NAME_POOLS[dominantFeel] || NAME_POOLS.gentle;
  const tier = index % 3;
  const pool = pools[tier];
  const seed = (sections.length * 7 + (parseFloat(G.bpm) || 120) + (G.lead?.length || 0) * 3) | 0;
  return pool[seed % pool.length];
}

export function buildOutputs(G, sections, exclude, feelWords) {
  if (!sections.length) {
    return { style: '— add sections above —', exclude, lyrics: '— add sections above —' };
  }

  const progTokens = [...new Set(
    sections.map(s => PROGS.find(p => p.id === s.prog)?.sunoStyle).filter(Boolean)
  )];
  const allInst = [...new Set(sections.flatMap(s => Object.values(s.inst).flat()))];
  const endingTokens = [...new Set(
    sections.map(s => ENDING_TYPES.find(e => e.id === s.endingType)?.suno).filter(Boolean)
  )];

  const style = [
    G.theme,
    `${G.bpm} BPM`,
    G.mood,
    G.lead,
    ...progTokens,
    ...allInst,
    ...endingTokens,
    'wide cinematic mix',
    'instrumental only',
  ].join(', ');

  const lyricLines = ['[Instrumental]', ''];
  sections.forEach(s => {
    const T = TYPES.find(t => t.id === s.typeId);
    const P = PROGS.find(p => p.id === s.prog);
    const instParts = ['lead', 'harmony', 'rhythm', 'bass', 'texture', 'energy']
      .flatMap(cat => s.inst[cat] || []);
    const progHint = P ? P.lyricTag : '';
    const feelWord = feelWords[s.feel] || s.feel;
    const E = ENDING_TYPES.find(e => e.id === s.endingType);
    const desc = [progHint, ...instParts, E ? E.suno : null].filter(Boolean).join(', ') || 'ambient space';
    lyricLines.push(`[${T.label}]`);
    lyricLines.push(`[${feelWord} ${desc}]`);
    lyricLines.push('');
  });

  return { style, exclude, lyrics: lyricLines.join('\n').trim() };
}

const SECTION_BARS = {
  intro: 8, theme: 16, develop: 16, prechorus: 8,
  chorus: 16, verse: 16, bridge: 8, outro: 8,
};

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function buildSyncMap(G, sections) {
  if (!sections.length) return '';

  const bpm = parseFloat(G.bpm) || 120;
  const secsPerBar = (60 / bpm) * 4;

  const lines = ['Kling Sync Map (approx. — adjust timestamps to match Suno output)', ''];
  let elapsed = 0;

  sections.forEach(s => {
    const T = TYPES.find(t => t.id === s.typeId);
    const rawBars = SECTION_BARS[s.typeId] ?? 8;
    const bars = rawBars - (s.endingType === 'rit-fade' ? 2 : 0);
    const duration = bars * secsPerBar;
    const camera = FEEL_CAMERA[s.feel] || 'static shot';
    lines.push(`[${formatTime(elapsed)}–${formatTime(elapsed + duration)}] ${T.label} · ${s.feel} · ${camera}`);
    elapsed += duration;
  });

  return lines.join('\n');
}
