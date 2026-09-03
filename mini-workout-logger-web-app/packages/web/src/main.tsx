import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Global, ThemeProvider} from '@emotion/react';

import App from './App';
import globalStyles from './app/themes/global';
import {theme} from './app/themes/theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Global styles={globalStyles(theme)} />
            <App />
        </ThemeProvider>
    </StrictMode>,
);
