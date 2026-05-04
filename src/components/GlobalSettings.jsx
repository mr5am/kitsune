import styles from './GlobalSettings.module.css';

const BPM_MIN = 40;
const BPM_MAX = 200;

export default function GlobalSettings({ G, onChange, themeOpts, leadOpts, moodOpts }) {
  const pick = (key, val) => onChange(prev => ({ ...prev, [key]: val }));
  const bpmPct = ((Number(G.bpm) - BPM_MIN) / (BPM_MAX - BPM_MIN)) * 100;

  return (
    <div className={styles.globalRow}>
      <div className={styles.gControl}>
        <div className={styles.gLabelRow}>
          <span className={styles.gLabel}>BPM</span>
          <span className={styles.bpmValue}>{G.bpm}</span>
        </div>
        <input
          type="range"
          min={BPM_MIN}
          max={BPM_MAX}
          step={1}
          value={G.bpm}
          onChange={e => pick('bpm', e.target.value)}
          className={styles.bpmSlider}
          style={{ '--pct': `${bpmPct}%` }}
        />
      </div>

      <div className={styles.gControl}>
        <div className={styles.gLabel}>Theme Style</div>
        <div className={styles.gChips}>
          {themeOpts.map(o => (
            <div
              key={o.v}
              className={`${styles.chip}${G.theme === o.v ? ' ' + styles.chipOnGold : ''}`}
              onClick={() => pick('theme', o.v)}
            >{o.label}</div>
          ))}
        </div>
      </div>

      <div className={styles.gControl}>
        <div className={styles.gLabel}>Lead Sound</div>
        <div className={styles.gChips}>
          {leadOpts.map(o => (
            <div
              key={o.v}
              className={`${styles.chip}${G.lead === o.v ? ' ' + styles.chipOnGold : ''}`}
              onClick={() => pick('lead', o.v)}
            >{o.label}</div>
          ))}
        </div>
      </div>

      <div className={styles.gControl}>
        <div className={styles.gLabel}>Overall Mood</div>
        <div className={styles.gChips}>
          {moodOpts.map(o => (
            <div
              key={o.v}
              className={`${styles.chip}${G.mood === o.v ? ' ' + styles.chipOnGold : ''}`}
              onClick={() => pick('mood', o.v)}
            >{o.label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
