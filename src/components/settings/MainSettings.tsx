import React, { ChangeEvent } from 'react';

import { useSettings } from '../../state/SettingsContext';
import { InPersonButton } from './InPersonButton';

export function MainSettings() {
    const settings = useSettings();
    const setSettings = settings.setSettings;

    const [state, setState] = React.useState({
        userNickname: settings.value.userNickname,
        showQuotes: settings.value.showQuotes,
        inPerson: settings.value.inPerson,
        inPersonDays: settings.value.inPersonDays,
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
            <br />
            <div className="field">
                <input
                    id="inPersonCheckbox"
                    type="checkbox"
                    name="inPerson"
                    className="switch is-normal is-link is-rounded is-medium"
                    title="Show Motivational Phrases?"
                    checked={state.inPerson}
                    onChange={handleChange}
                />
                <label htmlFor="inPersonCheckbox">
                    Do you attend school in person?
                </label>
            </div>
            {state.inPerson ? (
                <div className="px-5 my-4">
                    <label className="label is-medium mb-2">
                        Which days do you attend in person?
                    </label>
                    <span>Click on a day to activate it.</span>
                    <div className="my-4">
                        <span className="mr-2">Week 1</span>

                        <InPersonButton weekNum={0} weekDay="monday">
                            M
                        </InPersonButton>
                        <InPersonButton weekNum={0} weekDay="tuesday">
                            T
                        </InPersonButton>
                        <InPersonButton weekNum={0} weekDay="wednesday">
                            W
                        </InPersonButton>
                        <InPersonButton weekNum={0} weekDay="thursday">
                            Th
                        </InPersonButton>
                        <InPersonButton weekNum={0} weekDay="friday">
                            F
                        </InPersonButton>
                    </div>
                    <div className="my-2">
                        <span className="mr-2">Week 2</span>

                        <InPersonButton weekNum={1} weekDay="monday">
                            M
                        </InPersonButton>
                        <InPersonButton weekNum={1} weekDay="tuesday">
                            T
                        </InPersonButton>
                        <InPersonButton weekNum={1} weekDay="wednesday">
                            W
                        </InPersonButton>
                        <InPersonButton weekNum={1} weekDay="thursday">
                            Th
                        </InPersonButton>
                        <InPersonButton weekNum={1} weekDay="friday">
                            F
                        </InPersonButton>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
