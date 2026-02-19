import {createContext, useContext} from 'react';

type ThemeContextType = {
    toggleTheme: () => void;
    isDark: boolean;
};

export const ThemeToggleContext = createContext<ThemeContextType>({
    toggleTheme: () => {},
    isDark: false,
});

export const useThemeToggle = () => useContext(ThemeToggleContext);
