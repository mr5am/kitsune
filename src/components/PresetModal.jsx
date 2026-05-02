import { useState } from 'react';
import styles from './PresetModal.module.css';

export default function PresetModal({ open, onClose, allPresets, activePreset, onLoad, onSave, onRemove }) {
  const [selected, setSelected] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [saveMode, setSaveMode] = useState(false);
  const [saveName, setSaveName] = useState('');

  const handleLoad = () => {
    if (!selected) return;
    onLoad(selected);
    resetLocal();
  };

  const handleClose = () => {
    resetLocal();
    onClose();
  };

  const handleRemove = id => {
    onRemove(id);
    setConfirmId(null);
    if (selected === id) setSelected(null);
  };

  const handleSave = () => {
    const name = saveName.trim();
    if (!name) return;
    onSave(name);
    setSaveMode(false);
    setSaveName('');
  };

  const resetLocal = () => {
    setSelected(null);
    setConfirmId(null);
    setSaveMode(false);
    setSaveName('');
  };

  return (
    <div
      className={`${styles.overlay}${open ? ' ' + styles.open : ''}`}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>Artist Style Presets</div>
          {!saveMode && (
            <button className={styles.saveLink} onClick={() => setSaveMode(true)}>
              + Save current as preset
            </button>
          )}
        </div>

        {saveMode && (
          <div className={styles.saveForm}>
            <input
              className={styles.saveInput}
              placeholder="Preset name…"
              value={saveName}
              onChange={e => setSaveName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') { setSaveMode(false); setSaveName(''); } }}
              autoFocus
            />
            <div className={styles.saveRow}>
              <button className={`${styles.btn} ${styles.btnG}`} onClick={() => { setSaveMode(false); setSaveName(''); }}>Cancel</button>
              <button
                className={`${styles.btn} ${styles.btnP}${!saveName.trim() ? ' ' + styles.btnDisabled : ''}`}
                onClick={handleSave}
              >Save</button>
            </div>
          </div>
        )}

        {allPresets.length === 0 ? (
          <div className={styles.emptyState}>
            No presets yet. Save your current settings above to get started.
          </div>
        ) : (
          <div className={styles.presetGrid}>
            {allPresets.map(p => {
              const isActive = p.id === activePreset;
              const isSelected = p.id === selected;
              const isConfirming = p.id === confirmId;

              return (
                <div
                  key={p.id}
                  className={[
                    styles.presetCard,
                    isSelected ? styles.selected : '',
                    isActive ? styles.activeCard : '',
                  ].join(' ')}
                  onClick={() => { if (!isConfirming) setSelected(p.id); }}
                >
                  {isConfirming ? (
                    <div className={styles.confirmOverlay}>
                      <div className={styles.confirmText}>Remove &ldquo;{p.name}&rdquo;?</div>
                      <div className={styles.confirmRow}>
                        <button className={`${styles.btn} ${styles.btnDanger}`} onClick={e => { e.stopPropagation(); handleRemove(p.id); }}>Remove</button>
                        <button className={`${styles.btn} ${styles.btnG}`} onClick={e => { e.stopPropagation(); setConfirmId(null); }}>Keep</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        className={styles.deleteBtn}
                        title="Remove preset"
                        onClick={e => { e.stopPropagation(); setConfirmId(p.id); }}
                      >✕</button>
                      {isActive && <div className={styles.activeBadge}>Active</div>}
                      <div className={styles.cardName}>{p.name}</div>
                      <div className={`${styles.cardArtist}${p.isUserPreset ? ' ' + styles.cardArtistUser : ''}`}>
                        {p.isUserPreset ? '⊕ Custom' : p.artist}
                      </div>
                      <div className={styles.cardDesc}>{p.desc}</div>
                      <div className={styles.cardBpm}>{p.bpm} BPM</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.modalRow}>
          <button className={`${styles.btn} ${styles.btnG}`} onClick={handleClose}>Close</button>
          <button
            className={`${styles.btn} ${styles.btnP}${!selected ? ' ' + styles.btnDisabled : ''}`}
            onClick={handleLoad}
          >Load Preset</button>
        </div>
      </div>
    </div>
  );
}
