import React from 'react';

import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { WeekdayTabs } from '../weekday-tabs/WeekdayTabs';
import { ScheduleCards } from '../schedule-cards/ScheduleCards';
import { useAppState } from '../../state/AppStateContext';
import { WeekButtons } from '../week-buttons/WeekButtons';
import { Banner } from '../banner/Banner';
import { weekdayNumToName } from '../../utils';

export function Schedule() {
    const appState = useAppState();
    const location = useLocation();

    let scheduleContent;

    const onScheduleCardsPageRegex = /^\/(?:(w1|w2)\/(monday|tuesday|wednesday|thursday|friday)\/?)$/;

    const isOnSchedulePage = onScheduleCardsPageRegex.test(location.pathname);

    if (isOnSchedulePage) {
        scheduleContent = <ScheduleCards />;
    } else {
        if (!appState.value.hasSchoolToday) {
            scheduleContent = (
                <Switch>
                    <Route path="/" exact>
                        <h1 className="title has-text-centered">
                            No classes today.
                        </h1>
                    </Route>
                    <Redirect to="/" />
                </Switch>
            );
        } else {
            const weekdayName = weekdayNumToName(appState.value.weekday);

            // Redirect away from /

            let weekNumName;

            switch (appState.value.weekNum) {
                case 0:
                    weekNumName = 'w1';
                    break;
                case 1:
                    weekNumName = 'w2';
                    break;
                case -1:
                    // This should never happen, but just in case show week 1
                    weekNumName = 'w1';
                    break;
            }

            scheduleContent = (
                <Redirect to={`/${weekNumName}/${weekdayName}`} />
            );
        }
    }

    return (
        <React.Fragment>
            <Banner />
            <div className="container px-3 mt-3">
                {appState.value.ready ? (
                    <React.Fragment>
                        <WeekButtons />
                        <WeekdayTabs />
                        {scheduleContent}
                    </React.Fragment>
                ) : (
                    <h1 className="title my-6">Loading...</h1>
                )}
            </div>
        </React.Fragment>
    );
}
