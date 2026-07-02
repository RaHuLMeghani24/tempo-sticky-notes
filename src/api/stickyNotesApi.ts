import type { Note } from "../types/note";
import { getStoredNotes, saveStoredNotes } from "../utils/stickyNotesStorage";

const MOCK_API_DELAY_MS = 350;

const delay = (ms = MOCK_API_DELAY_MS) => {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
};

export const stickyNotesApi = {
  async getNotes(): Promise<Note[]> {
    // Simulates a REST request while localStorage acts as the mock database.
    await delay();
    return getStoredNotes();
  },

  async saveNotes(notes: Note[]): Promise<Note[]> {
    await delay();
    saveStoredNotes(notes);
    return notes;
  },

  async deleteAllNotes(): Promise<void> {
    await delay();
    saveStoredNotes([]);
  },
};