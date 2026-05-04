import { useState, useRef } from 'react';
import { THEME_OPTS, LEAD_OPTS, MOOD_OPTS } from '../data';
import styles from './SettingsFileModal.module.css';

const label = (opts, val) => opts.find(o => o.v === val)?.label ?? val;

const instTotal = instPool => Object.values(instPool || {}).reduce((n, arr) => n + arr.length, 0);

export default function SettingsFileModal({ open, onClose, G, pools, userPresets, onExport, onImport, onReset }) {
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef(null);

  const handleClose = () => {
    setParsed(null);
    setError('');
    setConfirmReset(false);
    onClose();
  };

  const handleFile = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.settings && !data.presets && !data.pools) throw new Error();
        setParsed(data);
        setError('');
      } catch {
        setParsed(null);
        setError('Invalid file — expected a Kitsune settings JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleApply = () => {
    if (!parsed) return;
    onImport(parsed);
    setParsed(null);
    setError('');
  };

  const handleReset = () => {
    onReset();
    setConfirmReset(false);
    onClose();
  };

  // Use current pools for the export preview labels (they may be customised)
  const themeLabel = label(pools.themeOpts, G.theme);
  const leadLabel  = label(pools.leadOpts,  G.lead);
  const moodLabel  = label(pools.moodOpts,  G.mood);

  return (
    <div
      className={`${styles.overlay}${open ? ' ' + styles.open : ''}`}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>Settings File</div>
        </div>

        {/* Export */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Export</div>
          <div className={styles.sectionDesc}>
            Download current settings, option pools, and user presets as a JSON file.
          </div>
          <div className={styles.previewGrid}>
            <div className={styles.previewRow}>
              <span className={styles.previewKey}>Theme</span>
              <span className={styles.previewVal}>{themeLabel}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewKey}>Lead</span>
              <span className={styles.previewVal}>{leadLabel}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewKey}>Mood</span>
              <span className={styles.previewVal}>{moodLabel}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewKey}>Pools</span>
              <span className={styles.previewVal}>
                {pools.themeOpts.length} theme · {pools.leadOpts.length} lead · {pools.moodOpts.length} mood · {instTotal(pools.instPool)} inst · {pools.progs?.length ?? 0} progs
              </span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewKey}>Presets</span>
              <span className={styles.previewVal}>{userPresets.length}</span>
            </div>
          </div>
          <button className={`${styles.btn} ${styles.btnP}`} onClick={onExport}>
            ↓ Download kitsune-settings.json
          </button>
        </div>

        <div className={styles.divider} />

        {/* Import */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Import</div>
          <div className={styles.sectionDesc}>
            Load a settings file. Presets are replaced entirely. BPM and song structure are unchanged. Option pools are merged.
          </div>

          <label className={`${styles.dropZone}${parsed ? ' ' + styles.dropZoneLoaded : ''}`}>
            <input ref={fileRef} type="file" accept=".json" className={styles.fileInput} onChange={handleFile} />
            <span>{parsed ? '✓ File loaded — ready to apply' : 'Drop .json file here or click to upload'}</span>
          </label>

          {error && <div className={styles.errorMsg}>{error}</div>}

          {parsed && (
            <div className={styles.previewGrid}>
              {parsed.settings?.theme && (
                <div className={styles.previewRow}>
                  <span className={styles.previewKey}>Theme</span>
                  <span className={styles.previewVal}>{label(THEME_OPTS, parsed.settings.theme)}</span>
                </div>
              )}
              {parsed.settings?.lead && (
                <div className={styles.previewRow}>
                  <span className={styles.previewKey}>Lead</span>
                  <span className={styles.previewVal}>{label(LEAD_OPTS, parsed.settings.lead)}</span>
                </div>
              )}
              {parsed.settings?.mood && (
                <div className={styles.previewRow}>
                  <span className={styles.previewKey}>Mood</span>
                  <span className={styles.previewVal}>{label(MOOD_OPTS, parsed.settings.mood)}</span>
                </div>
              )}
              {parsed.pools && (
                <div className={styles.previewRow}>
                  <span className={styles.previewKey}>Pools</span>
                  <span className={styles.previewVal}>
                    {parsed.pools.themeOpts?.length ?? '—'} theme · {parsed.pools.leadOpts?.length ?? '—'} lead · {parsed.pools.moodOpts?.length ?? '—'} mood · {instTotal(parsed.pools.instPool)} inst · {parsed.pools.progs?.length ?? '—'} progs
                  </span>
                </div>
              )}
              {Array.isArray(parsed.presets) && (
                <div className={styles.previewRow}>
                  <span className={styles.previewKey}>Presets</span>
                  <span className={styles.previewVal}>{parsed.presets.length} — replaces all</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Reset */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Reset</div>
          <div className={styles.sectionDesc}>
            Restore all option pools to the original Kitsune anime music defaults.
          </div>
          {!confirmReset ? (
            <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => setConfirmReset(true)}>
              Reset to Original Kitsune
            </button>
          ) : (
            <div className={styles.confirmRow}>
              <span className={styles.confirmText}>This will replace all custom pools. Continue?</span>
              <div className={styles.confirmBtns}>
                <button className={`${styles.btn} ${styles.btnG}`} onClick={() => setConfirmReset(false)}>Cancel</button>
                <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleReset}>Reset</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.modalRow}>
          <button className={`${styles.btn} ${styles.btnG}`} onClick={handleClose}>Close</button>
          <button
            className={`${styles.btn} ${styles.btnP}${!parsed ? ' ' + styles.btnDisabled : ''}`}
            onClick={handleApply}
          >Apply Import</button>
        </div>
      </div>
    </div>
  );
}
