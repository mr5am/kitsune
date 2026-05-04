import { useState, useRef, useEffect } from 'react';
import { TYPES, CATS, PRESETS, DEFAULT_POOLS } from './data';
import GlobalSettings from './components/GlobalSettings';
import SectionCard from './components/SectionCard';
import AddSectionModal from './components/AddSectionModal';
import PresetModal from './components/PresetModal';
import SettingsFileModal from './components/SettingsFileModal';
import OutputBar from './components/OutputBar';
import styles from './App.module.css';

const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const randSubset = (pool, min, max) => {
  const n = Math.floor(Math.random() * (max - min + 1)) + min;
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
};

function makeSection(typeId, uid) {
  const t = TYPES.find(x => x.id === typeId);
  const inst = Object.fromEntries(Object.keys(CATS).map(c => [c, []]));
  Object.entries(t.defInst).forEach(([c, items]) => { inst[c] = [...items]; });
  return { id: uid, typeId, prog: t.defProg, inst, feel: t.defFeel, endingType: t.defEndingType ?? null, open: false };
}

export default function App() {
  const uidRef = useRef(1);
  const toastTimer = useRef(null);
  const isLoadingFromHash = useRef(false);

  const [theme, setTheme] = useState(() => localStorage.getItem('kitsune_theme') ?? 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kitsune_theme', theme);
  }, [theme]);

  const [G, setG] = useState(() => {
    try {
      const saved = localStorage.getItem('kitsune_G');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { bpm: '145', theme: DEFAULT_POOLS.themeOpts[0].v, lead: 'solo cello lead', mood: 'emotional cinematic' };
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
  const [settingsFileModalOpen, setSettingsFileModalOpen] = useState(false);
  const [toast, setToast] = useState({ msg: '', visible: false });
  const [activePreset, setActivePreset] = useState(null);
  const [userPresets, setUserPresets] = useState(() =>
    JSON.parse(localStorage.getItem('kitsune_user_presets') || '[]')
  );
  const [removedDefaults, setRemovedDefaults] = useState(() =>
    JSON.parse(localStorage.getItem('kitsune_removed_defaults') || '[]')
  );
  const [pools, setPools] = useState(() => {
    try {
      const saved = localStorage.getItem('kitsune_pools');
      if (saved) return { ...DEFAULT_POOLS, ...JSON.parse(saved) };
    } catch {}
    return DEFAULT_POOLS;
  });

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

  useEffect(() => {
    localStorage.setItem('kitsune_pools', JSON.stringify(pools));
  }, [pools]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    isLoadingFromHash.current = true;
    try {
      const raw = decodeURIComponent(escape(atob(hash.slice(1))));
      const payload = JSON.parse(raw);
      if (payload.v !== 1) throw new Error('unknown version');
      const validTypeIds = TYPES.map(t => t.id);
      const newSections = payload.sections
        .filter(s => validTypeIds.includes(s.typeId))
        .map((s, i) => {
          const base = makeSection(s.typeId, uidRef.current++);
          const inst = { ...base.inst };
          Object.keys(s.inst || {}).forEach(cat => {
            if (inst[cat] !== undefined) inst[cat] = [...(s.inst[cat] || [])];
          });
          const endingType = s.endingType !== undefined ? s.endingType : base.endingType;
          return { ...base, prog: s.prog, feel: s.feel, inst, endingType, open: i === 0 };
        });
      setG(payload.G);
      setSections(newSections);
    } catch {
      showToast('Link is invalid or too old — starting fresh');
      history.replaceState(null, '', window.location.pathname);
    }
    isLoadingFromHash.current = false;
  }, []);

  useEffect(() => {
    if (isLoadingFromHash.current) return;
    const timer = setTimeout(() => {
      const payload = {
        v: 1,
        G,
        sections: sections.map(s => ({
          typeId: s.typeId, prog: s.prog, feel: s.feel,
          endingType: s.endingType, inst: s.inst,
        })),
      };
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      history.replaceState(null, '', '#' + encoded);
    }, 500);
    return () => clearTimeout(timer);
  }, [G, sections]);

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

  const duplicateSection = id => {
    setSections(prev => {
      const i = prev.findIndex(s => s.id === id);
      if (i === -1) return prev;
      const copy = { ...prev[i], id: uidRef.current++, open: false };
      const arr = [...prev];
      arr.splice(i + 1, 0, copy);
      return arr;
    });
  };

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

  const randomizeSection = id => {
    const ip = pools.instPool;
    setSections(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        prog: rand(pools.progs).id,
        feel: rand(pools.feels),
        inst: {
          lead:    randSubset(ip.lead    || [], 0, 1),
          harmony: randSubset(ip.harmony || [], 1, 2),
          rhythm:  randSubset(ip.rhythm  || [], 0, 2),
          bass:    randSubset(ip.bass    || [], 0, 1),
          texture: randSubset(ip.texture || [], 0, 2),
          energy:  randSubset(ip.energy  || [], 0, 1),
        },
      };
    }));
  };

  const surpriseMe = () => {
    const ip = pools.instPool;
    setG({
      bpm: String(Math.floor(Math.random() * (200 - 40 + 1)) + 40),
      theme: rand(pools.themeOpts).v,
      lead: rand(pools.leadOpts).v,
      mood: rand(pools.moodOpts).v,
    });

    setSections(prev => prev.map(s => ({
      ...s,
      prog: rand(pools.progs).id,
      feel: rand(pools.feels),
      inst: {
        lead:    randSubset(ip.lead    || [], 0, 1),
        harmony: randSubset(ip.harmony || [], 1, 2),
        rhythm:  randSubset(ip.rhythm  || [], 0, 2),
        bass:    randSubset(ip.bass    || [], 0, 1),
        texture: randSubset(ip.texture || [], 0, 2),
        energy:  randSubset(ip.energy  || [], 0, 1),
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

  const exportSettingsFile = () => {
    const payload = { version: 1, settings: { theme: G.theme, lead: G.lead, mood: G.mood }, pools, presets: allPresets };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'kitsune-settings.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const importSettingsFile = parsed => {
    let newPools = pools;
    if (parsed.pools) {
      newPools = { ...DEFAULT_POOLS, ...parsed.pools };
      setPools(newPools);
    }
    if (parsed.settings || parsed.pools) {
      setG(prev => {
        const next = { ...prev };
        if (parsed.settings?.theme) next.theme = parsed.settings.theme;
        if (parsed.settings?.lead)  next.lead  = parsed.settings.lead;
        if (parsed.settings?.mood)  next.mood  = parsed.settings.mood;
        if (!newPools.themeOpts.find(o => o.v === next.theme)) next.theme = newPools.themeOpts[0]?.v ?? next.theme;
        if (!newPools.leadOpts.find(o => o.v === next.lead))   next.lead  = newPools.leadOpts[0]?.v  ?? next.lead;
        if (!newPools.moodOpts.find(o => o.v === next.mood))   next.mood  = newPools.moodOpts[0]?.v  ?? next.mood;
        return next;
      });
    }
    if (Array.isArray(parsed.presets)) {
      setRemovedDefaults(PRESETS.map(p => p.id));
      setUserPresets(parsed.presets.map(p => ({ ...p, isUserPreset: true })));
    }
    showToast('Settings imported');
    setSettingsFileModalOpen(false);
  };

  const resetToOriginal = () => {
    setPools(DEFAULT_POOLS);
    setG(prev => ({
      ...prev,
      theme: DEFAULT_POOLS.themeOpts.find(o => o.v === prev.theme) ? prev.theme : DEFAULT_POOLS.themeOpts[0].v,
      lead:  DEFAULT_POOLS.leadOpts.find(o => o.v === prev.lead)   ? prev.lead  : DEFAULT_POOLS.leadOpts[0].v,
      mood:  DEFAULT_POOLS.moodOpts.find(o => o.v === prev.mood)   ? prev.mood  : DEFAULT_POOLS.moodOpts[0].v,
    }));
    showToast('Reset to original Kitsune');
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
            <p>Anime Music Composer for Suno</p>
          </div>
        </div>
        <div className={styles.headerBadge}>
          Tool <b>Suno AI</b> · Mode <b>Instrumental</b><br />
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
        <button
          className={styles.settingsFileBtn}
          onClick={() => setSettingsFileModalOpen(true)}
        >
          ⇅ Settings File
        </button>
        <button
          className={styles.themeBtn}
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀' : '🌙'}
        </button>
      </div>

      <div className={styles.secHead}>
        <h2>GLOBAL SETTINGS</h2>
        <div className={styles.secLine} />
      </div>
      <GlobalSettings G={G} onChange={setG} themeOpts={pools.themeOpts} leadOpts={pools.leadOpts} moodOpts={pools.moodOpts} />

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
            onRandomize={randomizeSection}
            onDuplicate={duplicateSection}
            feels={pools.feels}
            instPool={pools.instPool}
            progs={pools.progs}
          />
        ))}
      </div>

      <div className={styles.addBar} onClick={() => setModalOpen(true)}>
        <div className={styles.addPlus}>+</div>
        <div className={styles.addLbl}>Add Section</div>
      </div>

      <OutputBar G={G} sections={sections} onCopy={copyText} exclude={pools.exclude} feelWords={pools.feelWords} progs={pools.progs} />

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

      <SettingsFileModal
        open={settingsFileModalOpen}
        onClose={() => setSettingsFileModalOpen(false)}
        G={G}
        pools={pools}
        userPresets={allPresets}
        onExport={exportSettingsFile}
        onImport={importSettingsFile}
        onReset={resetToOriginal}
      />

      <div className={`${styles.toast}${toast.visible ? ' ' + styles.toastShow : ''}`}>
        {toast.msg}
      </div>
    </div>
  );
}
