
import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  decay: number;
}

export const NeonParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const { theme } = useTheme();

  // Enhanced colors for better visibility in light mode
  const colors = theme === 'dark' 
    ? [
        "rgba(0, 243, 255, alpha)", // neon blue
        "rgba(255, 0, 229, alpha)", // neon pink
        "rgba(142, 45, 226, alpha)", // neon purple
        "rgba(0, 243, 90, alpha)", // neon green
      ]
    : [
        "rgba(0, 123, 255, alpha)", // darker blue for light mode
        "rgba(220, 0, 169, alpha)", // darker pink for light mode
        "rgba(102, 25, 186, alpha)", // darker purple for light mode
        "rgba(0, 183, 70, alpha)", // darker green for light mode
      ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      // Create fewer particles on mouse move for a subtler effect
      createParticles(3);
    };

    const createParticles = (count: number) => {
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 4 + 1; // Slightly smaller particles
        const color = colors[Math.floor(Math.random() * colors.length)];
        // Reduce speed factor for less intense animation
        const speedFactor = Math.random() * 1.5 + 0.5;
        
        particlesRef.current.push({
          x: mousePositionRef.current.x,
          y: mousePositionRef.current.y,
          size,
          speedX: (Math.random() - 0.5) * speedFactor,
          speedY: (Math.random() - 0.5) * speedFactor,
          color: color.replace("alpha", (Math.random() * 0.6 + 0.4).toString()), // Higher base opacity
          alpha: 1,
          decay: Math.random() * 0.015 + 0.005, // Slightly faster decay
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.alpha -= particle.decay;
        
        if (particle.alpha <= 0) {
          particlesRef.current.splice(index, 1);
          return;
        }
        
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Less frequent passive particles
      if (Math.random() < 0.05) {
        createParticles(1);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [colors]);

  // Adjusted opacity values for better light mode visibility
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: theme === "dark" ? 0.8 : 0.7 }}
    />
  );
};

export default NeonParticles;
