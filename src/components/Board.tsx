export default function Board() {
  return (
    <main className="board">
      <div className="board-canvas">
        <div className="board-empty-state">
          <h2>No notes yet</h2>
          <p>Use the New Note button to start building your board.</p>
        </div>
      </div>
    </main>
  );
}