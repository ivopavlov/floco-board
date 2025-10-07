import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";

export default function NotesCard() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    localStorage.setItem("notes", e.target.value);
  };

  return (
    <Card className="bg-card/20 backdrop-blur-sm border-border/50 p-6 flex flex-1 flex-col">
      <h2 className="text-xl font-semibold text-card-foreground mb-6">Notes</h2>
      <Textarea
        placeholder="Begin your thoughts here..."
        value={notes}
        onChange={handleNotesChange}
        className="flex-1 resize-none border-none bg-transparent text-card-foreground placeholder:text-foreground focus:ring-0 focus:outline-none text-base leading-relaxed"
      />
    </Card>
  );
}
