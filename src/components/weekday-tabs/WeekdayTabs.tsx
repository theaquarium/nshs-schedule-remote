import React from 'react';
import { IoHomeOutline, IoPersonOutline } from 'react-icons/io5';
import { Link, Route } from 'react-router-dom';

import { useAppState } from '../../state/AppStateContext';
import { useSettings } from '../../state/SettingsContext';

function ListItemLink({ to, ...rest }: any) {
    return (
        <Route
            path={to}
            children={({ match }) => (
                <li className={match ? 'is-active' : ''}>
                    <Link to={to} replace {...rest} />
                </li>
            )}
        />
    );
}

export function WeekdayTabs() {
    const appState = useAppState();
    const settings = useSettings();

    const weekNum = appState.value.weekNum;
    const weekInPersonSettings =
        weekNum !== undefined &&
        settings.value.inPerson &&
        settings.value.inPersonDays
            ? settings.value.inPersonDays[weekNum]
            : undefined;

    return (
        <div className="tabs is-centered is-fullwidth">
            <ul>
                <ListItemLink to="/monday">
                    {settings.value.inPerson ? (
                        weekInPersonSettings && weekInPersonSettings.monday ? (
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
                <ListItemLink to="/tuesday">
                    {settings.value.inPerson ? (
                        weekInPersonSettings && weekInPersonSettings.tuesday ? (
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
                <ListItemLink to="/wednesday">
                    {settings.value.inPerson ? (
                        weekInPersonSettings &&
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
                <ListItemLink to="/thursday">
                    {settings.value.inPerson ? (
                        weekInPersonSettings &&
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
                <ListItemLink to="/friday">
                    {settings.value.inPerson ? (
                        weekInPersonSettings && weekInPersonSettings.friday ? (
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
