import { createContext, ReactNode, useState } from "react";


type Prop = {
  children: ReactNode;
};


type ThemeContextType = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};


export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);


const ThemeProvider = ({ children }: Prop) => {
  const [isDark, setIsDark] = useState(false);


  const themeInfo: ThemeContextType = {
    isDark,
    setIsDark,
  };

  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

