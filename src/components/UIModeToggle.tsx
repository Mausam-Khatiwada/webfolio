
import { Command, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIMode } from "./UIModeProvider";

export function UIModeToggle() {
  const { mode, setMode } = useUIMode();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setMode(mode === "gui" ? "cli" : "gui")}
      className="rounded-full w-10 h-10 transition-all duration-300 bg-background/50 backdrop-blur-sm border border-border"
    >
      <LayoutGrid className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ui-mode-cli:-rotate-90 ui-mode-cli:scale-0" />
      <Command className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ui-mode-cli:rotate-0 ui-mode-cli:scale-100" />
      <span className="sr-only">Toggle UI mode</span>
    </Button>
  );
}
