import React from 'react';
import { IoCog, IoColorWand } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';

export function Welcome() {
    const appState = useAppState();

    const finishOnboarding = () => {
        appState.setAppStateDirect({
            isOnboarded: true,
        });
    };

    return (
        <div className="container my-6">
            <div className="content mx-3 is-size-5">
                <h1>Welcome!</h1>
                <br />
                <p>
                    The new South schedule can be pretty confusing to keep track
                    of, but I'm here to fix that. <br />
                    I'll be the one schedule to rule them all.
                </p>

                <p>
                    I'll keep track of current classes, but I can also manage
                    your Zoom meeting links for you.
                </p>

                <p className="is-italic">
                    By default, I'll just work like a normal schedule, but you
                    can open the{' '}
                    <span className="has-text-weight-bold">
                        <span className="icon mr-1">
                            <IoCog />
                        </span>
                        Settings
                    </span>{' '}
                    tab to set up your meetings.
                </p>

                <p>
                    I value your privacy. All data is saved{' '}
                    <span className="is-italic">on your device only.</span> I
                    will collect some basic usage data such as user count and
                    page statistics so that I can figure out how to improve your
                    experience, but{' '}
                    <span className="is-italic">
                        none of your personal information will be sent anywhere.
                    </span>
                </p>

                <p>
                    Feel free to explore the page to see what I can do, and try
                    it out to see if it works for you.
                </p>

                <br />

                <p>
                    Once you get started, you can view a detailed help page for
                    this site at any time with the{' '}
                    <span
                        className="has-text-weight-bold"
                        style={{
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Need Help?
                    </span>{' '}
                    button at the bottom of the page.
                </p>

                <p>
                    If you have any issues, questions, or requests, please feel
                    free to send me an email at{' '}
                    <a href="mailto:leah@vashevko.com">leah@vashevko.com</a>{' '}
                    or{' '}
                    <a href="https://discord.gg/KXxZt2BPUF">
                        join the Discord server
                    </a>{' '}
                    to let me know what you think.
                </p>

                <p>Hope you enjoy!</p>

                <button
                    type="button"
                    className="button is-link is-rounded is-medium mr-3 mb-3"
                    onClick={finishOnboarding}
                >
                    Get Started
                </button>

                <Link
                    to="/wizard"
                    onClick={finishOnboarding}
                    className="button is-link is-rounded is-medium mb-3"
                >
                    <span className="icon mr-1">
                        <IoColorWand className="is-size-4" />
                    </span>
                    Set up your schedule
                </Link>
            </div>
        </div>
    );
}
