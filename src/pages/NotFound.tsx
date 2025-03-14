
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center glass-panel p-10 rounded-xl max-w-md"
      >
        <XCircle className="w-16 h-16 mx-auto mb-6 text-neon-pink" />
        <h1 className="text-4xl font-bold mb-4 neon-text-pink">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild className="rounded-full group">
          <Link to="/">
            <ArrowLeft className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Return Home</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
