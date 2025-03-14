
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUIMode } from "@/components/UIModeProvider";
import GridBackground from "@/components/GridBackground";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { mode } = useUIMode();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || mode === "cli") {
    return null;
  }

  return (
    <div className="h-screen overflow-hidden">
      <GridBackground />
      <section className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto relative px-4 pt-16 sm:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10 flex flex-col md:flex-row items-center gap-8"
        >
          {/* Hero Image - Shown on top for mobile */}
          {isMobile && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full mb-2"
            >
              <div className="relative mx-auto w-64 h-64 sm:w-64 sm:h-64">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-pink opacity-50 blur-xl rounded-full"></div>
                <img 
                  src="/pp.JPG" 
                  alt="Developer workspace" 
                  className="rounded-full object-cover w-64 h-64 sm:w-64 sm:h-64 z-10 relative border border-white/10"
                />
              </div>
            </motion.div>
          )}
          
          <div className="flex-1 px-0 sm:px-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm mb-3 sm:mb-5 border border-primary/20">
              <Sparkles className="w-4 h-4 mr-2 text-neon-blue" />
              <span className="text-xs sm:text-sm font-medium">A Developer</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-5">
              <span className="block">Creating digital</span>
              <span className="block mt-1">
                experiences with <span className="text-neon-blue neon-text">precision</span>
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
              I design and build digital experiences that are intuitive, accessible,
              and visually stunning. Let's create something amazing together.
            </p>
            
            <div className="flex flex-row items-center justify-center gap-3">
              <Button asChild className="w-full sm:w-auto px-3 sm:px-5 py-2 rounded-full text-sm sm:text-base group" size="lg">
                <Link to="/projects">
                  <span>View Projects</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full sm:w-auto px-3 sm:px-5 py-2 rounded-full text-sm sm:text-base" size="lg">
                <Link to="/contact">
                  <span>Get in Touch</span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Image - Hidden on mobile, shown on desktop */}
          {!isMobile && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 max-w-[280px] md:max-w-[320px] lg:max-w-[400px]"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-pink opacity-50 blur-xl rounded-3xl"></div>
                <img 
                  src="/pp.JPG" 
                  alt="Developer workspace" 
                  className="rounded-3xl object-cover w-96 h-96 z-10 relative border border-white/10"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default Index;
