// Fullscreen semi-transparent blured Background Gallery Dialog
// Allows users to select a background image for the app
// uses localStorage to save the selected background image
// uses shadcn/ui dialog component
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
import { Wallpaper } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const BACKGROUND_IMAGES = [
  {
    id: "1",
    url: "/bg-1.png",
    alt: "Mountain Landscape",
  },
  {
    id: "2",
    url: "/bg-2.png",
    alt: "Forest Path",
  },
];

export function BackgroundGalleryDialog() {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );

  useEffect(() => {
    const storedBackground = localStorage.getItem("backgroundImage");
    if (storedBackground) {
      setSelectedBackground(storedBackground);
      const dashboard = document.getElementById("dashboard");
      if (dashboard) {
        dashboard.style.backgroundImage = `url(${storedBackground})`;
      }
    }
  }, []);

  const handleBackgroundSelect = (url: string) => {
    setSelectedBackground(url);
    localStorage.setItem("backgroundImage", url);
    const dashboard = document.getElementById("dashboard");
    if (dashboard) {
      dashboard.style.backgroundImage = `url(${url})`;
    }
  };

  const clearBackground = () => {
    setSelectedBackground(null);
    localStorage.removeItem("backgroundImage");
    const dashboard = document.getElementById("dashboard");
    if (dashboard) {
      dashboard.style.backgroundImage = "";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Wallpaper />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl w-full h-full max-h-full bg-background/70 backdrop-blur-lg">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl">Select Background</DialogTitle>
          </div>
          <DialogDescription className="mt-2 text-muted-foreground">
            Choose a background image for your productivity board.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 overflow-y-auto max-h-[60vh] pr-2">
          {BACKGROUND_IMAGES.map((image) => (
            <div
              key={image.id}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-4 aspect-video ${
                selectedBackground === image.url
                  ? "border-primary"
                  : "border-transparent hover:border-primary/50"
              }`}
              onClick={() => handleBackgroundSelect(image.url)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {selectedBackground === image.url && (
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-white bg-primary/80 rounded-full p-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={clearBackground}>
            Clear Background
          </Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
