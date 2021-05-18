import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { useAppState } from '../../state/AppStateContext';

function ListItemLinkNoWeekNum({ to, currentWeekday, ...rest }: any) {
    return (
        <li className={to === currentWeekday ? 'is-active' : ''}>
            <Link to={`/${to}`} replace {...rest} />
        </li>
    );
}

export function WeekdayTabsNoWeekNum() {
    const appState = useAppState();

    const routeMatch = useRouteMatch<{ weeknum: string; weekday: string }>(
        '/:weekday',
    );

    const weekday = routeMatch?.params?.weekday;

    return (
        <div className="tabs is-centered is-fullwidth is-boxed">
            <ul>
                <ListItemLinkNoWeekNum to="monday" currentWeekday={weekday}>
                    Monday
                    {appState.value.weekday === 1 ? ' (Today)' : ''}
                </ListItemLinkNoWeekNum>
                <ListItemLinkNoWeekNum to="tuesday" currentWeekday={weekday}>
                    Tuesday
                    {appState.value.weekday === 2 ? ' (Today)' : ''}
                </ListItemLinkNoWeekNum>
                <ListItemLinkNoWeekNum to="wednesday" currentWeekday={weekday}>
                    Wednesday
                    {appState.value.weekday === 3 ? ' (Today)' : ''}
                </ListItemLinkNoWeekNum>
                <ListItemLinkNoWeekNum to="thursday" currentWeekday={weekday}>
                    Thursday
                    {appState.value.weekday === 4 ? ' (Today)' : ''}
                </ListItemLinkNoWeekNum>
                <ListItemLinkNoWeekNum to="friday" currentWeekday={weekday}>
                    Friday
                    {appState.value.weekday === 5 ? ' (Today)' : ''}
                </ListItemLinkNoWeekNum>
            </ul>
        </div>
    );
}
