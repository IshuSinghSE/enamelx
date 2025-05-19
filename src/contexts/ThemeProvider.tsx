'use client';
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultThemePreference?: "light" | "dark" | "system";
}

export function ThemeProvider({
  children,
  defaultThemePreference = "dark",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  
  useEffect(() => {
    // Get saved preference or use default
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    const preferredTheme = savedTheme || defaultThemePreference;
    
    if (preferredTheme === "system") {
      // Check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeValue(systemPrefersDark ? "dark" : "light");
    } else {
      setThemeValue(preferredTheme as Theme);
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme") === "system") {
        setThemeValue(e.matches ? "dark" : "light");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [defaultThemePreference]);
  
  // Helper function to set theme and apply dark class
  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    
    // Apply theme to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  // Public method to change theme
  const changeTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setThemeValue(newTheme);
  };
  
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
