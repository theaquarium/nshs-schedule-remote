import React from 'react';

import { useAppState } from '../../state/AppStateContext';
import { useSettings } from '../../state/SettingsContext';

export function Clock() {
    const appState = useAppState();
    const settings = useSettings();

    if (!settings.value.showClock) return null;

    if (!appState.value.lastUpdateTime) return null;

    const now = new Date(appState.value.lastUpdateTime);

    let hours = now.getHours();
    let hoursStr;

    if (!settings.value.use24HourClock) {
        hours = hours % 12;

        if (hours === 0) hours = 12;

        hoursStr = hours.toString();
    } else {
        hoursStr = hours.toString().padStart(2, '0');
    }

    return (
        <span className="mx-2 is-size-5">
            {hoursStr}:{now.getMinutes().toString().padStart(2, '0')}
            {!settings.value.use24HourClock
                ? now.getHours() < 13
                    ? ' AM'
                    : ' PM'
                : null}
        </span>
    );
}
