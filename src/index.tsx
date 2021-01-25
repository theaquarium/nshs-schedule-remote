import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { AppStateProvider } from './state/AppStateContext';
import { SettingsProvider } from './state/SettingsContext';

import * as serviceWorker from './serviceWorker';
import { ThemeLoader } from './theme/ThemeLoader';

ReactDOM.render(
    <React.StrictMode>
        <AppStateProvider>
            <SettingsProvider>
                <ThemeLoader>
                    <App />
                </ThemeLoader>
            </SettingsProvider>
        </AppStateProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

serviceWorker.unregister();
