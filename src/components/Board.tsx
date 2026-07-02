import type { RefObject } from "react";
import StickyNote from "./StickyNote";
import type { Note } from "../types/note";

interface BoardProps {
  boardRef: RefObject<HTMLElement | null>;
  notes: Note[];
}

export default function Board({ boardRef, notes }: BoardProps) {
  return (
    <main ref={boardRef} className="board">
      <div className="board-canvas">
        {notes.length === 0 ? (
          <div className="board-empty-state">
            <h2>No notes yet</h2>
            <p>Use the New Note button to start building your board.</p>
          </div>
        ) : (
          notes.map((note) => <StickyNote key={note.id} note={note} />)
        )}
      </div>
    </main>
  );
}