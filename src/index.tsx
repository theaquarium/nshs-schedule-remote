import React from 'react';
import ReactDOM from 'react-dom';

import './styles/bulma/bulmastyles.scss';

import App from './App';

import { AppStateProvider } from './state/AppStateContext';
import { SettingsProvider } from './state/SettingsContext';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <AppStateProvider>
            <SettingsProvider>
                <App />
            </SettingsProvider>
        </AppStateProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

serviceWorker.register();
