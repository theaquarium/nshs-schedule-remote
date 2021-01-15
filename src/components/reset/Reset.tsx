import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { useSettings } from '../../state/SettingsContext';

export function Reset() {
    const appState = useAppState();
    const settings = useSettings();
    const history = useHistory();

    appState.resetAppState();
    settings.resetSettings();

    React.useEffect(() => {
        window.localStorage.removeItem('appstate');
        window.localStorage.removeItem('settings');

        history.replace('/');
        history.go(0);
    });

    return <h1 className="title">Resetting...</h1>;
}
