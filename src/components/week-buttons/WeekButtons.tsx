import React from 'react';
import { isSameWeek } from 'date-fns';

import { useAppState } from '../../state/AppStateContext';

export function WeekButtons() {
    const appState = useAppState();

    return (
        <div className="mx-3 is-flex is-flex-wrap-wrap is-justify-content-center is-align-content-center is-align-items-center">
            {
                // If week was last set not this week, tell user it's a guess
            }
            {appState.value.lastUpdateTime &&
            appState.value.lastWeekSetTime &&
            isSameWeek(
                appState.value.lastUpdateTime,
                appState.value.lastWeekSetTime,
            ) ? (
                false
            ) : (
                <span className="has-text-grey-light mx-2 is-size-5">
                    I think it's
                </span>
            )}

            <div className="buttons has-addons my-0">
                <button
                    type="button"
                    className={
                        'button is-rounded is-normal my-0 ' +
                        (!appState.value.weekNum || appState.value.weekNum === 0
                            ? 'is-link'
                            : '')
                    }
                    onClick={() => {
                        const now = Date.now();
                        appState.setAppStateDirect({
                            lastWeekSetTime: now,
                            weekNum: 0,
                        });
                        // appState.setLastWeekSetTime(now);
                        // appState.setWeekNum(0);
                    }}
                >
                    Week 1
                </button>
                <button
                    type="button"
                    className={
                        'button is-rounded is-normal my-0 ' +
                        (appState.value.weekNum === 1 ? 'is-link' : '')
                    }
                    onClick={() => {
                        const now = Date.now();
                        appState.setAppStateDirect({
                            lastWeekSetTime: now,
                            weekNum: 1,
                        });
                        // appState.setLastWeekSetTime(now);
                        // appState.setWeekNum(1);
                    }}
                >
                    Week 2
                </button>
            </div>
        </div>
    );
}
