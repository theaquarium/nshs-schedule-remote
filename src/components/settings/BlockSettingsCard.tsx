import React, { ChangeEvent } from 'react';
import { IoChevronBack, IoChevronDown } from 'react-icons/io5';

import { LoginSettings, useSettings } from '../../state/SettingsContext';
import { blockTypeToName } from '../../utils';
import { LoginInfo } from './LoginInfo';

export function BlockSettingsCard({
    blockType,
    isOpenDefault,
}: {
    blockType: string;
    isOpenDefault?: boolean;
}) {
    const blockName = blockTypeToName(blockType);

    const settings = useSettings();
    const setSettings = settings.setSettings;

    const [state, setState] = React.useState(
        settings.value.blockSettings[blockType],
    );

    const [isOpen, setIsOpen] = React.useState(isOpenDefault);
    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

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
        <div className="card my-3">
            <header
                className="card-header"
                onClick={toggleCard}
                style={{
                    cursor: 'pointer',
                }}
            >
                <p className="card-header-title">
                    {blockName}
                    {state.nickname && state.nickname.length > 0 ? (
                        <span className="is-italic">
                            &nbsp;(
                            {state.nickname})
                        </span>
                    ) : null}
                </p>
                <span className="card-header-icon" aria-label="Expand">
                    <span className="icon">
                        {isOpen ? <IoChevronDown /> : <IoChevronBack />}
                    </span>
                </span>
            </header>

            {isOpen ? (
                <div className="card-content">
                    <div className="field">
                        <input
                            id={blockType + 'block-hasClassCheckbox'}
                            type="checkbox"
                            name="hasClass"
                            className="switch is-normal is-link is-rounded is-normal"
                            title="Do you have class this block?"
                            checked={state.hasClass}
                            onChange={handleChange}
                        />
                        <label htmlFor={blockType + 'block-hasClassCheckbox'}>
                            Do you have class this block?
                        </label>
                    </div>

                    {state.hasClass ? (
                        <React.Fragment>
                            <br />
                            <div className="field">
                                <label className="label is-normal">
                                    Class Name
                                </label>
                                <div className="control">
                                    <input
                                        className="input is-rounded is-normal"
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
                                    <label className="label is-normal">
                                        Classroom and Desk Number (Optional)
                                    </label>
                                    <div className="field has-addons">
                                        <div className="control is-expanded">
                                            <input
                                                className="input is-rounded is-normal"
                                                type="text"
                                                placeholder="e.x. 2314"
                                                name="classroomNumber"
                                                onChange={handleChange}
                                                value={
                                                    state.classroomNumber || ''
                                                }
                                            />
                                        </div>
                                        <div className="control">
                                            <input
                                                className="input is-rounded is-normal"
                                                type="text"
                                                placeholder="e.x. 9"
                                                name="deskNumber"
                                                onChange={handleChange}
                                                value={state.deskNumber || ''}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="field">
                                        <label className="label is-normal">
                                            Desk Number (Optional)
                                        </label>
                                    </div> */}
                                </React.Fragment>
                            ) : null}

                            {
                                // login type selection buttons
                            }

                            <div className="divider">Login Info</div>
                            <LoginInfo
                                currentLoginSettings={state.newLogin}
                                setLoginSettings={setLoginSettings}
                            />
                        </React.Fragment>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
