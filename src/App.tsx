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
import { PrivacyPolicy } from './components/privacy-policy/PrivacyPolicy';
import { Help } from './components/help/Help';
import { Wizard } from './components/wizard/Wizard';
import { Party } from './components/party/Party';

export default function App() {
    const appState = useAppState();
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
                        <Route path="/party">
                            {!appState.value.isOnboarded ? (
                                <Redirect to="/welcome" />
                            ) : null}
                            <Party />
                        </Route>
                        <Route path="/wizard">
                            {!appState.value.isOnboarded ? (
                                <Redirect to="/welcome" />
                            ) : null}
                            <Wizard />
                        </Route>
                        {appState.value.isOnboarded ? (
                            <Route path="/">
                                <Dialog>
                                    <Header />

                                    <Switch>
                                        <Route path="/help">
                                            <Help />
                                        </Route>
                                        <Route path="/privacypolicy">
                                            <PrivacyPolicy />
                                        </Route>
                                        <Route path="/settings">
                                            <Settings />
                                        </Route>
                                        <Route>
                                            <Schedule />
                                        </Route>
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
