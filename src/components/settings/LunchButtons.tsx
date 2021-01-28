import React from 'react';

import { useSettings } from '../../state/SettingsContext';

export function LunchButtons() {
    const settings = useSettings();
    const setSettings = settings.setSettings;

    const [state, setState] = React.useState(settings.value.lunches);
    const saveTimeout = React.useRef<number>();

    React.useEffect(() => {
        window.clearTimeout(saveTimeout.current);

        saveTimeout.current = window.setTimeout(() => {
            setSettings((settings) => {
                return {
                    ...settings,
                    lunches: state,
                };
            });
        }, 500);
    }, [state, setSettings]);

    return (
        <div>
            <label className="label is-medium mb-2">
                Which lunches do you have?
            </label>
            <span>Click on a lunch to select it.</span>
            <div className="my-4">
                <span className="mr-2">B Block</span>

                <span
                    className={
                        'tag is-medium is-rounded mx-1 ' +
                        (state.b === 0 ? 'is-link' : 'is-dark')
                    }
                    onClick={() => {
                        setState({
                            ...state,
                            b: 0,
                        });
                    }}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    1st
                </span>

                <span
                    className={
                        'tag is-medium is-rounded mx-1 ' +
                        (state.b === 1 ? 'is-link' : 'is-dark')
                    }
                    onClick={() => {
                        setState({
                            ...state,
                            b: 1,
                        });
                    }}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    2nd
                </span>

                <span
                    className={
                        'tag is-medium is-rounded mx-1 ' +
                        (state.b === 2 ? 'is-link' : 'is-dark')
                    }
                    onClick={() => {
                        setState({
                            ...state,
                            b: 2,
                        });
                    }}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    3rd
                </span>
            </div>
            <div className="my-2">
                <span className="mr-2">F Block</span>

                <span
                    className={
                        'tag is-medium is-rounded mx-1 ' +
                        (state.f === 0 ? 'is-link' : 'is-dark')
                    }
                    onClick={() => {
                        setState({
                            ...state,
                            f: 0,
                        });
                    }}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    1st
                </span>

                <span
                    className={
                        'tag is-medium is-rounded mx-1 ' +
                        (state.f === 1 ? 'is-link' : 'is-dark')
                    }
                    onClick={() => {
                        setState({
                            ...state,
                            f: 1,
                        });
                    }}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    2nd
                </span>

                <span
                    className={
                        'tag is-medium is-rounded mx-1 ' +
                        (state.f === 2 ? 'is-link' : 'is-dark')
                    }
                    onClick={() => {
                        setState({
                            ...state,
                            f: 2,
                        });
                    }}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    3rd
                </span>
            </div>
        </div>
    );
}
