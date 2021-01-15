import React from 'react';
import { IoCog } from 'react-icons/io5';
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
            <div className="content mx-3">
                <h1>Welcome!</h1>
                <br />
                <p className="is-size-5">
                    The new South schedule can be pretty confusing to keep track
                    of, but I'm here to fix that. <br />
                    I'll be the one schedule to rule them all.
                </p>

                <p className="is-size-5">
                    I'll keep track of current classes, but I can also manage
                    your Zoom meeting links for you.
                </p>

                <p className="is-size-5 is-italic">
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

                <p className="is-size-5">
                    I value your privacy. All data is saved{' '}
                    <span className="is-italic">on your device only.</span> I
                    will collect some basic usage data such as user count and
                    page statistics so that I can figure out how to improve your
                    experience, but{' '}
                    <span className="is-italic">
                        none of your personal information will be sent anywhere.
                    </span>
                </p>

                <p className="is-size-5">
                    Feel free to explore the page to see what I can do, and try
                    it out to see if it works for you.
                </p>

                <br />

                <p className="is-size-5">
                    If you have any issues, questions, or requests, please feel
                    free to send me an email at{' '}
                    <a href="mailto:peter@vashevko.com">peter@vashevko.com</a>{' '}
                    or message me on Discord at{' '}
                    <span className="is-family-monospace">aquarium#9352</span>{' '}
                    to let me know what you think.
                </p>

                <p className="is-size-5">Hope you enjoy!</p>

                <button
                    type="button"
                    className="button is-link is-rounded is-medium"
                    onClick={finishOnboarding}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}
