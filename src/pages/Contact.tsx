import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Twitter, X } from "lucide-react";
import { useUIMode } from "@/components/UIModeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [mounted, setMounted] = useState(false);
  const { mode } = useUIMode();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || mode === "cli") {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="flex flex-col w-full max-w-4xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm mb-6 border border-primary/20">
          <Mail className="w-4 h-4 mr-2 text-neon-pink" />
          <span className="text-sm font-medium">Contact</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Let's work together
        </h1>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          Have a project in mind or just want to say hello? I'd love to hear from you.
          Fill out the form below or reach out through social media.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-background/40 backdrop-blur-sm border-primary/20"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-background/40 backdrop-blur-sm border-primary/20"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea"
                  required
                  className="min-h-[150px] bg-background/40 backdrop-blur-sm border-primary/20"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full rounded-full py-6 group"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-6">Connect</h2>
              
              <p className="text-muted-foreground mb-8">
                Prefer to connect on social media? Find me on these platforms or
                send me an email directly.
              </p>
              
              <div className="space-y-6 mt-auto">
                <a 
                  href="mailto:hello@example.com" 
                  className="flex items-center text-lg hover:text-neon-blue transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  <span>mausamkhatiwada98@gmail.com</span>
                </a>
                
                <div className="flex space-x-4">
                  <Button asChild size="icon" variant="outline" className="rounded-full w-10 h-10 neon-border">
                    <a href="https://github.com/Mausam-Khatiwada" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button asChild size="icon" variant="outline" className="rounded-full w-10 h-10 neon-border">
                    <a href="https://www.linkedin.com/in/mausam-khatiwada/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button asChild size="icon" variant="outline" className="rounded-full w-10 h-10 neon-border">
                    <a href="https://x.com/mausamkhatiwada" target="_blank" rel="noopener noreferrer" aria-label="x">
                      <X className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
