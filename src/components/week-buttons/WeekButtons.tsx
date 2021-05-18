import React from 'react';

import { useAppState } from '../../state/AppStateContext';
import { Link, useRouteMatch } from 'react-router-dom';
import { weekdayNumToName } from '../../utils';
import { useDialog } from '../dialog/Dialog';
import { NoWeekButtonsDialog } from './NoWeekButtonsDialog';

export function WeekButtons() {
    const appState = useAppState();
    const dialogState = useDialog();
    const routeMatch = useRouteMatch<{ weeknum: string; weekday: string }>(
        '/:weeknum/:weekday',
    );

    if (appState.value.useAlternatingWeeks === false) {
        const openDialog = () => {
            dialogState.open(<NoWeekButtonsDialog />);
        };

        return (
            <button
                className="button is-rounded is-fullwidth is-ghost is-normal my-2"
                onClick={openDialog}
            >
                Where are the week tabs?
            </button>
        );
    }

    const backupWeekday =
        appState.value.weekday !== 0 && appState.value.weekday !== 6
            ? weekdayNumToName(appState.value.weekday)
            : 'monday';
    const weeknum = routeMatch?.params?.weeknum;
    const weekday = routeMatch?.params?.weekday || backupWeekday;

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
