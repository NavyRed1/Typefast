import React from 'react';
import type { SaveData } from '../data/save';
import { levelFromXp } from '../core/progression';
import { PixelButton } from '../components/PixelButton';
import { PixelTitle } from '../components/PixelTitle';
import { PALETTES } from '../core/palette';

export type MenuTarget = 'story' | 'versus' | 'timeattack' | 'survival' | 'bossrush' | 'daily' | 'profile' | 'settings';

export function MainMenu({ save, onSelect }: { save: SaveData; onSelect: (target: MenuTarget) => void }) {
  const info = levelFromXp(save.totalXp);
  const theme = PALETTES[save.settings.theme] ?? PALETTES.moss;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: '100%', maxWidth: 480 }}>
      <div style={{ textAlign: 'center' }}>
        <PixelTitle size={40}>TYPEQUEST</PixelTitle>
        <div
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 17,
            color: theme.light,
            marginTop: 8,
            textShadow: `0 0 10px ${theme.glow}`,
          }}
        >
          An indie pixel RPG fought with your keyboard.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 18,
          fontFamily: "'VT323', monospace",
          fontSize: 16,
          color: '#a7aec4',
          background: '#121520',
          border: `2px solid ${theme.mid}`,
          boxShadow: `4px 4px 0 #05060a, 0 0 14px ${theme.glow}`,
          padding: '8px 16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <span>
          Lv <b style={{ color: '#f5f7ff' }}>{info.level}</b>
        </span>
        <span>
          Best WPM <b style={{ color: '#f5f7ff' }}>{Math.round(save.stats.bestWpm)}</b>
        </span>
        <span>
          Streak <b style={{ color: '#facc15' }}>{save.streak.current}</b>
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
        <PixelButton variant="primary" full onClick={() => onSelect('story')}>
          STORY
        </PixelButton>
        <PixelButton full onClick={() => onSelect('versus')}>
          VERSUS
        </PixelButton>
        <PixelButton full onClick={() => onSelect('timeattack')}>
          TIME ATTACK
        </PixelButton>
        <PixelButton full onClick={() => onSelect('survival')}>
          SURVIVAL
        </PixelButton>
        <PixelButton full onClick={() => onSelect('bossrush')}>
          BOSS RUSH
        </PixelButton>
        <PixelButton full onClick={() => onSelect('daily')}>
          DAILY CHALLENGE
        </PixelButton>
        <PixelButton full onClick={() => onSelect('profile')}>
          PROFILE
        </PixelButton>
        <PixelButton full onClick={() => onSelect('settings')}>
          SETTINGS
        </PixelButton>
      </div>
    </div>
  );
}
