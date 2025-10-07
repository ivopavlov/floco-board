import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import { PomodoroSettingsDialog } from "./pomodoro-settings-dialog";

const POMODORO_DURATION = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes in seconds

export default function PomodoroCard() {
  const [pomodoroState, setPomodoroState] = useState<
    "pomodoro" | "shortBreak" | "longBreak"
  >("pomodoro");
  const [timeLeft, setTimeLeft] = useState(POMODORO_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(1);

  const loadDurationsFromStorage = () => {
    const storedPomodoroDuration = localStorage.getItem("pomodoroDuration");
    const storedShortBreakDuration = localStorage.getItem("shortBreakDuration");
    const storedLongBreakDuration = localStorage.getItem("longBreakDuration");

    if (!storedPomodoroDuration) {
      localStorage.setItem("pomodoroDuration", String(POMODORO_DURATION));
    }
    if (!storedShortBreakDuration) {
      localStorage.setItem("shortBreakDuration", String(SHORT_BREAK_DURATION));
    }
    if (!storedLongBreakDuration) {
      localStorage.setItem("longBreakDuration", String(LONG_BREAK_DURATION));
    }

    switch (pomodoroState) {
      case "pomodoro":
        setTimeLeft(Number(storedPomodoroDuration) || POMODORO_DURATION);
        break;
      case "shortBreak":
        setTimeLeft(Number(storedShortBreakDuration) || SHORT_BREAK_DURATION);
        break;
      case "longBreak":
        setTimeLeft(Number(storedLongBreakDuration) || LONG_BREAK_DURATION);
        break;
      default:
        setTimeLeft(POMODORO_DURATION);
    }
  };

  useEffect(() => {
    loadDurationsFromStorage();
    const storedPomodoroDuration = localStorage.getItem("pomodoroDuration");
    setTimeLeft(Number(storedPomodoroDuration!));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (pomodoroState === "pomodoro") {
        setPomodoroCount((count) => count + 1);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, pomodoroState, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  return (
    <Card className="relative bg-card/20 backdrop-blur-sm border-border/50 p-6 flex flex-1 flex-col items-center justify-center">
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-card-foreground">
          Pomodoro #{pomodoroCount}
        </h2>
        <PomodoroSettingsDialog onSave={loadDurationsFromStorage} />
      </div>

      <div className="text-xl font-semibold text-card-foreground mb-8 flex items-center gap-4">
        <Button
          variant={pomodoroState === "pomodoro" ? "secondary" : "outline"}
          className="flex flex-1"
          onClick={() => {
            setPomodoroState("pomodoro");
            setTimeLeft(
              localStorage.getItem("pomodoroDuration") as unknown as number
            );
          }}
        >
          Focus
        </Button>
        <Button
          variant={pomodoroState === "shortBreak" ? "secondary" : "outline"}
          className="flex flex-1"
          onClick={() => {
            setPomodoroState("shortBreak");
            setTimeLeft(
              localStorage.getItem("shortBreakDuration") as unknown as number
            );
          }}
        >
          Short Break
        </Button>
        <Button
          variant={pomodoroState === "longBreak" ? "secondary" : "outline"}
          className="flex flex-1"
          onClick={() => {
            setPomodoroState("longBreak");
            setTimeLeft(
              localStorage.getItem("longBreakDuration") as unknown as number
            );
          }}
        >
          Long Break
        </Button>
      </div>

      <div className="text-6xl font-mono font-bold text-card-foreground mb-8 text-center">
        {formatTime(timeLeft)}
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          size="icon"
          className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
        >
          {isRunning ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <Button
          onClick={resetTimer}
          size="icon"
          variant="outline"
          className="w-12 h-12 border-border/50 text-card-foreground hover:bg-muted/50 rounded-full bg-transparent"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>
    </Card>
  );
}
