// src/context/ThemeContext.js
import React, { createContext, useState, useContext } from "react";
import { Colors } from "../constants/Colors";

interface Theme {
  colors: {
    primary: string;
    primaryText: string;
    primaryLight: string;
    secondary: string;
    tertiary: string;
    text: string;
    disabledText: string;
    selectedText: string;
    background: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
    buttonBackground: string;
    buttonBackgroundDisabled: string;
    inputBackground: string;
    inputPlaceholderText: string;
    borderColor: string;
    attention: string;
    success: string;
    error: string;
    surface: string;
    Konzert: string;
    Cocktailparty: string;
    "After-Work-Party": string;
    Silvesterparty: string;
    Halloweenparty: string;
    warning: string;
    Geburtstagsparty: string;
    Weihnachtsfeier: string;
  };
  // Add other theme properties like spacing, fonts if needed
}

const defaultTheme: Theme = {
  colors: {
    primary: Colors.light.primary,
    primaryText: Colors.light.primaryText,
    primaryLight: Colors.light.primaryLight,
    secondary: Colors.light.secondary,
    tertiary: Colors.light.tertiary,
    text: Colors.light.text,
    disabledText: Colors.light.disabledText,
    selectedText: Colors.light.selectedText,
    background: Colors.light.background,
    tint: Colors.light.tint,
    icon: Colors.light.icon,
    tabIconDefault: Colors.light.tabIconDefault,
    tabIconSelected: Colors.light.tabIconSelected,
    buttonBackground: Colors.light.buttonBackground,
    buttonBackgroundDisabled: Colors.light.buttonBackgroundDisabled,
    inputBackground: Colors.light.inputBackground,
    inputPlaceholderText: Colors.light.inputPlaceholderText,
    borderColor: Colors.light.borderColor,
    attention: Colors.light.attention,
    success: Colors.light.success,
    error: Colors.light.error,
    surface: Colors.light.surface,
    Konzert: Colors.light.Konzert,
    Cocktailparty: Colors.light.Cocktailparty,
    "After-Work-Party": Colors.light["After-Work-Party"],
    Silvesterparty: Colors.light.Silvesterparty,
    Halloweenparty: Colors.light.Halloweenparty,
    warning: Colors.light.warning,
    Geburtstagsparty: Colors.light.Geburtstagsparty,
    Weihnachtsfeier: Colors.light.Weihnachtsfeier,
  },
};

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode
    ? {
        colors: {
          primary: Colors.dark.primary,
          primaryText: Colors.dark.primaryText,
          primaryLight: Colors.dark.primaryLight,
          secondary: Colors.dark.secondary,
          tertiary: Colors.dark.tertiary,
          text: Colors.dark.text,
          disabledText: Colors.dark.disabledText,
          selectedText: Colors.dark.selectedText,
          background: Colors.dark.background,
          tint: Colors.dark.tint,
          icon: Colors.dark.icon,
          tabIconDefault: Colors.dark.tabIconDefault,
          tabIconSelected: Colors.dark.tabIconSelected,
          buttonBackground: Colors.dark.buttonBackground,
          buttonBackgroundDisabled: Colors.dark.buttonBackgroundDisabled,
          inputBackground: Colors.dark.inputBackground,
          inputPlaceholderText: Colors.dark.inputPlaceholderText,
          borderColor: Colors.dark.borderColor,
          attention: Colors.dark.attention,
          success: Colors.dark.success,
          error: Colors.dark.error,
          surface: Colors.dark.surface,
          Konzert: Colors.dark.Konzert,
          Cocktailparty: Colors.dark.Cocktailparty,
          "After-Work-Party": Colors.dark["After-Work-Party"],
          Silvesterparty: Colors.dark.Silvesterparty,
          Halloweenparty: Colors.dark.Halloweenparty,
          warning: Colors.dark.warning,
          Geburtstagsparty: Colors.dark.Geburtstagsparty,
          Weihnachtsfeier: Colors.dark.Weihnachtsfeier,
        },
      }
    : defaultTheme;

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  return useContext(ThemeContext);
};
