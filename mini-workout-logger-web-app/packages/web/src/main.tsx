import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';

import App from './App';
import { globalStyles } from './app/themes/tokens';
import { AlertProvider } from './app/context/alert.context';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Global styles={globalStyles} />
            <AlertProvider>
                <App />
            </AlertProvider>
        </BrowserRouter>
    </StrictMode>,
);
