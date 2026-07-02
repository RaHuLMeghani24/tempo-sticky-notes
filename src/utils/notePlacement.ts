import { DEFAULT_NOTE_SIZE, NOTE_LAYOUT } from "../constants/stickyNoteConfig";
import type { Note } from "../types/note";

export interface NotePosition {
  x: number;
  y: number;
}

export const getNextNotePosition = (existingNotes: Note[], boardWidth: number): NotePosition => {
  const availableWidth = Math.max(DEFAULT_NOTE_SIZE.width, boardWidth - NOTE_LAYOUT.boardPadding * 2);

  const columnsPerRow = Math.max(1, Math.floor((availableWidth + NOTE_LAYOUT.gap) / (DEFAULT_NOTE_SIZE.width + NOTE_LAYOUT.gap)));

  const index = existingNotes.length;
  const row = Math.floor(index / columnsPerRow);
  const col = index % columnsPerRow;

  return {
    x: NOTE_LAYOUT.boardPadding + col * (DEFAULT_NOTE_SIZE.width + NOTE_LAYOUT.gap),
    y: NOTE_LAYOUT.boardPadding + row * (DEFAULT_NOTE_SIZE.height + NOTE_LAYOUT.gap),
  };
};