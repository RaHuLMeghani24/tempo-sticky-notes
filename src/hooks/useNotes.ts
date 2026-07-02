import { useCallback, useEffect, useState } from "react";
import { DEFAULT_NOTE_SIZE } from "../constants/stickyNoteConfig";
import {
  getFallbackNoteTheme,
  getRandomNoteTheme,
} from "../constants/stickyNoteThemes";
import type { Note, NoteUpdate } from "../types/note";
import { getNextNotePosition } from "../utils/notePlacement";
import { getStoredNotes, saveStoredNotes } from "../utils/notesStorage";

interface UseNotesOptions {
  getBoardWidth: () => number;
}

export const useNotes = ({ getBoardWidth }: UseNotesOptions) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    return getStoredNotes().map((note) => ({
      ...note,
      color: note.color || getFallbackNoteTheme(),
    }));
  });

  useEffect(() => {
    saveStoredNotes(notes);
  }, [notes]);

  const createNote = useCallback(() => {
    setNotes((previousNotes) => {
      const highestZ =
        previousNotes.length === 0
          ? 1
          : Math.max(...previousNotes.map((note) => note.zIndex)) + 1;

      const { x, y } = getNextNotePosition(previousNotes, getBoardWidth());

      const newNote: Note = {
        id: crypto.randomUUID(),
        x,
        y,
        width: DEFAULT_NOTE_SIZE.width,
        height: DEFAULT_NOTE_SIZE.height,
        text: "",
        zIndex: highestZ,
        color: getRandomNoteTheme(),
      };

      return [...previousNotes, newNote];
    });
  }, [getBoardWidth]);

  const updateNote = useCallback((noteId: string, update: NoteUpdate) => {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === noteId ? { ...note, ...update } : note
      )
    );
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== noteId)
    );
  }, []);

  const deleteAllNotes = useCallback(() => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all notes? This cannot be undone."
    );

    if (!confirmed) return;

    setNotes([]);
  }, []);

  const bringNoteToFront = useCallback((noteId: string) => {
    setNotes((previousNotes) => {
      const highestZ =
        previousNotes.length === 0
          ? 1
          : Math.max(...previousNotes.map((note) => note.zIndex));

      return previousNotes.map((note) =>
        note.id === noteId ? { ...note, zIndex: highestZ + 1 } : note
      );
    });
  }, []);

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
    bringNoteToFront,
  };
};