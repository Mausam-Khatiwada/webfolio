
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, User, Briefcase, Mail, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/about", icon: User, label: "About" },
    { path: "/projects", icon: Briefcase, label: "Projects" },
    { path: "/contact", icon: Mail, label: "Contact" },
  ];

  useEffect(() => {
    // Find active index based on current path
    const index = navItems.findIndex((item) => item.path === location.pathname);
    setActiveIndex(index >= 0 ? index : 0);
    
    // Show nav after a short delay for animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <nav 
      className={cn(
        "mobile-nav transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0",
        isCollapsed ? "right-[-60px]" : "right-2"
      )}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-7 bg-background/80 backdrop-blur-sm rounded-full p-2 z-10"
        aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
      >
        {isCollapsed ? (
          <ChevronLeft className="w-4 h-4 text-white" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white" />
        )}
      </button>
      
      <div className="relative">
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "mobile-nav-item transition-all duration-300",
              index === activeIndex && "active"
            )}
            aria-label={item.label}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-all duration-300",
              index === activeIndex ? "text-white" : "text-white/70"
            )} />
          </Link>
        ))}
      </div>
    </nav>
  );
}
