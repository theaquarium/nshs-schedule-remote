import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import { AppStateUpdater } from './state/AppStateUpdater';
import { useAppState } from './state/AppStateContext';

import { Header } from './components/header/Header';
import { Schedule } from './components/schedule/Schedule';
import { Settings } from './components/settings/Settings';
import { Dialog } from './components/dialog/Dialog';
import { Footer } from './components/footer/Footer';
import { Welcome } from './components/welcome/Welcome';
import { Reset } from './components/reset/Reset';

export default function App() {
    const appState = useAppState();
    let weekdayName;

    // Redirect away from /
    switch (appState.value.weekday) {
        case 0:
            weekdayName = 'weekend';
            break;
        case 1:
            weekdayName = 'monday';
            break;
        case 2:
            weekdayName = 'tuesday';
            break;
        case 3:
            weekdayName = 'wednesday';
            break;
        case 4:
            weekdayName = 'thursday';
            break;
        case 5:
            weekdayName = 'friday';
            break;
        case 6:
            weekdayName = 'weekend';
            break;
    }

    return (
        <Router>
            <AppStateUpdater>
                <div className="App">
                    <Switch>
                        <Route path="/reset">
                            <Reset />
                        </Route>
                        <Route path="/welcome">
                            {appState.value.isOnboarded ? (
                                <Redirect to="/" />
                            ) : null}
                            <Welcome />
                        </Route>
                        {appState.value.isOnboarded ? (
                            <Route>
                                <Dialog>
                                    <Header />

                                    <Switch>
                                        <Route path="/settings">
                                            <Settings />
                                        </Route>
                                        <Route
                                            path={[
                                                '/monday',
                                                '/tuesday',
                                                '/wednesday',
                                                '/thursday',
                                                '/friday',
                                                '/weekend',
                                            ]}
                                        >
                                            <Schedule />
                                        </Route>
                                        {weekdayName ? (
                                            <Redirect to={`/${weekdayName}`} />
                                        ) : (
                                            <h1 className="title has-text-centered">
                                                Loading...
                                            </h1>
                                        )}
                                    </Switch>

                                    <Footer />
                                </Dialog>
                            </Route>
                        ) : (
                            <Redirect to="/welcome" />
                        )}
                    </Switch>
                </div>
            </AppStateUpdater>
        </Router>
    );
}
