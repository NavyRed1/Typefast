import type { AreaId, CharacterId, Difficulty, Loadout, ThemeId } from '../core/types';
import { DIFFICULTIES } from '../core/types';

export type AnimationLevel = 'off' | 'low' | 'normal' | 'high';

export interface Settings {
  volume: number; // 0..1
  music: boolean;
  sfx: boolean;
  animation: AnimationLevel;
  reducedMotion: boolean;
  difficulty: Difficulty;
  theme: ThemeId;
}

export interface WpmSample {
  t: number;
  wpm: number;
  acc: number;
  mode: string;
}

export interface Stats {
  totalChars: number; // correct characters typed, lifetime
  keystrokes: number;
  gamesPlayed: number;
  battlesWon: number;
  battlesLost: number;
  bossesDefeated: number;
  versusWins: number;
  versusLosses: number;
  bestWpm: number;
  bestCombo: number;
  wpmHistory: WpmSample[];
}

export interface ScoreRecord {
  score: number;
  wpm: number;
  accuracy: number;
}

export interface Records {
  timeAttack: Record<string, ScoreRecord>;
  survival: (ScoreRecord & { wave: number }) | null;
  bossRush: (ScoreRecord & { bosses: number; time: number }) | null;
}

export interface SaveData {
  version: number;
  name: string;
  totalXp: number;
  stats: Stats;
  streak: { current: number; best: number; lastDay: string | null };
  daily: Record<string, ScoreRecord>;
  dailyBest: (ScoreRecord & { day: string }) | null;
  story: { unlocked: number; cleared: AreaId[]; quests: Record<string, 'done' | 'failed'> };
  achievements: Record<string, number>;
  loadout: Loadout;
  settings: Settings;
  records: Records;
}

export const SAVE_VERSION = 1;

// Known-good values for fields that are ever persisted as a bare string —
// if a save was written by an older build that used different ids for one
// of these (cosmetic renames, etc.), an unrecognized value here would
// otherwise silently propagate into a lookup like PALETTES[theme] and
// crash the whole app on load with nothing but a blank screen. Anything
// not in these lists falls back to the current default instead.
const VALID_THEMES: ThemeId[] = ['magma', 'mushroom', 'moss', 'mangrove', 'moonlight'];
const VALID_CHARACTERS: CharacterId[] = ['knight', 'mage', 'rogue', 'ranger'];

function sanitizeEnum<T extends string>(value: unknown, valid: readonly T[], fallback: T): T {
  return typeof value === 'string' && (valid as readonly string[]).includes(value) ? (value as T) : fallback;
}

export function createDefaultSave(reducedMotion = false): SaveData {
  return {
    version: SAVE_VERSION,
    name: 'Hero',
    totalXp: 0,
    stats: {
      totalChars: 0,
      keystrokes: 0,
      gamesPlayed: 0,
      battlesWon: 0,
      battlesLost: 0,
      bossesDefeated: 0,
      versusWins: 0,
      versusLosses: 0,
      bestWpm: 0,
      bestCombo: 0,
      wpmHistory: [],
    },
    streak: { current: 0, best: 0, lastDay: null },
    daily: {},
    dailyBest: null,
    story: { unlocked: 0, cleared: [], quests: {} },
    achievements: {},
    loadout: { character: 'knight', outfit: 'default', weapon: 'sword', title: 'Novice Typist', effect: 'spark' },
    settings: {
      volume: 0.6,
      music: true,
      sfx: true,
      animation: 'normal',
      reducedMotion,
      difficulty: 'medium',
      theme: 'moss',
    },
    records: { timeAttack: {}, survival: null, bossRush: null },
  };
}

/** Merge a stored blob over defaults so older or partial saves keep working. */
export function migrateSave(raw: unknown, reducedMotion = false): SaveData {
  const base = createDefaultSave(reducedMotion);
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<SaveData>;
  return {
    ...base,
    ...r,
    version: SAVE_VERSION,
    stats: { ...base.stats, ...(r.stats ?? {}), wpmHistory: Array.isArray(r.stats?.wpmHistory) ? r.stats!.wpmHistory : [] },
    streak: { ...base.streak, ...(r.streak ?? {}) },
    daily: { ...(r.daily ?? {}) },
    story: { ...base.story, ...(r.story ?? {}), cleared: r.story?.cleared ?? [], quests: r.story?.quests ?? {} },
    achievements: { ...(r.achievements ?? {}) },
    loadout: {
      ...base.loadout,
      ...(r.loadout ?? {}),
      character: sanitizeEnum(r.loadout?.character, VALID_CHARACTERS, base.loadout.character),
    },
    settings: {
      ...base.settings,
      ...(r.settings ?? {}),
      theme: sanitizeEnum(r.settings?.theme, VALID_THEMES, base.settings.theme),
      difficulty: sanitizeEnum(r.settings?.difficulty, DIFFICULTIES, base.settings.difficulty),
    },
    records: {
      timeAttack: { ...(r.records?.timeAttack ?? {}) },
      survival: r.records?.survival ?? null,
      bossRush: r.records?.bossRush ?? null,
    },
  };
}
