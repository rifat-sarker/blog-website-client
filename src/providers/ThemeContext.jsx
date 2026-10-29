import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Pure warm paper white editorial theme
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("mixhub_theme");
  }, []);

  const toggleTheme = () => {
    // Kept for interface compatibility
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
