import React from 'react';

import { useAppState } from '../../state/AppStateContext';
import { Link, useRouteMatch } from 'react-router-dom';
import { weekdayNumToName } from '../../utils';

export function WeekButtons() {
    const appState = useAppState();
    const routeMatch = useRouteMatch<{ weeknum: string; weekday: string }>(
        '/:weeknum/:weekday',
    );

    const backupWeekday =
        appState.value.weekday !== 0 && appState.value.weekday !== 6
            ? weekdayNumToName(appState.value.weekday)
            : 'monday';
    const weeknum = routeMatch?.params?.weeknum;
    const weekday = routeMatch?.params?.weekday || 'monday';

    return (
        <div className="tabs is-centered is-fullwidth is-boxed">
            <ul>
                <li className={weeknum === 'w1' ? 'is-active' : ''}>
                    <Link to={`/w1/${weekday}`} replace>
                        <span>
                            View Week 1
                            {appState.value.weekNum === 0 ? (
                                <span>
                                    {appState.value.weekday === 0 ||
                                    appState.value.weekday === 6
                                        ? ' (Starting Monday)'
                                        : ' (Current)'}
                                </span>
                            ) : null}
                        </span>
                    </Link>
                </li>
                <li className={weeknum === 'w2' ? 'is-active' : ''}>
                    <Link to={`/w2/${weekday}`} replace>
                        <span>
                            View Week 2
                            {appState.value.weekNum === 1 ? (
                                <span>
                                    {appState.value.weekday === 0 ||
                                    appState.value.weekday === 6
                                        ? ' (Starting Monday)'
                                        : ' (Current)'}
                                </span>
                            ) : null}
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
