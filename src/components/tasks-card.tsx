import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TasksCard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [
        ...tasks,
        {
          id: Date.now().toString(),
          text: newTask.trim(),
          completed: false,
        },
      ];
      setTasks(updatedTasks);
      // Save the new task to local storage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      // Clear the input field after adding the task
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const removeTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-border/50 p-6 flex flex-1 flex-col">
      <h2 className="text-xl font-semibold text-card-foreground mb-6">Tasks</h2>

      <div className="flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => toggleTask(task.id)}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span
              className={`flex-1 text-sm ${
                task.completed
                  ? "line-through text-muted-foreground"
                  : "text-card-foreground"
              }`}
            >
              {task.text}
            </span>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                removeTask(task.id);
              }}
              size="icon"
              variant="ghost"
              className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex space-x-2">
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          className="flex-1 bg-input/50 border-border/50 text-card-foreground placeholder:text-muted-foreground"
        />
        <Button
          onClick={addTask}
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
