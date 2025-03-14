import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ModeToggle() {
  const { theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full w-10 h-10 transition-all duration-300 bg-background/50 backdrop-blur-sm border border-border hidden"
    >
      <Moon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Dark mode</span>
    </Button>
  );
}
