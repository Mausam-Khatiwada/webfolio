
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Code, Star, Sparkles } from "lucide-react";
import { useUIMode } from "@/components/UIModeProvider";

const About = () => {
  const [mounted, setMounted] = useState(false);
  const { mode } = useUIMode();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || mode === "cli") {
    return null;
  }

  const skills = [
    "Reactjs & Next.js",
    "Tailwind CSS",
    "Node.js & Express",
    "MongoDB & SQL",
    "Python & Django",
    "NUMPy & Pandas",

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
          <User className="w-4 h-4 mr-2 text-neon-pink" />
          <span className="text-sm font-medium">About Me</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Creating digital experiences with passion and precision
        </h1>
        
        <div className="glass-panel p-6 md:p-8 rounded-2xl">
          <p className="text-lg mb-6">
          I'm Mausam Khatiwada, a dedicated digital designer and developer passionate about building intuitive and engaging user experiences. With expertise in both design and development, I seamlessly blend aesthetics with functionality to create polished and user-friendly products.
          </p>
          
          <p className="text-lg mb-6">
          My approach revolves around creative problem-solving and technical excellence, ensuring that every project is both visually appealing and highly functional. I believe the best designs are the ones that feel effortless to users.
          </p>
          
          <p className="text-lg">
          Beyond my work, I enjoy exploring the latest technologies, design trends, and methodologies to push my creative boundaries and stay ahead in the ever-evolving digital landscape.
          </p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm mb-6 border border-primary/20">
          <Code className="w-4 h-4 mr-2 text-neon-blue" />
          <span className="text-sm font-medium">Knowledge</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
          Skills & Technologies
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="glass-panel p-4 rounded-xl text-center"
            >
              <Sparkles className="w-5 h-5 mb-2 mx-auto text-neon-blue" />
              <span className="text-sm font-medium">{skill}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm mb-6 border border-primary/20">
          <Star className="w-4 h-4 mr-2 text-neon-green" />
          <span className="text-sm font-medium">Learning</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
        Skills in Progress
        </h2>
        
        <div className="glass-panel p-6 md:p-8 rounded-2xl">
          <ul className="space-y-6">
            <li className="flex">
              <div className="mr-4 mt-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center neon-border-pink bg-background/30">
                  <span className="font-medium">01</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Machine Learning</h3>
                <p className="text-muted-foreground">
                Learning to develop algorithms that enable systems to learn from data, recognize patterns, and make informed decisions, enhancing the efficiency and intelligence of AI models.
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 mt-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center neon-border bg-background/30">
                  <span className="font-medium">02</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">TensorFlow</h3>
                <p className="text-muted-foreground">
                Focusing on TensorFlow to design and implement advanced machine learning models, particularly for applications such as image recognition, speech processing, and natural language understanding.
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 mt-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center neon-border-pink bg-background/30">
                  <span className="font-medium">03</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">PyTorch</h3>
                <p className="text-muted-foreground">
                I am exploring PyTorch to build and optimize deep learning models, leveraging its flexibility for both research and practical AI applications in various fields.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
