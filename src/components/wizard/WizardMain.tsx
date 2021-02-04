import React, { ChangeEvent } from 'react';
import { useSettings } from '../../state/SettingsContext';
import { WizardInPersonButton } from './WizardInPersonButton';

export function WizardMain() {
    const settings = useSettings();

    const [state, setState] = React.useState({
        userNickname: settings.value.userNickname,
        inPerson: settings.value.inPerson,
        useHttpLinks: settings.value.useHttpLinks,
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
    const setSettings = settings.setSettings;

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
            <h1>Main Settings</h1>
            <br />
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
                    id="useHttpLinksCheckbox"
                    type="checkbox"
                    name="useHttpLinks"
                    className="switch is-normal is-link is-rounded is-medium"
                    title="Are you on a Chromebook or mobile device?"
                    checked={state.useHttpLinks}
                    onChange={handleChange}
                />
                <label htmlFor="useHttpLinksCheckbox">
                    Turn on this option if you are using a Chromebook or a
                    mobile device:
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

                        <WizardInPersonButton weekNum={0} weekDay="monday">
                            M
                        </WizardInPersonButton>
                        <WizardInPersonButton weekNum={0} weekDay="tuesday">
                            T
                        </WizardInPersonButton>
                        <WizardInPersonButton weekNum={0} weekDay="wednesday">
                            W
                        </WizardInPersonButton>
                        <WizardInPersonButton weekNum={0} weekDay="thursday">
                            Th
                        </WizardInPersonButton>
                        <WizardInPersonButton weekNum={0} weekDay="friday">
                            F
                        </WizardInPersonButton>
                    </div>
                    <div className="my-2">
                        <span className="mr-2">Week 2</span>

                        <WizardInPersonButton weekNum={1} weekDay="monday">
                            M
                        </WizardInPersonButton>
                        <WizardInPersonButton weekNum={1} weekDay="tuesday">
                            T
                        </WizardInPersonButton>
                        <WizardInPersonButton weekNum={1} weekDay="wednesday">
                            W
                        </WizardInPersonButton>
                        <WizardInPersonButton weekNum={1} weekDay="thursday">
                            Th
                        </WizardInPersonButton>
                        <WizardInPersonButton weekNum={1} weekDay="friday">
                            F
                        </WizardInPersonButton>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
