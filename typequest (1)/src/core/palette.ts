import type { ThemeId } from './types';

export interface PaletteStops {
  light: string;
  mid: string;
  dark: string;
  accent: string;
  glow: string;
}

/**
 * Five environment palettes, each a light -> mid -> dark gradient plus an
 * accent/glow color, matching the reference palette board. These drive
 * themed UI chrome (via CSS custom properties set on the root) — they do
 * NOT recolor the sky/forest battle backdrops, which stay their own fixed
 * colors regardless of the active theme.
 */
export const PALETTES: Record<ThemeId, PaletteStops> = {
  magma: { light: '#f6c94a', mid: '#e07a2c', dark: '#4a1c14', accent: '#ff8a3d', glow: 'rgba(255,138,61,0.55)' },
  mushroom: { light: '#8fe0f7', mid: '#3f6fa8', dark: '#141c33', accent: '#5fd4f0', glow: 'rgba(95,212,240,0.5)' },
  moss: { light: '#9be050', mid: '#3f8f68', dark: '#152030', accent: '#7bd45a', glow: 'rgba(123,212,90,0.5)' },
  mangrove: { light: '#d8f0c8', mid: '#5a86a8', dark: '#182236', accent: '#8fc4d8', glow: 'rgba(143,196,216,0.5)' },
  moonlight: { light: '#f0e6d8', mid: '#a98fb0', dark: '#1a1830', accent: '#c9b6d4', glow: 'rgba(201,182,212,0.55)' },
};

export const THEME_ORDER: ThemeId[] = ['moss', 'mushroom', 'mangrove', 'magma', 'moonlight'];
