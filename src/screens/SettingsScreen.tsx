import { PixelTitle } from '../components/PixelTitle';
import React from 'react';
import type { SaveData, AnimationLevel } from '../data/save';
import type { Difficulty } from '../core/types';
import { DIFFICULTIES } from '../core/types';
import { CHARACTERS, TITLES, THEMES, levelFromXp, isUnlocked } from '../core/progression';
import { PixelButton } from '../components/PixelButton';
import { PlayerSprite } from '../render/sprites';
import { PALETTES } from '../core/palette';

const ANIMATION_LEVELS: AnimationLevel[] = ['off', 'low', 'normal', 'high'];

export function SettingsScreen({
  save,
  onChange,
  onBack,
  onResetSave,
}: {
  save: SaveData;
  onChange: (next: SaveData) => void;
  onBack: () => void;
  onResetSave: () => void;
}) {
  const level = levelFromXp(save.totalXp).level;

  function patchSettings(p: Partial<SaveData['settings']>) {
    onChange({ ...save, settings: { ...save.settings, ...p } });
  }
  function patchLoadout(p: Partial<SaveData['loadout']>) {
    onChange({ ...save, loadout: { ...save.loadout, ...p } });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 560, fontFamily: "'VT323', monospace" }}>
      <PixelTitle size={20}>SETTINGS</PixelTitle>

      <Section title="Audio">
        <Row label="Music">
          <Toggle value={save.settings.music} onChange={(v) => patchSettings({ music: v })} />
        </Row>
        <Row label="Sound Effects">
          <Toggle value={save.settings.sfx} onChange={(v) => patchSettings({ sfx: v })} />
        </Row>
        <Row label="Volume">
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={save.settings.volume}
            onChange={(e: any) => patchSettings({ volume: Number(e.target.value) })}
          />
        </Row>
      </Section>

      <Section title="Display">
        <Row label="Animation Intensity">
          <div style={{ display: 'flex', gap: 6 }}>
            {ANIMATION_LEVELS.map((a) => (
              <PixelButton key={a} small variant={a === save.settings.animation ? 'primary' : 'default'} onClick={() => patchSettings({ animation: a })}>
                {a.toUpperCase()}
              </PixelButton>
            ))}
          </div>
        </Row>
        <Row label="Reduced Motion">
          <Toggle value={save.settings.reducedMotion} onChange={(v) => patchSettings({ reducedMotion: v })} />
        </Row>
      </Section>

      <Section title="Default Difficulty">
        <div style={{ display: 'flex', gap: 6 }}>
          {DIFFICULTIES.map((d: Difficulty) => (
            <PixelButton key={d} small variant={d === save.settings.difficulty ? 'primary' : 'default'} onClick={() => patchSettings({ difficulty: d })}>
              {d.toUpperCase()}
            </PixelButton>
          ))}
        </div>
      </Section>

      <Section title="Character (cosmetic only)">
        <div style={{ display: 'flex', gap: 14 }}>
          {CHARACTERS.map((c) => {
            const unlocked = isUnlocked(c, level);
            return (
              <button
                key={c.id}
                disabled={!unlocked}
                onClick={() => unlocked && patchLoadout({ character: c.id })}
                style={{
                  background: c.id === save.loadout.character ? '#1b1f2e' : '#0a0c14',
                  border: `2px solid ${c.id === save.loadout.character ? '#34d3ff' : '#2a3042'}`,
                  padding: 10,
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  opacity: unlocked ? 1 : 0.4,
                  textAlign: 'center',
                }}
                title={unlocked ? c.name : `Unlocks at level ${c.level}`}
              >
                <PlayerSprite character={c.id} size={4} />
                <div style={{ fontSize: 13, color: '#a7aec4', marginTop: 4 }}>{c.name}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Title (cosmetic only)">
        <select
          value={save.loadout.title}
          onChange={(e: any) => patchLoadout({ title: e.target.value })}
          style={{ background: '#0a0c14', color: '#f5f7ff', border: '2px solid #2a3042', padding: 8, fontFamily: "'VT323', monospace", fontSize: 16 }}
        >
          {TITLES.filter((t) => isUnlocked(t, level)).map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </Section>

      <Section title="UI Theme (cosmetic only)">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {THEMES.map((t) => {
            const unlocked = isUnlocked(t, level);
            const swatch = PALETTES[t.id];
            const active = t.id === save.settings.theme;
            return (
              <button
                key={t.id}
                disabled={!unlocked}
                onClick={() => unlocked && patchSettings({ theme: t.id })}
                title={unlocked ? t.name : `Unlocks at level ${t.level}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  background: '#0a0c14',
                  border: `2px solid ${active ? swatch.accent : '#2a3042'}`,
                  padding: '8px 10px',
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  opacity: unlocked ? 1 : 0.4,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 16,
                    background: `linear-gradient(90deg, ${swatch.light}, ${swatch.mid}, ${swatch.dark})`,
                    border: '1px solid #05060a',
                  }}
                />
                <div style={{ fontSize: 12, color: '#a7aec4' }}>{t.name}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <div style={{ display: 'flex', gap: 10 }}>
        <PixelButton onClick={onBack}>BACK</PixelButton>
        <PixelButton
          variant="danger"
          small
          onClick={() => {
            if (confirm('Reset all progress? This cannot be undone.')) onResetSave();
          }}
        >
          RESET SAVE
        </PixelButton>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#121520', border: '2px solid #2a3042', boxShadow: '4px 4px 0 #05060a', padding: 14 }}>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 11, color: '#34d3ff', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 16, color: '#a7aec4' }}>
      <span>{label}</span>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <PixelButton small variant={value ? 'primary' : 'default'} onClick={() => onChange(!value)}>
      {value ? 'ON' : 'OFF'}
    </PixelButton>
  );
}
