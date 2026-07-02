import Board from "./components/Board";
import Toolbar from "./components/Toolbar";

export default function App() {
  const handleCreateNote = () => {
    // TODO: Implement note creation logic here
  };

  return (
    <div className="app-shell">
      <Toolbar onCreate={handleCreateNote} />
      <Board />
    </div>
  );
}