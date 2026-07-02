export const DEFAULT_NOTE_SIZE = {
  width: 180,
  height: 140,
} as const;

export const NOTE_SIZE_LIMITS = {
  minWidth: 150,
  minHeight: 110,
  maxWidth: 520,
  maxHeight: 420,
} as const;

export const NOTE_LAYOUT = {
  gap: 20,
  boardPadding: 40,
  maxPlacementAttemptsBuffer: 100,
} as const;

export const SAVE_DEBOUNCE_MS = 400;