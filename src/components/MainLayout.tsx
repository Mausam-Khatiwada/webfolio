
import { useEffect } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { UIModeProvider, useUIMode } from "./UIModeProvider";
import { NeonParticles } from "./NeonParticles";
import { MobileNav } from "./MobileNav";
import { CLI } from "./CLI";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavMenu } from "./NavMenu";
import { useLocation } from "react-router-dom";
import { UIModeToggle } from "./UIModeToggle";

interface MainLayoutProps {
  children: React.ReactNode;
}

// Inner component that has access to the context
function MainLayoutInner({ children }: MainLayoutProps) {
  const { mode } = useUIMode();
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  return (
    <div className={`${isHomePage ? "h-screen overflow-hidden" : "min-h-screen pt-16"} w-full flex flex-col overflow-x-hidden`}>
      {/* Background with particles */}
      <NeonParticles />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-background/30">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter neon-text">M . K</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {!isMobile && <NavMenu />}
          <UIModeToggle />
        </div>
      </header>
      
      {/* Main content */}
      <main className={`flex-1 ${!isHomePage ? "pb-10" : ""} max-w-7xl mx-auto w-full px-4 sm:px-6`}>
        {mode === "gui" ? (
          <div className="animate-fade-in w-full">{children}</div>
        ) : (
          <div className="animate-fade-in w-full h-[80vh] flex items-center justify-center pt-20">
            <CLI />
          </div>
        )}
      </main>
      
      {/* Mobile Navigation */}
      {isMobile && mode === "gui" && <MobileNav />}
    </div>
  );
}

// Wrapper component that provides the context
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <UIModeProvider>
        <MainLayoutInner>{children}</MainLayoutInner>
      </UIModeProvider>
    </ThemeProvider>
  );
}
