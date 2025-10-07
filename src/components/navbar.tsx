import { BackgroundGalleryDialog } from "./background-galery-dialog";
import Clock from "./clock";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 flex flex-1 px-4 py-2 bg-background/10">
      <div className="flex flex-1" />
      <div className="flex flex-1 items-center justify-center">
        <Clock />
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <BackgroundGalleryDialog />
        <ModeToggle />
      </div>
    </div>
  );
}
