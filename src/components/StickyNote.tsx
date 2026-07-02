import type { Note, NoteUpdate } from "../types/note";

interface StickyNoteProps {
  note: Note;
  onUpdateNote: (noteId: string, update: NoteUpdate) => void;
}

export default function StickyNote({ note, onUpdateNote }: StickyNoteProps) {
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
      <textarea
        className="dynamic-textarea"
        value={note.text}
        placeholder="Type something..."
        style={{
          color: note.color.text,
          backgroundColor: note.color.bg,
        }}
        onChange={(event) => onUpdateNote(note.id, {
            text: event.target.value,
          })
        }
      />
    </article>
  );
}