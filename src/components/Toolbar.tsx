interface ToolbarProps {
  onCreate: () => void;
}

export default function Toolbar({ onCreate }: ToolbarProps) {
  return (
    <header className="toolbar">
      <h1 className="toolbar-title">
        <span aria-hidden="true">📌</span>
        Tempo Sticky Notes Board
      </h1>

      <button onClick={onCreate} className="toolbar-button">
        + New Note
      </button>
    </header>
  );
}