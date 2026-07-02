import type { NoteTheme } from "../types/note";

export const NOTE_THEMES: NoteTheme[] = [
  { bg: "#fef08a", handle: "#fde047", border: "#facc15", text: "#1f2937" },
  { bg: "#bfdbfe", handle: "#93c5fd", border: "#60a5fa", text: "#1f2937" },
  { bg: "#bbf7d0", handle: "#86efac", border: "#4ade80", text: "#1f2937" },
  { bg: "#fbcfe8", handle: "#f9a8d4", border: "#f472b6", text: "#1f2937" },
  { bg: "#e9d5ff", handle: "#d8b4fe", border: "#c084fc", text: "#1f2937" },
  { bg: "#fed7aa", handle: "#fdba74", border: "#fb923c", text: "#1f2937" },
];

export const getRandomNoteTheme = (): NoteTheme => {
  return NOTE_THEMES[Math.floor(Math.random() * NOTE_THEMES.length)];
};

export const getFallbackNoteTheme = (): NoteTheme => {
  return NOTE_THEMES[0];
};