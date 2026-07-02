import type { Note } from "../types/note";

const STORAGE_KEY = "sticky_notes_data";

export const getStoredNotes = (): Note[] => {
  const savedNotes = localStorage.getItem(STORAGE_KEY);

  if (!savedNotes) return [];

  try {
    return JSON.parse(savedNotes) as Note[];
  } catch {
    return [];
  }
};

export const saveStoredNotes = (notes: Note[]): void => {
  if (notes.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};