import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark';

const ThemeContext = createContext({
    theme: 'light' as ThemeType,
    toggleTheme: () => { },
    isDark: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>('light');

    useEffect(() => {
        AsyncStorage.getItem('user-theme').then((saved) => {
            if (saved) setTheme(saved as ThemeType);
        });
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const next = prev === 'light' ? 'dark' : 'light';
            AsyncStorage.setItem('user-theme', next);
            console.log("Theme switched to:", next);
            return next;
        });
    };

    const isDark = theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);