import { useCallback, useState } from "react";
import { DEFAULT_NOTE_SIZE } from "../constants/stickyNoteConfig";
import { getRandomNoteTheme } from "../constants/stickyNoteThemes";
import type { Note, NoteUpdate } from "../types/note";
import { getNextNotePosition } from "../utils/notePlacement";

interface UseNotesOptions {
  getBoardWidth: () => number;
}

export const useNotes = ({ getBoardWidth }: UseNotesOptions) => {
  const [notes, setNotes] = useState<Note[]>([]);

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

  return {
    notes,
    createNote,
    updateNote,
  };
};