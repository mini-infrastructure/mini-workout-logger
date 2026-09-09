import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';

import App from './App';
import { globalStyles } from './app/themes/tokens';
import { AlertProvider } from './app/context/alert.context';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Global styles={globalStyles} />
        <AlertProvider>
            <App />
        </AlertProvider>
    </StrictMode>,
);
