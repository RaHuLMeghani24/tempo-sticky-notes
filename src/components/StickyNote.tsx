import { useEffect, useRef, type PointerEvent } from "react";
import { NOTE_SIZE_LIMITS } from "../constants/stickyNoteConfig";
import type { Note, NoteUpdate } from "../types/note";
import { clamp } from "../utils/geometry";

interface StickyNoteProps {
  note: Note;
  onUpdateNote: (noteId: string, update: NoteUpdate) => void;
  onFocusNote: (noteId: string) => void;
  onDragEnd: (noteId: string, noteRect: DOMRect) => void;
}

export default function StickyNote({note,onUpdateNote,onFocusNote,onDragEnd,}: StickyNoteProps) {
  const elementRef = useRef<HTMLElement>(null);

  const isDragging = useRef(false);
  const isResizing = useRef(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: note.x, y: note.y });

  const resizeStart = useRef({
    pointerX: 0,
    pointerY: 0,
    width: note.width,
    height: note.height,
  });

  const currentSize = useRef({
    width: note.width,
    height: note.height,
  });

  useEffect(() => {
    currentPosition.current = {
      x: note.x,
      y: note.y,
    };
  }, [note.x, note.y]);

  useEffect(() => {
    currentSize.current = {
      width: note.width,
      height: note.height,
    };
  }, [note.width, note.height]);

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
    // Apply movement directly to the DOM during dragging for smoother feedback.
    // React state is updated once when the pointer is released.
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

  const handleResizePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;

    event.stopPropagation();

    onFocusNote(note.id);
    isResizing.current = true;

    resizeStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      width: currentSize.current.width,
      height: currentSize.current.height,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleResizePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isResizing.current || !elementRef.current) return;

    const deltaX = event.clientX - resizeStart.current.pointerX;
    const deltaY = event.clientY - resizeStart.current.pointerY;

    const nextWidth = clamp(
      resizeStart.current.width + deltaX,
      NOTE_SIZE_LIMITS.minWidth,
      NOTE_SIZE_LIMITS.maxWidth
    );

    const nextHeight = clamp(
      resizeStart.current.height + deltaY,
      NOTE_SIZE_LIMITS.minHeight,
      NOTE_SIZE_LIMITS.maxHeight
    );

    currentSize.current = {
      width: nextWidth,
      height: nextHeight,
    };
    // Like dragging, resize feedback is applied immediately and committed
    // to React state only at the end of the interaction.
    elementRef.current.style.width = `${nextWidth}px`;
    elementRef.current.style.height = `${nextHeight}px`;
  };

  const handleResizePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isResizing.current) return;

    isResizing.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    onUpdateNote(note.id, {
      width: currentSize.current.width,
      height: currentSize.current.height,
    });
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
        willChange: "transform, width, height",
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

      <button
        type="button"
        className="note-resize-handle"
        title="Resize note"
        aria-label="Resize note"
        onPointerDown={handleResizePointerDown}
        onPointerMove={handleResizePointerMove}
        onPointerUp={handleResizePointerUp}
        onPointerCancel={handleResizePointerUp}
      />
    </article>
  );
}