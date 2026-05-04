import { useState, useEffect } from 'react';
import { buildOutputs, buildSongName } from '../lib/buildOutputs';
import styles from './OutputBar.module.css';

const TABS = [
  { key: 'style',   label: 'Style',        fieldLabel: 'Style',          copyLabel: 'Copy Style',    primary: true,  textCls: '' },
  { key: 'exclude', label: 'Exclude Style', fieldLabel: 'Exclude',        copyLabel: 'Copy Exclude',  primary: false, textCls: 'tExclude' },
  { key: 'lyrics',  label: 'Lyrics',        fieldLabel: 'Lyrics',         copyLabel: 'Copy Lyrics',   primary: false, textCls: 'tLyrics' },
];

export default function OutputBar({ G, sections, onCopy, exclude, feelWords, progs }) {
  const [activeTab, setActiveTab] = useState('style');
  const [nameIndex, setNameIndex] = useState(0);

  useEffect(() => { setNameIndex(0); }, [G, sections]);

  const { style, exclude: excl, lyrics } = buildOutputs(G, sections, exclude, feelWords, progs);
  const panels = { style, exclude: excl, lyrics };
  const songName = buildSongName(G, sections, nameIndex);

  const handleCopyAll = () => {
    if (!sections.length) { onCopy('— Nothing to copy yet'); return; }
    onCopy(`Style:\n${style}\n\nExclude:\n${excl}\n\nLyrics:\n${lyrics}`);
  };

  return (
    <div className={styles.outputSticky}>
      <div className={styles.outInner}>
        <div className={styles.nameRow}>
          {songName
            ? <>
                <span className={styles.nameLbl}>Name</span>
                <span className={styles.nameVal}>{songName}</span>
                <button className={styles.nameBtn} onClick={() => setNameIndex(i => (i + 1) % 3)} title="Regenerate name">↺</button>
                <button className={styles.nameBtn} onClick={() => onCopy(songName)} title="Copy name">⎘</button>
              </>
            : <span className={styles.namePlaceholder}>— name your song above —</span>
          }
        </div>
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
              <div className={styles.outFieldLbl}>{t.fieldLabel}</div>
              <div className={[
                styles.outText,
                t.textCls ? styles[t.textCls] : '',
              ].join(' ')}>
                {panels[t.key]}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.outActions}>
          <button className={`${styles.btn} ${styles.btnCopyAll}`} onClick={handleCopyAll}>Copy All</button>
          {TABS.map(t => (
            <button
              key={t.key}
              className={`${styles.btn} ${t.primary ? styles.btnP : styles.btnG}`}
              onClick={() => onCopy(panels[t.key])}
            >{t.copyLabel}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
