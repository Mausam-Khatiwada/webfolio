
import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let time = 0;
    
    // Grid configuration
    const cellSize = 50;
    const dotSize = 2;
    
    // Animated items configuration
    const items: {x: number, y: number, size: number, speed: number, angle: number}[] = [];
    const itemCount = 15;
    
    // Create animated items
    for (let i = 0; i < itemCount; i++) {
      items.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2
      });
    }
    
    // Handle canvas resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial resize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      
      // Set colors based on theme with enhanced contrast for light mode
      const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.12)";
      const dotsColor = theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.18)";
      const itemsColor = theme === "dark" 
        ? "rgba(0, 243, 255, 0.3)" 
        : "rgba(0, 123, 255, 0.25)"; // Darker blue for light mode
      
      // Draw grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      
      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw dots at intersections
      ctx.fillStyle = dotsColor;
      for (let x = 0; x < canvas.width; x += cellSize) {
        for (let y = 0; y < canvas.height; y += cellSize) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Update and draw animated items
      ctx.fillStyle = itemsColor;
      items.forEach(item => {
        // Update position
        item.x += Math.cos(item.angle) * item.speed;
        item.y += Math.sin(item.angle) * item.speed;
        
        // Bounce off edges
        if (item.x < 0 || item.x > canvas.width) {
          item.angle = Math.PI - item.angle;
        }
        if (item.y < 0 || item.y > canvas.height) {
          item.angle = -item.angle;
        }
        
        // Draw item with pulsating effect
        const scale = 1 + Math.sin(time * 2) * 0.2;
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.size * scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw glowing effect with better light mode visibility
        const gradient = ctx.createRadialGradient(
          item.x, item.y, 0,
          item.x, item.y, item.size * scale * 3
        );
        
        // Different gradient colors based on theme
        if (theme === "dark") {
          gradient.addColorStop(0, "rgba(0, 243, 255, 0.3)");
          gradient.addColorStop(1, "rgba(0, 243, 255, 0)");
        } else {
          gradient.addColorStop(0, "rgba(0, 123, 255, 0.4)"); // Darker blue, higher opacity
          gradient.addColorStop(1, "rgba(0, 123, 255, 0)");
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.size * scale * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: theme === "dark" ? 0.7 : 0.8 }} // Increased opacity for light mode
    />
  );
};

export default GridBackground;
