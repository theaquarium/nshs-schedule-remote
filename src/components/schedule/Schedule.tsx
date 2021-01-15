import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { WeekdayTabs } from '../weekday-tabs/WeekdayTabs';
import { Banner } from '../banner/Banner';
import { ScheduleCards } from '../schedule-cards/ScheduleCards';
import { useAppState } from '../../state/AppStateContext';

export function Schedule() {
    const appState = useAppState();

    return (
        <div>
            <Banner />
            <div className="container px-3 mt-3">
                {appState.value.ready ? (
                    <React.Fragment>
                        <WeekdayTabs />
                        <Switch>
                            <Route path="/weekend">
                                <h1 className="title has-text-centered">
                                    No classes today, happy weekend!
                                </h1>
                            </Route>
                            <Route>
                                <ScheduleCards />
                            </Route>
                        </Switch>
                    </React.Fragment>
                ) : (
                    <h1 className="title my-6">Loading...</h1>
                )}
            </div>
        </div>
    );
}
