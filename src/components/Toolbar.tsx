interface ToolbarProps {
  onCreate: () => void;
  onDeleteAll: () => void;
  hasNotes: boolean;
  isLoading: boolean;
  isSaving: boolean;
}

export default function Toolbar({
  onCreate,
  onDeleteAll,
  hasNotes,
  isLoading,
  isSaving,
}: ToolbarProps) {
  return (
    <header className="toolbar">
      <h1 className="toolbar-title">
        <span aria-hidden="true">📌</span>
        Tempo Sticky Notes Board
      </h1>

      <div className="toolbar-actions">
        <span className="save-status">
          {isLoading ? "Loading..." : isSaving ? "Saving..." : "Saved"}
        </span>

        <button
          onClick={onCreate}
          disabled={isLoading}
          className="toolbar-button"
        >
          + New Note
        </button>

        <button
          onClick={onDeleteAll}
          disabled={!hasNotes || isLoading || isSaving}
          className="toolbar-button-delete"
        >
          Delete All
        </button>
      </div>
    </header>
  );
}