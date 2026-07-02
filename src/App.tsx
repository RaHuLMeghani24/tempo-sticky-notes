import { useCallback, useRef } from "react";
import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import { useNotes } from "./hooks/useNotes";

export default function App() {
  const boardRef = useRef<HTMLElement | null>(null);

  const getBoardWidth = useCallback(() => {
    return boardRef.current?.clientWidth ?? window.innerWidth;
  }, []);

  const {
    notes,
    isLoading,
    isSaving,
    createNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
    bringNoteToFront,
  } = useNotes({
    getBoardWidth,
  });

  return (
    <div className="app-shell">
      <Toolbar
        onCreate={createNote}
        onDeleteAll={deleteAllNotes}
        hasNotes={notes.length > 0}
        isLoading={isLoading}
        isSaving={isSaving}
      />

      {isLoading ? (
        <div className="loading-state">Loading notes...</div>
      ) : (
        <Board
          boardRef={boardRef}
          notes={notes}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
          onFocusNote={bringNoteToFront}
        />
      )}
    </div>
  );
}