import React from 'react';

import { differenceInMinutes } from 'date-fns';

import { useAppState } from '../../state/AppStateContext';
import { useSettings } from '../../state/SettingsContext';
import { Quotes } from './quotes';

// Should rerender every time app state changes so should update at least every 30 seconds
export function InspirationalQuotes() {
    const settings = useSettings();
    const appState = useAppState();

    const now = new Date();
    const lastQuoteUpdate = new Date(appState.value.lastQuoteUpdate || 0);

    let quoteIndex = appState.value.quoteIndex;

    let stateUpdates: any;

    if (
        differenceInMinutes(now, lastQuoteUpdate) > 120 ||
        quoteIndex === undefined
    ) {
        // Get random quote, make sure it's not the same
        let newQuoteIndex = Math.floor(Math.random() * Quotes.length);

        while (newQuoteIndex === quoteIndex) {
            newQuoteIndex = Math.floor(Math.random() * Quotes.length);
        }

        quoteIndex = newQuoteIndex;

        stateUpdates = {
            quoteIndex: quoteIndex,
            lastQuoteUpdate: now.getTime(),
        };
    }

    React.useEffect(() => {
        if (stateUpdates !== undefined) {
            appState.setAppStateDirect(stateUpdates);
        }
    });

    const quote = Quotes[quoteIndex];

    let quoteText: string;

    if (settings.value.userNickname && settings.value.userNickname.length > 0) {
        quoteText = quote.named.replace('{name}', settings.value.userNickname);
    } else {
        quoteText = quote.nameless;
    }

    return settings.value.showQuotes ? (
        <span className="has-text-grey-light mx-4 is-size-5">{quoteText}</span>
    ) : null;
}
