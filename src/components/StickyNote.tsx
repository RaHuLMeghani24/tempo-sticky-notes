import { useEffect, useRef, type PointerEvent } from "react";
import type { Note, NoteUpdate } from "../types/note";

interface StickyNoteProps {
  note: Note;
  onUpdateNote: (noteId: string, update: NoteUpdate) => void;
  onFocusNote: (noteId: string) => void;
  onDragEnd: (noteId: string, noteRect: DOMRect) => void;
}

export default function StickyNote({note, onUpdateNote,onFocusNote,onDragEnd,}: StickyNoteProps) {
  const elementRef = useRef<HTMLElement>(null);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: note.x, y: note.y });

  useEffect(() => {
    currentPosition.current = {
      x: note.x,
      y: note.y,
    };
  }, [note.x, note.y]);

  const handleDragPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;

    event.stopPropagation();

    onFocusNote(note.id);
    isDragging.current = true;

    dragStart.current = {
      x: event.clientX - currentPosition.current.x,
      y: event.clientY - currentPosition.current.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isDragging.current || !elementRef.current) return;

    const nextX = event.clientX - dragStart.current.x;
    const nextY = event.clientY - dragStart.current.y;

    currentPosition.current = {
      x: nextX,
      y: nextY,
    };

    elementRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
  };

  const handleDragPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isDragging.current) return;

    isDragging.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const noteRect = elementRef.current?.getBoundingClientRect();

    onUpdateNote(note.id, {
      x: currentPosition.current.x,
      y: currentPosition.current.y,
    });

    if (noteRect) {
      onDragEnd(note.id, noteRect);
    }
  };

  return (
    <article
      ref={elementRef}
      className="dynamic-note"
      style={{
        width: `${note.width}px`,
        height: `${note.height}px`,
        zIndex: note.zIndex,
        transform: `translate3d(${note.x}px, ${note.y}px, 0)`,
        backgroundColor: note.color.bg,
        willChange: "transform",
      }}
      onPointerDown={() => onFocusNote(note.id)}
    >
      <button
        type="button"
        className="note-drag-handle"
        title="Drag note"
        aria-label="Drag note"
        onPointerDown={handleDragPointerDown}
        onPointerMove={handleDragPointerMove}
        onPointerUp={handleDragPointerUp}
        onPointerCancel={handleDragPointerUp}
      >
        ⠿
      </button>

      <textarea
        className="dynamic-textarea"
        value={note.text}
        placeholder="Type something..."
        style={{
          color: note.color.text,
          backgroundColor: note.color.bg,
        }}
        onPointerDown={(event) => {
          event.stopPropagation();
          onFocusNote(note.id);
        }}
        onChange={(event) =>
          onUpdateNote(note.id, {
            text: event.target.value,
          })
        }
      />
    </article>
  );
}