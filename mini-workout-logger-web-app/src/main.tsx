import {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Global, ThemeProvider} from '@emotion/react';

import App from './App';
import globalStyles from './app/themes/global';
import {darkTheme, lightTheme} from './app/themes/theme';
import {ThemeToggleContext} from './app/themes/theme-context';

function Root() {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => setIsDark(prev => !prev);
    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeToggleContext.Provider value={{ toggleTheme, isDark }}>
            <ThemeProvider theme={theme}>
                <Global styles={globalStyles(theme)} />
                <App />
            </ThemeProvider>
        </ThemeToggleContext.Provider>
    );
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Root />
    </StrictMode>,
);
