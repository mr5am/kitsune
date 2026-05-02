import { useState } from 'react';
import { TYPES } from '../data';
import styles from './AddSectionModal.module.css';

export default function AddSectionModal({ open, onClose, onConfirm, onToast }) {
  const [selected, setSelected] = useState(null);

  const handleConfirm = () => {
    if (!selected) { onToast('Pick a section type first'); return; }
    onConfirm(selected);
    setSelected(null);
  };

  const handleClose = () => {
    setSelected(null);
    onClose();
  };

  return (
    <div
      className={`${styles.overlay}${open ? ' ' + styles.open : ''}`}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className={styles.modal}>
        <div className={styles.modalTitle}>Add Song Section</div>
        <div className={styles.typeGrid}>
          {TYPES.map(t => (
            <div
              key={t.id}
              className={`${styles.typeOpt}${selected === t.id ? ' ' + styles.selected : ''}`}
              onClick={() => setSelected(t.id)}
            >
              <div className={styles.typeIcon}>{t.icon}</div>
              <div className={styles.typeName}>{t.label}</div>
            </div>
          ))}
        </div>
        <div className={styles.modalRow}>
          <button className={`${styles.btn} ${styles.btnG}`} onClick={handleClose}>Cancel</button>
          <button className={`${styles.btn} ${styles.btnP}`} onClick={handleConfirm}>Add Section</button>
        </div>
      </div>
    </div>
  );
}
