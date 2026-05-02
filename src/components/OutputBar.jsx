import { useState } from 'react';
import { PROGS, EXCLUDE, TYPES, FEEL_WORDS, ENDING_TYPES } from '../data';
import styles from './OutputBar.module.css';

function buildOutputs(G, sections) {
  if (!sections.length) {
    return { style: '— add sections above —', exclude: EXCLUDE, lyrics: '— add sections above —' };
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
    const feelWord = FEEL_WORDS[s.feel] || s.feel;
    const E = ENDING_TYPES.find(e => e.id === s.endingType);
    const desc = [progHint, ...instParts, E ? E.suno : null].filter(Boolean).join(', ') || 'ambient space';
    lyricLines.push(`[${T.label}]`);
    lyricLines.push(`[${feelWord} ${desc}]`);
    lyricLines.push('');
  });

  return { style, exclude: EXCLUDE, lyrics: lyricLines.join('\n').trim() };
}

const TABS = [
  { key: 'style',   label: 'Style' },
  { key: 'exclude', label: 'Exclude Style' },
  { key: 'lyrics',  label: 'Lyrics' },
];

export default function OutputBar({ G, sections, onCopy }) {
  const [activeTab, setActiveTab] = useState('style');
  const { style, exclude, lyrics } = buildOutputs(G, sections);
  const panels = { style, exclude, lyrics };

  return (
    <div className={styles.outputSticky}>
      <div className={styles.outInner}>
        <div className={styles.outTabs}>
          {TABS.map(t => (
            <button
              key={t.key}
              className={`${styles.outTab}${activeTab === t.key ? ' ' + styles.activeTab : ''}`}
              onClick={() => setActiveTab(t.key)}
            >{t.label}</button>
          ))}
        </div>

        <div>
          {TABS.map(t => (
            <div
              key={t.key}
              className={`${styles.outPanel}${activeTab === t.key ? ' ' + styles.visiblePanel : ''}`}
            >
              <div className={styles.outFieldLbl}>
                {t.key === 'exclude' ? 'Exclude' : t.key.charAt(0).toUpperCase() + t.key.slice(1)}
              </div>
              <div className={[
                styles.outText,
                t.key === 'exclude' ? styles.tExclude : '',
                t.key === 'lyrics'  ? styles.tLyrics  : '',
              ].join(' ')}>
                {panels[t.key]}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.outActions}>
          <button className={`${styles.btn} ${styles.btnG}`} onClick={() => onCopy(exclude)}>Copy Exclude</button>
          <button className={`${styles.btn} ${styles.btnG}`} onClick={() => onCopy(lyrics)}>Copy Lyrics</button>
          <button className={`${styles.btn} ${styles.btnP}`} onClick={() => onCopy(style)}>Copy Style</button>
        </div>
      </div>
    </div>
  );
}
