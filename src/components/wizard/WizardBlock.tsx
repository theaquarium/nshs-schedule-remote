import React, { ChangeEvent } from 'react';
import { LoginSettings, useSettings } from '../../state/SettingsContext';
import { blockTypeToName } from '../../utils';
import { WizardLoginInfo } from './WizardLoginInfo';

export function WizardBlock({ blockType }: { blockType: string }) {
    const settings = useSettings();

    const [state, setState] = React.useState(
        settings.value.blockSettings[blockType],
    );

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

    const setLoginSettings = (newLoginSettings: LoginSettings) => {
        setState({
            ...state,
            newLogin: newLoginSettings,
        });
    };

    const saveTimeout = React.useRef<number>();
    const setSettings = settings.setSettings;

    React.useEffect(() => {
        window.clearTimeout(saveTimeout.current);

        saveTimeout.current = window.setTimeout(() => {
            console.log('Saving settings.');
            setSettings((settings) => {
                return {
                    ...settings,
                    blockSettings: {
                        ...settings.blockSettings,
                        [blockType]: state,
                    },
                };
            });
        }, 500);
    }, [state, setSettings, blockType]);

    return (
        <div>
            <h1>{blockTypeToName(blockType)}</h1>
            <br />
            <div className="field">
                <input
                    id="hasClassCheckbox"
                    type="checkbox"
                    name="hasClass"
                    className="switch is-medium is-link is-rounded is-normal"
                    title="Do you have class this block?"
                    checked={state.hasClass}
                    onChange={handleChange}
                />
                <label htmlFor="hasClassCheckbox">
                    Do you have class this block?
                </label>
            </div>

            {state.hasClass ? (
                <React.Fragment>
                    <br />
                    <div className="field">
                        <label className="label is-medium">Class Name</label>
                        <div className="control">
                            <input
                                className="input is-rounded is-medium"
                                type="text"
                                placeholder="e.x. History, Math, English"
                                name="nickname"
                                onChange={handleChange}
                                value={state.nickname || ''}
                            />
                        </div>
                    </div>
                    {settings.value.inPerson ? (
                        <React.Fragment>
                            <label className="label is-medium">
                                Classroom and Desk Number (Optional)
                            </label>
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <input
                                        className="input is-rounded is-medium"
                                        type="text"
                                        placeholder="e.x. 2314"
                                        name="classroomNumber"
                                        onChange={handleChange}
                                        value={state.classroomNumber || ''}
                                    />
                                </div>
                                <div className="control">
                                    <input
                                        className="input is-rounded is-medium"
                                        type="text"
                                        placeholder="e.x. 9"
                                        name="deskNumber"
                                        onChange={handleChange}
                                        value={state.deskNumber || ''}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    ) : null}

                    {
                        // login type selection buttons
                    }

                    <div className="divider">Login Info</div>
                    <WizardLoginInfo
                        currentLoginSettings={state.newLogin}
                        setLoginSettings={setLoginSettings}
                    />
                </React.Fragment>
            ) : null}
        </div>
    );
}
