import React from 'react';
import { Link, Route } from 'react-router-dom';

import { useAppState } from '../../state/AppStateContext';

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

    return (
        <div className="tabs is-centered is-fullwidth">
            <ul>
                <ListItemLink to="/monday">
                    Monday{appState.value.weekday === 1 ? ' (Today)' : ''}
                </ListItemLink>
                <ListItemLink to="/tuesday">
                    Tuesday{appState.value.weekday === 2 ? ' (Today)' : ''}
                </ListItemLink>
                <ListItemLink to="/wednesday">
                    Wednesday{appState.value.weekday === 3 ? ' (Today)' : ''}
                </ListItemLink>
                <ListItemLink to="/thursday">
                    Thursday{appState.value.weekday === 4 ? ' (Today)' : ''}
                </ListItemLink>
                <ListItemLink to="/friday">
                    Friday{appState.value.weekday === 5 ? ' (Today)' : ''}
                </ListItemLink>
            </ul>
        </div>
    );
}
