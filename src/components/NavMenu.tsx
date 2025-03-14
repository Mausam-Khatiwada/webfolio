
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

interface NavMenuProps {
  orientation?: "horizontal" | "vertical";
}

export function NavMenu({ orientation = "horizontal" }: NavMenuProps) {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className={cn(
      "flex items-center",
      orientation === "vertical" ? "flex-col items-start gap-6" : "gap-4"
    )}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            orientation === "vertical" ? "text-base py-2" : "",
            location.pathname === item.path 
              ? "text-foreground neon-text" 
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
