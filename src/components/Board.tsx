import { useRef, type RefObject } from "react";
import StickyNote from "./StickyNote";
import type { Note, NoteUpdate } from "../types/note";
import { doRectsOverlap } from "../utils/geometry";

interface BoardProps {
  boardRef: RefObject<HTMLElement | null>;
  notes: Note[];
  onUpdateNote: (noteId: string, update: NoteUpdate) => void;
  onDeleteNote: (noteId: string) => void;
  onFocusNote: (noteId: string) => void;
}

export default function Board({boardRef,notes,onUpdateNote,onDeleteNote,onFocusNote,}: BoardProps) {
  const trashRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (noteId: string, noteRect: DOMRect) => {
    if (!trashRef.current) return;

    const trashRect = trashRef.current.getBoundingClientRect();

    if (doRectsOverlap(noteRect, trashRect)) {
      onDeleteNote(noteId);
    }
  };

  return (
    <main ref={boardRef} className="board">
      <div className="board-canvas">
        {notes.length === 0 ? (
          <div className="board-empty-state">
            <h2>No notes yet</h2>
            <p>Use the New Note button to start building your board.</p>
          </div>
        ) : (
          notes.map((note) => (
            <StickyNote
              key={note.id}
              note={note}
              onUpdateNote={onUpdateNote}
              onFocusNote={onFocusNote}
              onDragEnd={handleDragEnd}
            />
          ))
        )}
      </div>

      <div ref={trashRef} className="trash-zone">
        <div className="trash-icon">🗑️</div>

        <div className="trash-content">
          <span className="trash-title">Drop note here to delete</span>
          <span className="trash-subtitle">Release inside this area</span>
        </div>
      </div>
    </main>
  );
}