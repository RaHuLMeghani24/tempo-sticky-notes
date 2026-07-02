import { useCallback, useRef } from "react";
import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import { useNotes } from "./hooks/useNotes";

export default function App() {
  const boardRef = useRef<HTMLElement | null>(null);

  const getBoardWidth = useCallback(() => {
    return boardRef.current?.clientWidth ?? window.innerWidth;
  }, []);

  const { notes, createNote, updateNote, deleteNote, bringNoteToFront } =useNotes({getBoardWidth});

  return (
    <div className="app-shell">
      <Toolbar onCreate={createNote} />

      <Board
        boardRef={boardRef}
        notes={notes}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
        onFocusNote={bringNoteToFront}
      />
    </div>
  );
}