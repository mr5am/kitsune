import { useState, useRef, useEffect } from 'react';
import { PROGS } from '../data';
import styles from './ProgPicker.module.css';

export default function ProgPicker({ selectedProg, onSelect }) {
  const [open, setOpen] = useState(false);
  const [openTooltipId, setOpenTooltipId] = useState(null);
  const ref = useRef(null);
  const P = PROGS.find(p => p.id === selectedProg) || PROGS[0];

  useEffect(() => {
    if (!open) return;
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleSelect = id => {
    onSelect(id);
    setOpen(false);
  };

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={`${styles.trigger}${open ? ' ' + styles.triggerOpen : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className={styles.triggerText}>
          <span className={styles.triggerName}>{P.name}</span>
          <span className={styles.triggerDesc}>{P.desc}</span>
        </div>
        <span className={styles.triggerChevron}>▾</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {PROGS.map(p => {
            const hasTooltip = p.feel && p.reference;
            return (
              <div
                key={p.id}
                className={`${styles.progItem}${selectedProg === p.id ? ' ' + styles.active : ''}`}
                onClick={() => handleSelect(p.id)}
                onMouseEnter={() => hasTooltip && setOpenTooltipId(p.id)}
                onMouseLeave={() => hasTooltip && setOpenTooltipId(null)}
              >
                <div className={styles.progRow}>
                  <div className={styles.progN}>{p.name}</div>
                  {hasTooltip && (
                    <button
                      className={styles.infoBtn}
                      onClick={e => { e.stopPropagation(); setOpenTooltipId(openTooltipId === p.id ? null : p.id); }}
                    >ⓘ</button>
                  )}
                </div>
                <div className={styles.progD}>{p.desc}</div>
                {openTooltipId === p.id && hasTooltip && (
                  <div className={styles.tooltip}>
                    <span className={styles.tooltipFeel}>{p.feel}</span>
                    <span className={styles.tooltipRef}>{p.reference}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
