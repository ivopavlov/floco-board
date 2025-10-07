import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import React from "react";

const POMODORO_DURATION = "25";
const SHORT_BREAK_DURATION = "5";
const LONG_BREAK_DURATION = "15";

export function PomodoroSettingsDialog({ onSave }: { onSave: () => void }) {
  const pomodoroInputRef = React.useRef<HTMLInputElement>(null);
  const shortBreakInputRef = React.useRef<HTMLInputElement>(null);
  const longBreakInputRef = React.useRef<HTMLInputElement>(null);

  const convertMinutesToSeconds = (time: string) => {
    return String(parseInt(time) * 60);
  };

  const onSubmit = () => {
    const pomodoroDuration = pomodoroInputRef.current?.value;
    const shortBreakDuration = shortBreakInputRef.current?.value;
    const longBreakDuration = longBreakInputRef.current?.value;

    localStorage.setItem(
      "pomodoroDuration",
      convertMinutesToSeconds(pomodoroDuration || POMODORO_DURATION)
    );
    localStorage.setItem(
      "shortBreakDuration",
      convertMinutesToSeconds(shortBreakDuration || SHORT_BREAK_DURATION)
    );
    localStorage.setItem(
      "longBreakDuration",
      convertMinutesToSeconds(longBreakDuration || LONG_BREAK_DURATION)
    );

    onSave();
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <Settings className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configure Pomodoro</DialogTitle>
            <DialogDescription>
              Make changes to your Pomodoro settings here. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="pomodoro">Pomodoro (minutes)</Label>
              <Input
                ref={pomodoroInputRef}
                type="number"
                id="pomodoro"
                name="pomodoro"
                defaultValue={POMODORO_DURATION}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="short-break">Short Break (minutes)</Label>
              <Input
                ref={shortBreakInputRef}
                type="number"
                id="short-break"
                name="short-break"
                defaultValue={SHORT_BREAK_DURATION}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="long-break">Long Break (minutes)</Label>
              <Input
                ref={longBreakInputRef}
                type="number"
                id="long-break"
                name="long-break"
                defaultValue={LONG_BREAK_DURATION}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={onSubmit} type="button">
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
