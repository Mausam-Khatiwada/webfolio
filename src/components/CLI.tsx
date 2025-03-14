
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Command {
  name: string;
  description: string;
  action: () => void;
}

export function CLI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    "Welcome to Portfolio CLI v1.0.0",
    "Type 'help' to see available commands",
    "",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const commands: Command[] = [
    {
      name: "help",
      description: "Show available commands",
      action: () => {
        setOutput((prev) => [
          ...prev,
          ...commands.map((cmd) => `${cmd.name.padEnd(10)} - ${cmd.description}`),
          "",
        ]);
      },
    },
    {
      name: "home",
      description: "Go to home page",
      action: () => {
        navigate("/");
        setOutput((prev) => [...prev, "Navigating to home page...", ""]);
      },
    },
    {
      name: "about",
      description: "Go to about page",
      action: () => {
        navigate("/about");
        setOutput((prev) => [...prev, "Navigating to about page...", ""]);
      },
    },
    {
      name: "projects",
      description: "Go to projects page",
      action: () => {
        navigate("/projects");
        setOutput((prev) => [...prev, "Navigating to projects page...", ""]);
      },
    },
    {
      name: "contact",
      description: "Go to contact page",
      action: () => {
        navigate("/contact");
        setOutput((prev) => [...prev, "Navigating to contact page...", ""]);
      },
    },
    {
      name: "clear",
      description: "Clear the terminal",
      action: () => {
        setOutput([]);
      },
    },
  ];

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus();
    
    // Scroll to the bottom of the output when it changes
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add the command to the output
    setOutput((prev) => [...prev, `> ${input}`]);
    
    // Find the command
    const command = commands.find((cmd) => cmd.name === input.trim().toLowerCase());
    
    if (command) {
      command.action();
    } else {
      setOutput((prev) => [
        ...prev,
        `Command not found: ${input}`,
        "Type 'help' to see available commands",
        "",
      ]);
    }
    
    // Clear the input
    setInput("");
  };

  return (
    <div className="w-full h-full max-w-4xl mx-auto p-6 rounded-lg glass-panel overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-mono opacity-70">portfolio@user:~</span>
      </div>
      
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto font-mono text-sm whitespace-pre-wrap mb-4"
      >
        {output.map((line, index) => (
          <div key={index} className="mb-1">
            {line}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center border-t border-white/10 pt-2">
        <span className="text-neon-green mr-2 font-mono">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 bg-transparent border-none outline-none font-mono text-sm"
          autoFocus
        />
      </form>
    </div>
  );
}
