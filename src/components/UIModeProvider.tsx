
import { createContext, useContext, useState } from "react";

type UIMode = "gui" | "cli";

type UIModeProviderProps = {
  children: React.ReactNode;
  defaultMode?: UIMode;
  storageKey?: string;
};

type UIModeProviderState = {
  mode: UIMode;
  setMode: (mode: UIMode) => void;
};

const initialState: UIModeProviderState = {
  mode: "gui",
  setMode: () => null,
};

const UIModeProviderContext = createContext<UIModeProviderState>(initialState);

export function UIModeProvider({
  children,
  defaultMode = "gui",
  storageKey = "portfolio-ui-mode",
  ...props
}: UIModeProviderProps) {
  const [mode, setMode] = useState<UIMode>(
    () => (localStorage.getItem(storageKey) as UIMode) || defaultMode
  );

  const value = {
    mode,
    setMode: (mode: UIMode) => {
      localStorage.setItem(storageKey, mode);
      setMode(mode);
    },
  };

  return (
    <UIModeProviderContext.Provider {...props} value={value}>
      {children}
    </UIModeProviderContext.Provider>
  );
}

export const useUIMode = () => {
  const context = useContext(UIModeProviderContext);

  if (context === undefined)
    throw new Error("useUIMode must be used within a UIModeProvider");

  return context;
};
