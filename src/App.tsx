import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import TasksCard from "./components/tasks-card";
import NotesCard from "./components/notes-card";
import PomodoroCard from "./components/pomodoro-card";
import Navbar from "./components/navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <div
        id="dashboard"
        className="min-h-screen bg-background p-6 flex items-center justify-center bg-[url(/bg-1.png)]"
      >
        <div className="w-full max-w-7xl flex gap-8 h-[80vh]">
          {/* Left Panel: To-Do List */}
          <TasksCard />

          {/* Center Panel: Notepad */}
          <NotesCard />

          {/* Right Panel: Pomodoro Timer */}
          <PomodoroCard />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
