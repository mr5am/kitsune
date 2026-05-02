import { useState, useRef, useEffect } from 'react';
import { TYPES, CATS, PROGS, FEELS, INST_POOL, THEME_OPTS, LEAD_OPTS, MOOD_OPTS, PRESETS } from './data';
import GlobalSettings from './components/GlobalSettings';
import SectionCard from './components/SectionCard';
import AddSectionModal from './components/AddSectionModal';
import PresetModal from './components/PresetModal';
import OutputBar from './components/OutputBar';
import styles from './App.module.css';

function makeSection(typeId, uid) {
  const t = TYPES.find(x => x.id === typeId);
  const inst = Object.fromEntries(Object.keys(CATS).map(c => [c, []]));
  Object.entries(t.defInst).forEach(([c, items]) => { inst[c] = [...items]; });
  return { id: uid, typeId, prog: t.defProg, inst, feel: t.defFeel, endingType: t.defEndingType ?? null, open: false };
}

export default function App() {
  const uidRef = useRef(1);
  const toastTimer = useRef(null);

  const [G, setG] = useState(() => {
    try {
      const saved = localStorage.getItem('kitsune_G');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { bpm: '145', theme: THEME_OPTS[0].v, lead: 'solo cello lead', mood: 'emotional cinematic' };
  });

  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem('kitsune_sections');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          uidRef.current = Math.max(...parsed.map(s => s.id)) + 1;
          return parsed;
        }
      }
    } catch {}
    const initial = ['intro', 'theme', 'develop', 'chorus', 'outro'].map(
      t => makeSection(t, uidRef.current++)
    );
    initial[0] = { ...initial[0], open: true };
    return initial;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [presetModalOpen, setPresetModalOpen] = useState(false);
  const [toast, setToast] = useState({ msg: '', visible: false });
  const [activePreset, setActivePreset] = useState(null);
  const [userPresets, setUserPresets] = useState(() =>
    JSON.parse(localStorage.getItem('kitsune_user_presets') || '[]')
  );
  const [removedDefaults, setRemovedDefaults] = useState(() =>
    JSON.parse(localStorage.getItem('kitsune_removed_defaults') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('kitsune_G', JSON.stringify(G));
  }, [G]);

  useEffect(() => {
    localStorage.setItem('kitsune_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('kitsune_user_presets', JSON.stringify(userPresets));
  }, [userPresets]);

  useEffect(() => {
    localStorage.setItem('kitsune_removed_defaults', JSON.stringify(removedDefaults));
  }, [removedDefaults]);

  const allPresets = [
    ...PRESETS.filter(p => !removedDefaults.includes(p.id)),
    ...userPresets,
  ];

  const showToast = msg => {
    clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 1700);
  };

  const addSection = typeId => {
    const sec = { ...makeSection(typeId, uidRef.current++), open: true };
    setSections(prev => [...prev, sec]);
    setTimeout(() => {
      document.querySelector(`[data-id="${sec.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  const removeSection = id => setSections(prev => prev.filter(s => s.id !== id));

  const moveSection = (id, dir) => {
    setSections(prev => {
      const arr = [...prev];
      const i = arr.findIndex(s => s.id === id);
      const j = i + dir;
      if (j < 0 || j >= arr.length) return prev;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return arr;
    });
  };

  const toggleOpen = id => setSections(prev => prev.map(s => s.id === id ? { ...s, open: !s.open } : s));
  const setProg = (id, prog) => setSections(prev => prev.map(s => s.id === id ? { ...s, prog } : s));

  const toggleInst = (id, cat, item) => {
    setSections(prev => prev.map(s => {
      if (s.id !== id) return s;
      const has = s.inst[cat].includes(item);
      return {
        ...s,
        inst: {
          ...s.inst,
          [cat]: has ? s.inst[cat].filter(i => i !== item) : [...s.inst[cat], item],
        },
      };
    }));
  };

  const setFeel = (id, feel) => setSections(prev => prev.map(s => s.id === id ? { ...s, feel } : s));
  const setEndingType = (id, endingType) => setSections(prev => prev.map(s => s.id === id ? { ...s, endingType } : s));

  const surpriseMe = () => {
    const rand = arr => arr[Math.floor(Math.random() * arr.length)];
    const randSubset = (pool, min, max) => {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
    };

    setG({
      bpm: String(Math.floor(Math.random() * (200 - 40 + 1)) + 40),
      theme: rand(THEME_OPTS).v,
      lead: rand(LEAD_OPTS).v,
      mood: rand(MOOD_OPTS).v,
    });

    setSections(prev => prev.map(s => ({
      ...s,
      prog: rand(PROGS).id,
      feel: rand(FEELS),
      inst: {
        lead:    randSubset(INST_POOL.lead,    0, 1),
        harmony: randSubset(INST_POOL.harmony, 1, 2),
        rhythm:  randSubset(INST_POOL.rhythm,  0, 2),
        bass:    randSubset(INST_POOL.bass,    0, 1),
        texture: randSubset(INST_POOL.texture, 0, 2),
        energy:  randSubset(INST_POOL.energy,  0, 1),
      },
    })));

    setActivePreset(null);
    showToast('Surprised ✦');
  };

  const loadPreset = presetId => {
    const preset = allPresets.find(p => p.id === presetId);
    if (!preset) return;
    const newSections = preset.sections.map((spec, i) => {
      const base = makeSection(spec.typeId, uidRef.current++);
      const inst = { ...base.inst };
      Object.keys(spec.inst).forEach(cat => { inst[cat] = [...spec.inst[cat]]; });
      const endingType = spec.endingType !== undefined ? spec.endingType : base.endingType;
      return { ...base, prog: spec.prog, feel: spec.feel, inst, endingType, open: i === 0 };
    });
    setSections(newSections);
    setG(prev => ({ ...prev, bpm: preset.bpm, lead: preset.lead, mood: preset.mood, ...(preset.theme && { theme: preset.theme }) }));
    setActivePreset(presetId);
    setPresetModalOpen(false);
    showToast(`Preset loaded: ${preset.name}`);
  };

  const savePreset = name => {
    const preset = {
      id: `user_${Date.now()}`,
      name,
      artist: 'Custom',
      desc: `${sections.length} section${sections.length !== 1 ? 's' : ''} · ${G.bpm} BPM · ${G.mood}`,
      bpm: G.bpm,
      theme: G.theme,
      lead: G.lead,
      mood: G.mood,
      isUserPreset: true,
      sections: sections.map(s => ({
        typeId: s.typeId,
        prog: s.prog,
        feel: s.feel,
        endingType: s.endingType,
        inst: Object.fromEntries(Object.entries(s.inst).map(([k, v]) => [k, [...v]])),
      })),
    };
    setUserPresets(prev => [...prev, preset]);
    setActivePreset(preset.id);
    showToast(`Saved: ${name}`);
  };

  const removePreset = presetId => {
    const isDefault = PRESETS.some(p => p.id === presetId);
    if (isDefault) {
      setRemovedDefaults(prev => [...prev, presetId]);
    } else {
      setUserPresets(prev => prev.filter(p => p.id !== presetId));
    }
    if (activePreset === presetId) setActivePreset(null);
  };

  const copyText = text => {
    if (!text || text.startsWith('—')) { showToast('Nothing to copy yet'); return; }
    const fallback = () => {
      const el = document.createElement('textarea');
      el.value = text;
      Object.assign(el.style, { position: 'fixed', top: '0', left: '0', opacity: '0', pointerEvents: 'none' });
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); showToast('Copied ✓'); }
      catch { showToast('Copy failed — select text manually'); }
      document.body.removeChild(el);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast('Copied ✓')).catch(fallback);
    } else {
      fallback();
    }
  };

  const activePresetObj = allPresets.find(p => p.id === activePreset);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🦊</div>
          <div className={styles.logoText}>
            <h1>Kitsune</h1>
            <p>Anime Music Composer · Suno 5.5</p>
          </div>
        </div>
        <div className={styles.headerBadge}>
          Tool <b>Suno 5.5</b> · Mode <b>Instrumental</b><br />
          Output <b>Style · Exclude · Lyrics</b>
        </div>
      </header>

      <div className={styles.surpriseBar}>
        <button className={styles.surpriseBtn} onClick={surpriseMe}>
          <span className={styles.surpriseDice}>⚄</span>
          Surprise Me
        </button>
        <button
          className={`${styles.presetsBtn}${activePresetObj ? ' ' + styles.presetsBtnActive : ''}`}
          onClick={() => setPresetModalOpen(true)}
        >
          ✦ {activePresetObj ? activePresetObj.name : 'Presets'}
        </button>
      </div>

      <div className={styles.secHead}>
        <h2>GLOBAL SETTINGS</h2>
        <div className={styles.secLine} />
      </div>
      <GlobalSettings G={G} onChange={setG} />

      <div className={styles.secHead}>
        <h2>SONG STRUCTURE</h2>
        <div className={styles.secLine} />
      </div>
      <div className={styles.sectionsArea}>
        {sections.map((s, i) => (
          <SectionCard
            key={s.id}
            section={s}
            index={i}
            total={sections.length}
            onToggleOpen={toggleOpen}
            onRemove={removeSection}
            onMove={moveSection}
            onSetProg={setProg}
            onToggleInst={toggleInst}
            onSetFeel={setFeel}
            onSetEndingType={setEndingType}
          />
        ))}
      </div>

      <div className={styles.addBar} onClick={() => setModalOpen(true)}>
        <div className={styles.addPlus}>+</div>
        <div className={styles.addLbl}>Add Section</div>
      </div>

      <OutputBar G={G} sections={sections} onCopy={copyText} />

      <AddSectionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={typeId => { addSection(typeId); setModalOpen(false); }}
        onToast={showToast}
      />

      <PresetModal
        open={presetModalOpen}
        onClose={() => setPresetModalOpen(false)}
        allPresets={allPresets}
        activePreset={activePreset}
        onLoad={loadPreset}
        onSave={savePreset}
        onRemove={removePreset}
      />

      <div className={`${styles.toast}${toast.visible ? ' ' + styles.toastShow : ''}`}>
        {toast.msg}
      </div>
    </div>
  );
}
