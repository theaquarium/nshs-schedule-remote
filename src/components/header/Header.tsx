import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { IoCalendar, IoCog, IoHelpBuoy } from 'react-icons/io5';
import { WeekButtons } from '../week-buttons/WeekButtons';
import { InspirationalQuotes } from '../inspirational-quotes/InspirationalQuotes';

export function Header() {
    return (
        <header className="level mb-0">
            <div
                className="p-4 level-left level my-0"
                style={{
                    flexShrink: 1,
                }}
            >
                <div className="level-left">
                    <Link
                        to="/"
                        className="button is-rounded is-medium has-text-weight-bold is-fullwidth"
                    >
                        <span className="icon mr-1">
                            <IoCalendar />
                        </span>
                        NSHS Schedule
                    </Link>
                </div>
                <div
                    className="level-right is-flex is-justify-content-center"
                    style={{
                        flexShrink: 1,
                    }}
                >
                    <InspirationalQuotes />
                </div>
            </div>
            <div
                className="p-4 level-right level my-0"
                style={{
                    flexShrink: 1,
                }}
            >
                <div
                    className="level-left my-3"
                    style={{
                        flexShrink: 1,
                    }}
                >
                    <WeekButtons />
                </div>
                <div className="level-item">
                    <Switch>
                        <Route path="/help">
                            <Link
                                to="/"
                                className="button is-link is-rounded is-medium is-fullwidth"
                            >
                                <span className="icon">
                                    <IoHelpBuoy className="is-size-4" />
                                </span>
                            </Link>
                        </Route>
                        <Route path="/">
                            <Link
                                to="/help"
                                className="button is-link is-outlined is-rounded is-medium is-fullwidth"
                            >
                                <span className="icon">
                                    <IoHelpBuoy className="is-size-4" />
                                </span>
                            </Link>
                        </Route>
                    </Switch>
                </div>
                <div className="level-right">
                    <Switch>
                        <Route path="/settings">
                            <Link
                                to="/"
                                className="button is-link is-rounded is-medium is-fullwidth"
                            >
                                <span className="icon mr-1">
                                    <IoCog />
                                </span>
                                Settings
                            </Link>
                        </Route>
                        <Route path="/">
                            <Link
                                to="/settings"
                                className="button is-link is-outlined is-rounded is-medium is-fullwidth"
                            >
                                <span className="icon mr-1">
                                    <IoCog />
                                </span>
                                Settings
                            </Link>
                        </Route>
                    </Switch>
                </div>
            </div>
        </header>
    );
}
