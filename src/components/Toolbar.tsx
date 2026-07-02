interface ToolbarProps {
  onCreate: () => void;
  onDeleteAll: () => void;
  hasNotes: boolean;
}

export default function Toolbar({
  onCreate,
  onDeleteAll,
  hasNotes,
}: ToolbarProps) {
  return (
    <header className="toolbar">
      <h1 className="toolbar-title">
        <span aria-hidden="true">📌</span>
        Sticky Notes Board
      </h1>

      <div className="toolbar-actions">
        <button onClick={onCreate} className="toolbar-button">
          + New Note
        </button>

        <button
          onClick={onDeleteAll}
          disabled={!hasNotes}
          className="toolbar-button-delete"
        >
          Delete All
        </button>
      </div>
    </header>
  );
}