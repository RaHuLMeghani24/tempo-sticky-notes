import type { Note } from "../types/note";

interface StickyNoteProps {
  note: Note;
}

export default function StickyNote({ note }: StickyNoteProps) {
  return (
    <article
      className="dynamic-note"
      style={{
        width: `${note.width}px`,
        height: `${note.height}px`,
        zIndex: note.zIndex,
        transform: `translate3d(${note.x}px, ${note.y}px, 0px)`,
        backgroundColor: note.color.bg,
      }}
    >
      <p className="note-placeholder">New note</p>
    </article>
  );
}