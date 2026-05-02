export const TYPES = [
  { id: 'intro',     label: 'Intro',      icon: '🌅',
    defProg: 'royal-road',    defFeel: 'gentle',
    defInst: { harmony: ['string arpeggios'], rhythm: ['lazy shuffled drums'], texture: ['vinyl crackle', 'tape hiss'], energy: ['soft morning light feel'] },
  },
  { id: 'theme',     label: 'Main Theme', icon: '🎵',
    defProg: 'royal-road',    defFeel: 'warm',
    defInst: { lead: ['bright pizzicato strings'], harmony: ['warm synth pads'], rhythm: ['four-on-floor kick', 'syncopated hi-hats'], bass: ['warm sub bass'] },
  },
  { id: 'develop',   label: 'Develop',    icon: '📈',
    defProg: 'secondary-dom', defFeel: 'warm',
    defInst: { harmony: ['string arpeggios', 'lush orchestral strings'], rhythm: ['snapped claps'], bass: ['dubstep bass pulse'], energy: ['gentle energy lift'] },
  },
  { id: 'prechorus', label: 'Pre-Chorus', icon: '⚡',
    defProg: 'anime-prog',    defFeel: 'intense',
    defInst: { harmony: ['tremolo strings'], rhythm: ['punched snare'], bass: ['dubstep bass pulse'], energy: ['tension riser'] },
  },
  { id: 'chorus',    label: 'Chorus',     icon: '🔥',
    defProg: 'black-adder',   defFeel: 'intense',
    defInst: { lead: ['soaring violin line'], harmony: ['lush orchestral strings'], rhythm: ['four-on-floor kick', 'snapped claps'], bass: ['dubstep bass pulse'], energy: ['orchestral swell', 'explosive release'] },
  },
  { id: 'verse',     label: 'Verse',      icon: '🌿',
    defProg: 'line-cliche',   defFeel: 'gentle',
    defInst: { lead: ['nylon string melody'], harmony: ['string arpeggios'], rhythm: ['brushed snare'], bass: ['walking bass'] },
  },
  { id: 'bridge',    label: 'Bridge',     icon: '🌉',
    defProg: 'modulation',    defFeel: 'dark',
    defInst: { harmony: ['tremolo strings', 'ambient breath pads'], rhythm: ['half-time feel'], bass: ['deep low rumble'], energy: ['dramatic build'] },
  },
  { id: 'outro',     label: 'Outro',      icon: '🌙',
    defProg: 'royal-road',    defFeel: 'gentle',    defEndingType: 'fade',
    defInst: { harmony: ['slow string pads'], texture: ['reverse swells', 'tape hiss'], energy: ['warm golden fade'], bass: ['soft dubstep sub'] },
  },
];

export const PROGS = [
  { id: 'royal-road',    name: 'Royal Road',          sunoStyle: 'warm yearning chord loop, bittersweet lift and settle, strings rising then resolving',                               lyricTag: 'warm resolving harmony',          desc: 'Warm lift and settle · the yearning anime arc' },
  { id: 'secondary-dom', name: 'Hidden Pull',         sunoStyle: 'unexpected emotional chord colour, tension pull toward resolution, sudden harmonic warmth',                          lyricTag: 'emotional harmonic pull',         desc: 'Unexpected chord tug · sudden harmonic warmth' },
  { id: 'anime-prog',    name: 'Anime Arc',           sunoStyle: 'uneasy opening chord, darkness lifting into wonder, tension unfolding into light',                                   lyricTag: 'dark-to-wonder harmonic arc',     desc: 'Opens in shadow, brightens into wonder' },
  { id: 'line-cliche',   name: 'Inner Shimmer',       sunoStyle: 'inner melody creeping upward by half steps, stillness with subtle internal motion, shimmer underneath',             lyricTag: 'slow inner voice shimmer',        desc: 'Hidden voice creeping upward · shimmer beneath' },
  { id: 'modulation',    name: 'Colour Shift',        sunoStyle: 'key shifting upward, mood darkening, tonal landscape changing colour',                                               lyricTag: 'key colour shift',                desc: 'The whole key changes emotional colour' },
  { id: 'black-adder',   name: 'Black Adder',         sunoStyle: 'sudden dramatic chord stab, sharp unexpected harmonic peak, one tense hit then release',                            lyricTag: 'dramatic harmonic stab',          desc: 'One jarring peak chord · maximum drama' },
  { id: 'flat-six',      name: 'Dark Cadence',        sunoStyle: 'descending dark chord pull, minor colour, heavy emotional landing, melancholic cadence',                            lyricTag: 'dark descending cadence',         desc: 'Heavy chords falling to resolution · dark emotion' },
  { id: 'axis',          name: 'The Axis',            sunoStyle: 'gentle circular chord movement, bittersweet longing, minor opening into warm major settling',                       lyricTag: 'bittersweet circular motion',     desc: 'The J-pop loop · bittersweet and circular' },
  { id: 'andalusian',    name: 'Andalusian Descent',  sunoStyle: 'chords stepping downward one by one, brooding descent, ground sinking beneath the melody',                          lyricTag: 'dark descending steps',           desc: 'Chords stepping downward · brooding descent' },
  { id: 'nat-minor',     name: 'Shadow Descent',      sunoStyle: 'heavy minor chords falling in sequence, aeolian sadness, slow dark pull downward',                                  lyricTag: 'melancholic minor fall',          desc: 'Heavier dark fall · aeolian sadness' },
  { id: 'canon',         name: 'Canon Flow',          sunoStyle: 'gentle cascading chords, warm even forward motion, tender unfolding sequence',                                       lyricTag: 'warm cascading sequence',         desc: 'Tender cascading chords · familiar forward warmth' },
  { id: 'neapolitan',    name: 'Grand Arrival',       sunoStyle: 'half-step surprise chord before the landing, sudden tension then grand arrival, classical dramatic resolution',      lyricTag: 'grand surprise resolution',       desc: 'Surprise chord before the landing · classical drama' },
  { id: 'minor-plagal',  name: 'The Sigh',            sunoStyle: 'minor chord sighing into major, emotional weight releasing, dark-to-light exhale',                                  lyricTag: 'emotional dark-to-light sigh',    desc: 'One dark chord exhaling into warmth' },
  { id: 'phrygian',      name: 'Ancient Shadow',      sunoStyle: 'ancient dark modal colour, unresolved minor tension, mysterious brooding shadow',                                    lyricTag: 'dark modal shadow',               desc: 'Ancient, unresolved darkness · brooding modal' },
  { id: 'yonezu',        name: 'Yonezu Lift',         sunoStyle: 'unexpected bright chord leap upward, modern emotional colour shift, pop harmonic surprise',                          lyricTag: 'bright pop harmonic lift',        desc: 'Sudden bright leap then emotional settle' },
];

export const CATS = {
  lead:    { label: 'Lead',    cls: 'c-lead' },
  harmony: { label: 'Harmony', cls: 'c-harmony' },
  rhythm:  { label: 'Rhythm',  cls: 'c-rhythm' },
  bass:    { label: 'Bass',    cls: 'c-bass' },
  texture: { label: 'Texture', cls: 'c-texture' },
  energy:  { label: 'Energy',  cls: 'c-energy' },
};

export const INST_POOL = {
  lead:    ['nylon string melody', 'bright pizzicato strings', 'soaring violin line', 'piano accent line', 'synth lead layer', 'flute ornament', 'viola phrase', 'overdriven electric guitar lead', 'clean electric guitar riff'],
  harmony: ['string arpeggios', 'slow string pads', 'warm synth pads', 'pizzicato strings', 'tremolo strings', 'lush orchestral strings', 'ambient breath pads', 'organ wash'],
  rhythm:  ['lazy shuffled drums', 'four-on-floor kick', 'snapped claps', 'soft claps', 'punched snare', 'syncopated hi-hats', 'brushed snare', 'half-time feel', 'driving rock drums'],
  bass:    ['dubstep bass pulse', 'warm sub bass', 'walking bass', 'pizzicato bass', 'soft dubstep sub', 'deep low rumble', 'upright bass feel', 'distorted bass guitar'],
  texture: ['vinyl crackle', 'tape hiss', 'dusty vintage drums', 'reverse swells', 'golden shimmer', 'warm room reverb', 'subtle noise floor', 'guitar amp distortion'],
  energy:  ['orchestral swell', 'dramatic build', 'gentle energy lift', 'explosive release', 'tension riser', 'warm golden fade', 'soft morning light feel', 'airy lift'],
};

export const FEELS = ['gentle', 'warm', 'intense', 'dark', 'euphoric'];

export const FEEL_WORDS = { gentle: 'soft', warm: 'warm', intense: 'driving', dark: 'tense', euphoric: 'soaring' };

export const EXCLUDE = `thin bell lead, celesta, glockenspiel, music box, soft lullaby piano, koto, shamisen, folk instruments, choir vocals, singing, trap, 8-bit, chiptune, acoustic guitar, new age, slow ballad, sleepy, ambient only, harsh distortion, heavy metal`;

export const THEME_OPTS = [
  { v: 'hybrid lofi-electronic anime opening theme',           label: 'Anime OP' },
  { v: 'soft acoustic indie pop anime ending theme',           label: 'Anime ED' },
  { v: 'cinematic orchestral anime soundtrack, dramatic score', label: 'OST' },
  { v: 'Japanese city pop retro electronic, 1980s anime',      label: 'City Pop' },
  { v: 'electronic J-pop anime theme, bright synth pop drive', label: 'J-Pop Electronic' },
  { v: 'dark indie rock anime opening theme, electric guitar driven', label: 'Indie Rock OP' },
];

export const LEAD_OPTS = [
  { v: 'grand piano lead',               label: 'Piano' },
  { v: 'solo cello lead',                label: 'Solo Cello' },
  { v: 'detuned sawtooth synth lead',    label: 'Saw Synth' },
  { v: 'warm nylon string guitar lead',  label: 'Nylon Guitar' },
  { v: 'clean bright synth lead',        label: 'Bright Synth' },
  { v: 'overdriven electric guitar lead', label: 'Electric Guitar' },
];

export const MOOD_OPTS = [
  { v: 'serene nostalgic',    label: 'Serene' },
  { v: 'emotional cinematic', label: 'Cinematic' },
  { v: 'dark tense',          label: 'Dark' },
  { v: 'euphoric triumphant', label: 'Euphoric' },
];

export const ENDING_TYPES = [
  { id: 'fade',       label: 'Fade Out',        suno: 'gradual fade out, volume decay ending' },
  { id: 'sustain',    label: 'Sustain',          suno: 'sustained chord resonance, long reverb tail ending' },
  { id: 'resolution', label: 'Resolution',       suno: 'decisive cadential resolution, strong conclusive ending' },
  { id: 'cold',       label: 'Cold End',         suno: 'sudden cold stop, abrupt cut ending' },
  { id: 'dissolve',   label: 'Ambient Dissolve', suno: 'ambient dissolve, instrument dropout fade, atmospheric ending' },
  { id: 'rit-fade',   label: 'Rit. & Fade',      suno: 'ritardando slowing fade, orchestral rubato ending' },
];

export const PRESETS = [
  {
    id: 'sawano', name: 'Hiroyuki Sawano', artist: 'AoT · Guilty Crown',
    desc: 'Cinematic battle epic — driving ostinato, tritone stabs, dark grandeur',
    bpm: '152', theme: 'cinematic orchestral anime soundtrack, dramatic score', lead: 'detuned sawtooth synth lead', mood: 'dark tense',
    sections: [
      { typeId: 'intro',   prog: 'flat-six',    feel: 'dark',    inst: { lead: [], harmony: ['tremolo strings', 'ambient breath pads'], rhythm: ['half-time feel'], bass: ['deep low rumble'], texture: ['reverse swells'], energy: ['dramatic build'] } },
      { typeId: 'theme',   prog: 'andalusian',  feel: 'intense', inst: { lead: ['soaring violin line'], harmony: ['lush orchestral strings'], rhythm: ['four-on-floor kick', 'snapped claps'], bass: ['dubstep bass pulse'], texture: [], energy: ['orchestral swell'] } },
      { typeId: 'develop', prog: 'secondary-dom', feel: 'intense', inst: { lead: ['piano accent line'], harmony: ['tremolo strings', 'lush orchestral strings'], rhythm: ['punched snare'], bass: ['dubstep bass pulse'], texture: [], energy: ['tension riser'] } },
      { typeId: 'chorus',  prog: 'neapolitan',  feel: 'euphoric', inst: { lead: ['soaring violin line'], harmony: ['lush orchestral strings', 'warm synth pads'], rhythm: ['four-on-floor kick', 'snapped claps'], bass: ['dubstep bass pulse'], texture: [], energy: ['explosive release', 'orchestral swell'] } },
      { typeId: 'outro',   prog: 'flat-six',    feel: 'dark',    endingType: 'cold',     inst: { lead: [], harmony: ['slow string pads'], rhythm: [], bass: ['soft dubstep sub'], texture: ['reverse swells'], energy: [] } },
    ],
  },
  {
    id: 'shimomura', name: 'Yoko Shimomura', artist: 'Kingdom Hearts · FF XV',
    desc: 'Emotional RPG journey — heartfelt piano, warm orchestral swell, lyrical arc',
    bpm: '92', theme: 'cinematic orchestral anime soundtrack, dramatic score', lead: 'grand piano lead', mood: 'emotional cinematic',
    sections: [
      { typeId: 'intro',    prog: 'royal-road',   feel: 'gentle',  inst: { lead: ['piano accent line'], harmony: ['string arpeggios'], rhythm: [], bass: [], texture: ['warm room reverb'], energy: ['soft morning light feel'] } },
      { typeId: 'verse',    prog: 'canon',         feel: 'warm',    inst: { lead: ['piano accent line'], harmony: ['string arpeggios', 'slow string pads'], rhythm: ['brushed snare'], bass: ['walking bass'], texture: [], energy: [] } },
      { typeId: 'prechorus', prog: 'line-cliche',  feel: 'warm',    inst: { lead: [], harmony: ['tremolo strings', 'warm synth pads'], rhythm: ['soft claps'], bass: ['warm sub bass'], texture: [], energy: ['gentle energy lift'] } },
      { typeId: 'chorus',   prog: 'royal-road',    feel: 'euphoric', inst: { lead: ['soaring violin line'], harmony: ['lush orchestral strings', 'warm synth pads'], rhythm: ['four-on-floor kick', 'soft claps'], bass: ['warm sub bass'], texture: [], energy: ['orchestral swell'] } },
      { typeId: 'bridge',   prog: 'minor-plagal',  feel: 'dark',    inst: { lead: ['viola phrase'], harmony: ['tremolo strings'], rhythm: ['half-time feel'], bass: ['pizzicato bass'], texture: [], energy: ['dramatic build'] } },
      { typeId: 'outro',    prog: 'royal-road',    feel: 'gentle',  endingType: 'rit-fade', inst: { lead: ['piano accent line'], harmony: ['slow string pads'], rhythm: [], bass: [], texture: ['tape hiss', 'warm room reverb'], energy: ['warm golden fade'] } },
    ],
  },
  {
    id: 'kajiura', name: 'Yuki Kajiura', artist: 'SAO · Madoka Magica',
    desc: 'Dark minor fantasy — ethereal textures, Phrygian modal darkness, dramatic tension',
    bpm: '120', theme: 'cinematic orchestral anime soundtrack, dramatic score', lead: 'solo cello lead', mood: 'dark tense',
    sections: [
      { typeId: 'intro',   prog: 'phrygian',    feel: 'dark',    inst: { lead: [], harmony: ['ambient breath pads', 'slow string pads'], rhythm: [], bass: ['deep low rumble'], texture: ['reverse swells', 'subtle noise floor'], energy: [] } },
      { typeId: 'verse',   prog: 'nat-minor',   feel: 'dark',    inst: { lead: ['viola phrase'], harmony: ['string arpeggios', 'ambient breath pads'], rhythm: ['brushed snare'], bass: ['pizzicato bass'], texture: [], energy: [] } },
      { typeId: 'develop', prog: 'anime-prog',  feel: 'intense', inst: { lead: ['soaring violin line'], harmony: ['tremolo strings', 'lush orchestral strings'], rhythm: ['punched snare'], bass: ['dubstep bass pulse'], texture: [], energy: ['tension riser'] } },
      { typeId: 'chorus',  prog: 'phrygian',    feel: 'intense', inst: { lead: ['soaring violin line'], harmony: ['lush orchestral strings', 'organ wash'], rhythm: ['four-on-floor kick', 'snapped claps'], bass: ['dubstep bass pulse'], texture: [], energy: ['explosive release', 'orchestral swell'] } },
      { typeId: 'outro',   prog: 'phrygian',    feel: 'dark',    endingType: 'sustain', inst: { lead: ['viola phrase'], harmony: ['ambient breath pads'], rhythm: [], bass: [], texture: ['reverse swells'], energy: [] } },
    ],
  },
  {
    id: 'hisaishi', name: 'Joe Hisaishi', artist: 'Studio Ghibli',
    desc: 'Pastoral and nostalgic — gentle acoustic warmth, flowing melodic arcs, natural imagery',
    bpm: '84', theme: 'cinematic orchestral anime soundtrack, dramatic score', lead: 'warm nylon string guitar lead', mood: 'serene nostalgic',
    sections: [
      { typeId: 'intro',   prog: 'royal-road', feel: 'gentle', inst: { lead: [], harmony: ['string arpeggios'], rhythm: [], bass: [], texture: ['vinyl crackle', 'tape hiss'], energy: ['soft morning light feel'] } },
      { typeId: 'theme',   prog: 'canon',      feel: 'warm',   inst: { lead: ['flute ornament'], harmony: ['string arpeggios', 'slow string pads'], rhythm: ['brushed snare'], bass: ['upright bass feel'], texture: [], energy: ['airy lift'] } },
      { typeId: 'develop', prog: 'axis',        feel: 'warm',   inst: { lead: ['piano accent line'], harmony: ['string arpeggios', 'warm synth pads'], rhythm: ['lazy shuffled drums'], bass: ['walking bass'], texture: [], energy: ['gentle energy lift'] } },
      { typeId: 'chorus',  prog: 'royal-road', feel: 'euphoric', inst: { lead: ['flute ornament', 'soaring violin line'], harmony: ['lush orchestral strings', 'string arpeggios'], rhythm: ['four-on-floor kick', 'soft claps'], bass: ['warm sub bass'], texture: [], energy: ['orchestral swell', 'airy lift'] } },
      { typeId: 'outro',   prog: 'royal-road', feel: 'gentle', endingType: 'dissolve', inst: { lead: [], harmony: ['slow string pads', 'string arpeggios'], rhythm: [], bass: [], texture: ['vinyl crackle', 'warm room reverb'], energy: ['warm golden fade'] } },
    ],
  },
  {
    id: 'anime-op', name: 'Generic Anime OP', artist: 'Opening Theme',
    desc: 'Energetic and triumphant — punchy intro theme, full chorus payoff, driving rhythm',
    bpm: '158', theme: 'hybrid lofi-electronic anime opening theme', lead: 'clean bright synth lead', mood: 'euphoric triumphant',
    sections: [
      { typeId: 'intro',    prog: 'royal-road',    feel: 'warm',    inst: { lead: ['bright pizzicato strings'], harmony: ['string arpeggios'], rhythm: ['four-on-floor kick'], bass: ['warm sub bass'], texture: [], energy: ['gentle energy lift'] } },
      { typeId: 'theme',    prog: 'axis',          feel: 'warm',    inst: { lead: ['bright pizzicato strings'], harmony: ['warm synth pads', 'string arpeggios'], rhythm: ['four-on-floor kick', 'syncopated hi-hats'], bass: ['warm sub bass'], texture: [], energy: ['orchestral swell'] } },
      { typeId: 'prechorus', prog: 'secondary-dom', feel: 'intense', inst: { lead: [], harmony: ['tremolo strings'], rhythm: ['punched snare'], bass: ['dubstep bass pulse'], texture: [], energy: ['tension riser'] } },
      { typeId: 'chorus',   prog: 'yonezu',        feel: 'euphoric', inst: { lead: ['soaring violin line'], harmony: ['lush orchestral strings', 'warm synth pads'], rhythm: ['four-on-floor kick', 'snapped claps'], bass: ['dubstep bass pulse'], texture: [], energy: ['explosive release', 'orchestral swell'] } },
      { typeId: 'outro',    prog: 'royal-road',    feel: 'warm',    endingType: 'fade', inst: { lead: [], harmony: ['slow string pads'], rhythm: ['four-on-floor kick'], bass: ['warm sub bass'], texture: [], energy: ['warm golden fade'] } },
    ],
  },
  {
    id: 'anime-ed', name: 'Generic Anime ED', artist: 'Ending Theme',
    desc: 'Reflective and bittersweet — gentle melody over quiet chords, fading warmth',
    bpm: '82', theme: 'soft acoustic indie pop anime ending theme', lead: 'grand piano lead', mood: 'serene nostalgic',
    sections: [
      { typeId: 'intro',  prog: 'axis',        feel: 'gentle', inst: { lead: [], harmony: ['string arpeggios'], rhythm: [], bass: [], texture: ['vinyl crackle'], energy: ['soft morning light feel'] } },
      { typeId: 'verse',  prog: 'line-cliche', feel: 'gentle', inst: { lead: ['piano accent line'], harmony: ['string arpeggios', 'slow string pads'], rhythm: ['brushed snare'], bass: ['walking bass'], texture: [], energy: [] } },
      { typeId: 'chorus', prog: 'royal-road',  feel: 'warm',   inst: { lead: ['nylon string melody'], harmony: ['lush orchestral strings', 'string arpeggios'], rhythm: ['soft claps'], bass: ['warm sub bass'], texture: [], energy: ['airy lift'] } },
      { typeId: 'bridge', prog: 'minor-plagal', feel: 'dark',  inst: { lead: ['viola phrase'], harmony: ['ambient breath pads', 'slow string pads'], rhythm: [], bass: ['upright bass feel'], texture: [], energy: ['dramatic build'] } },
      { typeId: 'outro',  prog: 'axis',        feel: 'gentle', endingType: 'fade', inst: { lead: [], harmony: ['slow string pads', 'string arpeggios'], rhythm: [], bass: [], texture: ['tape hiss', 'warm room reverb'], energy: ['warm golden fade'] } },
    ],
  },
  {
    id: 'yorushika', name: 'Yorushika', artist: 'n-buna · suis',
    desc: 'Indie folk-pop elegy — nylon guitar, nostalgic strings, literary melancholy',
    bpm: '88', theme: 'soft acoustic indie pop anime ending theme', lead: 'warm nylon string guitar lead', mood: 'serene nostalgic',
    sections: [
      { typeId: 'intro',    prog: 'royal-road',  feel: 'gentle',  inst: { lead: [], harmony: ['string arpeggios'], rhythm: [], bass: [], texture: ['vinyl crackle'], energy: ['soft morning light feel'] } },
      { typeId: 'verse',    prog: 'axis',        feel: 'gentle',  inst: { lead: ['nylon string melody'], harmony: ['string arpeggios', 'warm synth pads'], rhythm: ['brushed snare'], bass: ['walking bass'], texture: [], energy: [] } },
      { typeId: 'prechorus', prog: 'line-cliche', feel: 'warm',   inst: { lead: [], harmony: ['slow string pads', 'warm synth pads'], rhythm: ['soft claps'], bass: ['walking bass'], texture: [], energy: ['gentle energy lift'] } },
      { typeId: 'chorus',   prog: 'royal-road',  feel: 'euphoric', inst: { lead: ['soaring violin line'], harmony: ['lush orchestral strings', 'string arpeggios'], rhythm: ['four-on-floor kick', 'soft claps'], bass: ['warm sub bass'], texture: [], energy: ['orchestral swell', 'airy lift'] } },
      { typeId: 'outro',    prog: 'minor-plagal', feel: 'gentle', endingType: 'dissolve', inst: { lead: [], harmony: ['slow string pads'], rhythm: [], bass: [], texture: ['tape hiss', 'warm room reverb'], energy: ['warm golden fade'] } },
    ],
  },
  {
    id: 'yoasobi', name: 'YOASOBI', artist: 'Ayase · ikura',
    desc: 'Driving electronic J-pop — bright synth lead, story-driven intensity, high-BPM axis loop',
    bpm: '132', theme: 'electronic J-pop anime theme, bright synth pop drive', lead: 'clean bright synth lead', mood: 'euphoric triumphant',
    sections: [
      { typeId: 'intro',    prog: 'axis',         feel: 'warm',    inst: { lead: ['bright pizzicato strings'], harmony: ['string arpeggios', 'warm synth pads'], rhythm: ['four-on-floor kick', 'syncopated hi-hats'], bass: ['warm sub bass'], texture: [], energy: [] } },
      { typeId: 'verse',    prog: 'axis',         feel: 'warm',    inst: { lead: ['piano accent line'], harmony: ['warm synth pads'], rhythm: ['four-on-floor kick', 'syncopated hi-hats'], bass: ['warm sub bass'], texture: [], energy: [] } },
      { typeId: 'prechorus', prog: 'secondary-dom', feel: 'intense', inst: { lead: [], harmony: ['tremolo strings'], rhythm: ['punched snare'], bass: ['dubstep bass pulse'], texture: [], energy: ['tension riser'] } },
      { typeId: 'chorus',   prog: 'yonezu',       feel: 'euphoric', inst: { lead: ['soaring violin line', 'bright pizzicato strings'], harmony: ['lush orchestral strings', 'warm synth pads'], rhythm: ['four-on-floor kick', 'snapped claps'], bass: ['dubstep bass pulse'], texture: ['golden shimmer'], energy: ['explosive release', 'orchestral swell'] } },
      { typeId: 'outro',    prog: 'axis',         feel: 'warm',    endingType: 'fade', inst: { lead: ['bright pizzicato strings'], harmony: ['warm synth pads'], rhythm: ['four-on-floor kick'], bass: ['warm sub bass'], texture: [], energy: ['warm golden fade'] } },
    ],
  },
  {
    id: 'eve', name: 'Eve', artist: 'JJK OP · Otogi',
    desc: 'Dark indie rock with anime edge — electric guitar wall, Phrygian tension, cold stop',
    bpm: '158', theme: 'dark indie rock anime opening theme, electric guitar driven', lead: 'overdriven electric guitar lead', mood: 'dark tense',
    sections: [
      { typeId: 'intro',    prog: 'phrygian',     feel: 'dark',    inst: { lead: ['clean electric guitar riff'], harmony: ['ambient breath pads'], rhythm: ['half-time feel'], bass: ['distorted bass guitar'], texture: ['guitar amp distortion', 'subtle noise floor'], energy: [] } },
      { typeId: 'verse',    prog: 'flat-six',     feel: 'dark',    inst: { lead: ['piano accent line'], harmony: ['tremolo strings'], rhythm: ['driving rock drums'], bass: ['distorted bass guitar'], texture: [], energy: [] } },
      { typeId: 'prechorus', prog: 'secondary-dom', feel: 'intense', inst: { lead: [], harmony: ['tremolo strings', 'warm synth pads'], rhythm: ['driving rock drums', 'punched snare'], bass: ['distorted bass guitar'], texture: [], energy: ['tension riser'] } },
      { typeId: 'chorus',   prog: 'anime-prog',   feel: 'intense', inst: { lead: ['overdriven electric guitar lead', 'soaring violin line'], harmony: ['lush orchestral strings'], rhythm: ['driving rock drums', 'snapped claps'], bass: ['distorted bass guitar'], texture: ['guitar amp distortion'], energy: ['explosive release', 'orchestral swell'] } },
      { typeId: 'bridge',   prog: 'modulation',   feel: 'dark',    inst: { lead: ['piano accent line'], harmony: ['ambient breath pads'], rhythm: ['half-time feel'], bass: ['distorted bass guitar'], texture: [], energy: ['dramatic build'] } },
      { typeId: 'outro',    prog: 'phrygian',     feel: 'dark',    endingType: 'cold', inst: { lead: ['overdriven electric guitar lead'], harmony: ['lush orchestral strings'], rhythm: ['driving rock drums'], bass: ['distorted bass guitar'], texture: ['guitar amp distortion'], energy: [] } },
    ],
  },
];
