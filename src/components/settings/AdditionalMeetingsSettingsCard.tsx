import React, { ChangeEvent } from 'react';
import { IoChevronBack, IoChevronDown, IoTrash } from 'react-icons/io5';

import { LoginSettings, useSettings } from '../../state/SettingsContext';
import { LoginInfo } from './LoginInfo';

export function AdditionalMeetingsSettingsCard({
    additionalSettingId,
    isOpenDefault,
}: {
    additionalSettingId: string;
    isOpenDefault?: boolean;
}) {
    const settings = useSettings();
    const setSettings = settings.setSettings;

    const [state, setState] = React.useState(
        settings.value.additionalMeetings[additionalSettingId],
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
            setSettings((settings) => {
                return {
                    ...settings,
                    additionalMeetings: {
                        ...settings.additionalMeetings,
                        [additionalSettingId]: state,
                    },
                };
            });
        }, 500);
    }, [state, setSettings, additionalSettingId]);

    const deleteAdditionalMeeting = () => {
        setSettings((settings) => {
            const newAdditionalSettings = { ...settings.additionalMeetings };
            delete newAdditionalSettings[additionalSettingId];

            return {
                ...settings,
                additionalMeetings: newAdditionalSettings,
            };
        });
    };

    return (
        <div className="card my-3">
            <header
                className="card-header"
                onClick={toggleCard}
                style={{
                    cursor: 'pointer',
                }}
            >
                <p className="card-header-title">{state.nickname}</p>
                <span className="card-header-icon" aria-label="Expand">
                    <span className="icon">
                        {isOpen ? <IoChevronDown /> : <IoChevronBack />}
                    </span>
                </span>
            </header>

            {isOpen ? (
                <div className="card-content">
                    <div className="field">
                        <label className="label is-normal">
                            Additional Meeting Name
                        </label>
                        <div className="control">
                            <input
                                className="input is-rounded is-normal"
                                type="text"
                                placeholder="e.x. Mock Trial, Dance, Tutoring, etc."
                                name="nickname"
                                onChange={handleChange}
                                value={state.nickname || ''}
                            />
                        </div>
                    </div>

                    {
                        // login type selection buttons
                    }

                    <div className="divider">Login Info</div>
                    <LoginInfo
                        currentLoginSettings={state.newLogin}
                        setLoginSettings={setLoginSettings}
                    />

                    <div className="divider">Delete</div>

                    <button
                        type="button"
                        className="button is-danger is-fullwidth is-rounded is-outlined"
                        onClick={deleteAdditionalMeeting}
                    >
                        <span className="icon mr-1">
                            <IoTrash />
                        </span>
                        Delete Additional Meeting
                    </button>
                </div>
            ) : null}
        </div>
    );
}
