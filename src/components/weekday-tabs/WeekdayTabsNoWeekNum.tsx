import React from 'react';
import { IoHomeOutline, IoPersonOutline } from 'react-icons/io5';
import { Link, useRouteMatch } from 'react-router-dom';

import { useAppState } from '../../state/AppStateContext';
import { useSettings } from '../../state/SettingsContext';

function ListItemLinkNoWeekNum({ to, currentWeekday, ...rest }: any) {
    return (
        <li className={to === currentWeekday ? 'is-active' : ''}>
            <Link to={`/${to}`} replace {...rest} />
        </li>
    );
}

export function WeekdayTabsNoWeekNum() {
    const appState = useAppState();
    const settings = useSettings();

    const routeMatch = useRouteMatch<{ weeknum: string; weekday: string }>(
        '/:weekday',
    );

    const weekday = routeMatch?.params?.weekday;

    // I'm good at variable names shh
    const weekInPersonSettings =
        (routeMatch?.params?.weeknum === 'w1' ||
            routeMatch?.params?.weeknum === 'w2') &&
        settings.value.inPerson &&
        settings.value.inPersonDays
            ? settings.value.inPersonDays[0] // Just get the first week bc it doesn't matter
            : undefined;

    return (
        <div className="tabs is-centered is-fullwidth is-boxed">
            <ul>
                <ListItemLinkNoWeekNum to="monday" currentWeekday={weekday}>
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
                </ListItemLinkNoWeekNum>
                <ListItemLinkNoWeekNum to="tuesday" currentWeekday={weekday}>
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
                </ListItemLinkNoWeekNum>
                <ListItemLinkNoWeekNum to="wednesday" currentWeekday={weekday}>
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
                </ListItemLinkNoWeekNum>
                <ListItemLinkNoWeekNum to="thursday" currentWeekday={weekday}>
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
                </ListItemLinkNoWeekNum>
                <ListItemLinkNoWeekNum to="friday" currentWeekday={weekday}>
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
                </ListItemLinkNoWeekNum>
            </ul>
        </div>
    );
}
