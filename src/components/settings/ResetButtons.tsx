import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';

import { useSettings } from '../../state/SettingsContext';

export function ResetButtons() {
    const appState = useAppState();
    const settings = useSettings();

    const history = useHistory();

    const resetSettings = () => {
        const result = window.confirm(
            'Are you sure you would like to reset your settings?',
        );
        if (result) {
            settings.resetSettings();
            history.replace('/');
        }
    };

    const resetAppState = () => {
        const result = window.confirm(
            'Are you sure you would like to reset the app state?',
        );
        if (result) {
            appState.resetAppState();
            history.replace('/');
            history.go(0);
        }
    };

    return (
        <div>
            <div className="level">
                <div className="level-left">Reset settings to defaults:</div>
                <div className="level-right">
                    <button
                        type="button"
                        className="button is-link is-medium is-fullwidth is-rounded"
                        onClick={resetSettings}
                    >
                        Reset Settings
                    </button>
                </div>
            </div>

            <div className="level">
                <div className="level-left">
                    Having issues with the schedule? Try this:
                </div>
                <div className="level-right">
                    <button
                        type="button"
                        className="button is-link is-normal is-fullwidth is-rounded"
                        onClick={resetAppState}
                    >
                        Reset App State
                    </button>
                </div>
            </div>
        </div>
    );
}
