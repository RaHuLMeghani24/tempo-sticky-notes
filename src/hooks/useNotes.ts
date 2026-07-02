import { useCallback, useEffect, useState } from "react";
import { stickyNotesApi } from "../api/stickyNotesApi";
import { DEFAULT_NOTE_SIZE, SAVE_DEBOUNCE_MS } from "../constants/stickyNoteConfig";
import {
  getFallbackNoteTheme,
  getRandomNoteTheme,
} from "../constants/stickyNoteThemes";
import type { Note, NoteUpdate } from "../types/note";
import { getNextNotePosition } from "../utils/stickyNotePlacement";

interface UseNotesOptions {
  getBoardWidth: () => number;
}

export const useNotes = ({ getBoardWidth }: UseNotesOptions) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoadedFromApi, setHasLoadedFromApi] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setIsLoading(true);

        const savedNotes = await stickyNotesApi.getNotes();

        const normalizedNotes = savedNotes.map((note) => ({
          ...note,
           // Older saved notes may not have a color if the data model changes later
          color: note.color || getFallbackNoteTheme(),
        }));

        setNotes(normalizedNotes);
      } catch (error) {
        console.error("Failed to load notes", error);
      } finally {
        setHasLoadedFromApi(true);
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    if (!hasLoadedFromApi) return;
    // Debounce saves so typing into a note does not trigger storage writes
    // on every single keypress.
    const saveTimeout = window.setTimeout(async () => {
      try {
        setIsSaving(true);
        await stickyNotesApi.saveNotes(notes);
      } catch (error) {
        console.error("Failed to save notes", error);
      } finally {
        setIsSaving(false);
      }
    }, SAVE_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(saveTimeout);
    };
  }, [notes, hasLoadedFromApi]);

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

  const deleteAllNotes = useCallback(async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all notes? This cannot be undone."
    );

    if (!confirmed) return;

    try {
      setIsSaving(true);
      await stickyNotesApi.deleteAllNotes();
      setNotes([]);
    } catch (error) {
      console.error("Failed to delete all notes", error);
    } finally {
      setIsSaving(false);
    }
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
    isLoading,
    isSaving,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
    bringNoteToFront,
  };
};