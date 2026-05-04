import { TYPES, ENDING_TYPES } from '../data';
import ProgPicker from './ProgPicker';
import InstLayers from './InstLayers';
import styles from './SectionCard.module.css';

function barClass(typeId) {
  const map = {
    intro: styles.barIntro, theme: styles.barTheme, develop: styles.barDevelop,
    prechorus: styles.barPrechorus, chorus: styles.barChorus, verse: styles.barVerse,
    bridge: styles.barBridge, outro: styles.barOutro,
  };
  return map[typeId] || '';
}

export default function SectionCard({ section: s, index, total, onToggleOpen, onRemove, onMove, onSetProg, onToggleInst, onSetFeel, onSetEndingType, onRandomize, onDuplicate, feels, instPool, progs }) {
  const T = TYPES.find(t => t.id === s.typeId);
  const P = progs.find(p => p.id === s.prog);
  const allInst = Object.values(s.inst).flat();
  const preview = allInst.slice(0, 4).join(', ') + (allInst.length > 4 ? '…' : '');

  return (
    <div
      className={`${styles.songSection}${s.open ? ' ' + styles.open : ''}`}
      data-id={s.id}
    >
      <div className={styles.ssHeader} onClick={() => onToggleOpen(s.id)}>
        <div className={`${styles.ssBar} ${barClass(s.typeId)}`} />
        <div className={styles.ssTitleWrap}>
          <div className={styles.ssNum}>{String(index + 1).padStart(2, '0')}</div>
          <div className={styles.ssName}>{T.icon} {T.label}</div>
          <div className={styles.ssProgTag}>{P ? P.name : '—'}</div>
          <div className={styles.ssInstPreview}>{preview || 'no instruments'}</div>
        </div>
        <div className={styles.ssActions} onClick={e => e.stopPropagation()}>
          {index > 0 && (
            <button className={styles.iconBtn} onClick={() => onMove(s.id, -1)} title="Move up">↑</button>
          )}
          {index < total - 1 && (
            <button className={styles.iconBtn} onClick={() => onMove(s.id, 1)} title="Move down">↓</button>
          )}
          <button className={`${styles.iconBtn} ${styles.dice}`} onClick={() => onRandomize(s.id)} title="Randomise section">⚄</button>
          <button className={`${styles.iconBtn} ${styles.dup}`} onClick={() => onDuplicate(s.id)} title="Duplicate">⎘</button>
          <button className={`${styles.iconBtn} ${styles.del}`} onClick={() => onRemove(s.id)} title="Remove">✕</button>
          <span className={styles.ssChevron}>▾</span>
        </div>
      </div>

      {s.open && (
        <div className={styles.ssBody}>
          <div className={styles.ssGrid}>
            <div>
              <div className={styles.colLabel}>Harmonic Colour</div>
              <ProgPicker selectedProg={s.prog} onSelect={p => onSetProg(s.id, p)} progs={progs} />
            </div>
            <div>
              <div className={styles.colLabel}>Instrument Layers</div>
              <InstLayers inst={s.inst} onToggle={(cat, item) => onToggleInst(s.id, cat, item)} instPool={instPool} />
              <div className={styles.feelRow}>
                <div className={styles.feelLabel}>Section Feel</div>
                <div className={styles.feelOpts}>
                  {feels.map(f => (
                    <div
                      key={f}
                      className={`${styles.feelOpt}${s.feel === f ? ' ' + styles.feelOptOn : ''}`}
                      onClick={() => onSetFeel(s.id, f)}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
              {s.typeId === 'outro' && (
                <div className={styles.endingRow}>
                  <div className={styles.feelLabel}>Ending Style</div>
                  <div className={styles.feelOpts}>
                    {ENDING_TYPES.map(e => (
                      <div
                        key={e.id}
                        className={`${styles.feelOpt}${s.endingType === e.id ? ' ' + styles.endingOptOn : ''}`}
                        onClick={() => onSetEndingType(s.id, e.id)}
                      >
                        {e.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
