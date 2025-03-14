
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink, Github, Sparkles } from "lucide-react";
import { useUIMode } from "@/components/UIModeProvider";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [mounted, setMounted] = useState(false);
  const { mode } = useUIMode();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || mode === "cli") {
    return null;
  }

  const projects = [
    {
      title: "Food ordering app",
      description: "A modern food ordering app with a beautiful UI and seamless user experience.",
      tags: ["React", "Tailwind CSS", "JavaScript"],
      image: "/projects-image/bhojan.png",
      liveLink: "https://mausam-khatiwada.github.io/bhojan/",
      githubLink: "https://github.com/Mausam-Khatiwada/bhojan",
    },
    {
      title: "Chattitude",
      description: "Chattitude is an intelligent and responsive chatbot built using the Google Gemini API.",
      tags: ["Html", "CSS", "JavaScript"],
      image: "/projects-image/chattitude.png",
      liveLink: "https://mausam-khatiwada.github.io/Chattitude/",
      githubLink: "https://github.com/Mausam-Khatiwada/Chattitude",
    },
    {
      title: "Coming soon",
      description: "Coming soon is a coming soon for coming soon because of coming soon",
      tags: ["coming soon", "coming soon ", "coming soon"],
      image: "https://cdn.pixabay.com/photo/2020/05/10/06/26/coming-soon-5152487_1280.png",
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Coming soon",
      description: "Coming soon is a coming soon for coming soon because of coming soon",
      tags: ["coming soon", "coming soon ", "coming soon"],
      image: "https://cdn.pixabay.com/photo/2020/05/10/06/26/coming-soon-5152487_1280.png",
      liveLink: "#",
      githubLink: "#",
    },
  ];

  return (
    <section className="flex flex-col w-full max-w-4xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm mb-6 border border-primary/20">
          <Briefcase className="w-4 h-4 mr-2 text-neon-blue" />
          <span className="text-sm font-medium">Projects</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Selected Work
        </h1>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          Here's a selection of my recent projects. Each one represents a unique
          challenge and opportunity to create something meaningful and impactful.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel rounded-xl overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="icon" variant="outline" className="w-8 h-8 rounded-full bg-background/30 backdrop-blur-sm" asChild>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button size="icon" variant="outline" className="w-8 h-8 rounded-full bg-background/30 backdrop-blur-sm" asChild>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
