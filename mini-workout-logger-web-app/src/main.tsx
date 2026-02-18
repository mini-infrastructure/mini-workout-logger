import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Global, ThemeProvider } from '@emotion/react';

import App from './App';
import theme from './app/themes/theme';
import globalStyles from './app/themes/global';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Global styles={globalStyles} />
            <App />
        </ThemeProvider>
    </StrictMode>,
)
