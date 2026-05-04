import { CATS } from '../data';
import styles from './InstLayers.module.css';

const CAT_ON_CLASS = {
  lead:    styles.onLead,
  harmony: styles.onHarmony,
  rhythm:  styles.onRhythm,
  bass:    styles.onBass,
  texture: styles.onTexture,
  energy:  styles.onEnergy,
};

export default function InstLayers({ inst, onToggle, instPool }) {
  return (
    <div className={styles.instArea}>
      {Object.entries(CATS).map(([cat, cd]) => (
        <div key={cat}>
          <div className={styles.catLabel}>{cd.label}</div>
          <div className={styles.catChips}>
            {(instPool[cat] || []).map(item => {
              const on = inst[cat].includes(item);
              return (
                <div
                  key={item}
                  className={`${styles.ic}${on ? ' ' + CAT_ON_CLASS[cat] : ''}`}
                  onClick={() => onToggle(cat, item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
