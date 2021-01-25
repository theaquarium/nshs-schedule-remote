import React from 'react';
import { IoHomeOutline, IoPersonOutline } from 'react-icons/io5';
import { Link, Route, useRouteMatch } from 'react-router-dom';

import { useAppState } from '../../state/AppStateContext';
import { useSettings } from '../../state/SettingsContext';

function ListItemLink({ to, currentWeekday, currentWeeknum, ...rest }: any) {
    return (
        <li className={to === currentWeekday ? 'is-active' : ''}>
            <Link to={`/${currentWeeknum}/${to}`} replace {...rest} />
        </li>
    );
}

export function WeekdayTabs() {
    const appState = useAppState();
    const settings = useSettings();

    const routeMatch = useRouteMatch<{ weeknum: string; weekday: string }>(
        '/:weeknum/:weekday',
    );

    const backupWeeknum =
        appState.value.weekNum !== -1
            ? appState.value.weekNum === 0
                ? 'w1'
                : 'w2'
            : 'w1';
    const weeknum = routeMatch?.params?.weeknum || backupWeeknum;
    const weekday = routeMatch?.params?.weekday;

    // I'm good at variable names shh
    const weekNumber = weeknum === 'w1' ? 0 : 1;
    const weekInPersonSettings =
        (routeMatch?.params?.weeknum === 'w1' ||
            routeMatch?.params?.weeknum === 'w2') &&
        settings.value.inPerson &&
        settings.value.inPersonDays
            ? settings.value.inPersonDays[weekNumber]
            : undefined;

    return (
        <div className="tabs is-centered is-fullwidth is-boxed">
            <ul>
                <ListItemLink
                    to="monday"
                    currentWeeknum={weeknum}
                    currentWeekday={weekday}
                >
                    {settings.value.inPerson && weekInPersonSettings ? (
                        weekInPersonSettings.monday ? (
                            <span className="icon is-size-4">
                                <IoPersonOutline />
                            </span>
                        ) : (
                            <span className="icon is-size-4">
                                <IoHomeOutline />
                            </span>
                        )
                    ) : null}
                    Monday
                    {appState.value.weekday === 1 ? ' (Today)' : ''}
                </ListItemLink>
                <ListItemLink
                    to="tuesday"
                    currentWeeknum={weeknum}
                    currentWeekday={weekday}
                >
                    {settings.value.inPerson && weekInPersonSettings ? (
                        weekInPersonSettings.tuesday ? (
                            <span className="icon is-size-4">
                                <IoPersonOutline />
                            </span>
                        ) : (
                            <span className="icon is-size-4">
                                <IoHomeOutline />
                            </span>
                        )
                    ) : null}
                    Tuesday
                    {appState.value.weekday === 2 ? ' (Today)' : ''}
                </ListItemLink>
                <ListItemLink
                    to="wednesday"
                    currentWeeknum={weeknum}
                    currentWeekday={weekday}
                >
                    {settings.value.inPerson && weekInPersonSettings ? (
                        weekInPersonSettings.wednesday ? (
                            <span className="icon is-size-4">
                                <IoPersonOutline />
                            </span>
                        ) : (
                            <span className="icon is-size-4">
                                <IoHomeOutline />
                            </span>
                        )
                    ) : null}
                    Wednesday
                    {appState.value.weekday === 3 ? ' (Today)' : ''}
                </ListItemLink>
                <ListItemLink
                    to="thursday"
                    currentWeeknum={weeknum}
                    currentWeekday={weekday}
                >
                    {settings.value.inPerson && weekInPersonSettings ? (
                        weekInPersonSettings.thursday ? (
                            <span className="icon is-size-4">
                                <IoPersonOutline />
                            </span>
                        ) : (
                            <span className="icon is-size-4">
                                <IoHomeOutline />
                            </span>
                        )
                    ) : null}
                    Thursday
                    {appState.value.weekday === 4 ? ' (Today)' : ''}
                </ListItemLink>
                <ListItemLink
                    to="friday"
                    currentWeeknum={weeknum}
                    currentWeekday={weekday}
                >
                    {settings.value.inPerson && weekInPersonSettings ? (
                        weekInPersonSettings.friday ? (
                            <span className="icon is-size-4">
                                <IoPersonOutline />
                            </span>
                        ) : (
                            <span className="icon is-size-4">
                                <IoHomeOutline />
                            </span>
                        )
                    ) : null}
                    Friday
                    {appState.value.weekday === 5 ? ' (Today)' : ''}
                </ListItemLink>
            </ul>
        </div>
    );
}
