import React, { ChangeEvent } from 'react';

import { useSettings } from '../../state/SettingsContext';

export function MainSettings() {
    const settings = useSettings();
    const setSettings = settings.setSettings;

    const [state, setState] = React.useState({
        userNickname: settings.value.userNickname,
        showQuotes: settings.value.showQuotes,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value,
        });
    };

    const saveTimeout = React.useRef<number>();

    React.useEffect(() => {
        window.clearTimeout(saveTimeout.current);

        saveTimeout.current = window.setTimeout(() => {
            setSettings((settings) => {
                return {
                    ...settings,
                    ...state,
                };
            });
        }, 500);
    }, [state, setSettings]);

    return (
        <div>
            <div className="field">
                <label className="label is-medium">
                    What should I call you?
                </label>
                <div className="control">
                    <input
                        className="input is-rounded is-medium"
                        type="text"
                        placeholder="Nickname"
                        name="userNickname"
                        onChange={handleChange}
                        value={state.userNickname}
                    />
                </div>
            </div>
            <br />
            <div className="field">
                <input
                    id="showQuotesCheckbox"
                    type="checkbox"
                    name="showQuotes"
                    className="switch is-normal is-link is-rounded is-medium"
                    title="Show Motivational Phrases?"
                    checked={state.showQuotes}
                    onChange={handleChange}
                />
                <label htmlFor="showQuotesCheckbox">
                    Show Motivational Phrases?
                </label>
            </div>
        </div>
    );
}
