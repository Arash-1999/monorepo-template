import { createContext } from "react";
import { type ThemeMode } from "../types";

type ThemeContextType = {
  mode: ThemeMode;
  toggleTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({ mode: "light", toggleTheme: () => {} });

export type { ThemeContextType };
export { ThemeContext };
