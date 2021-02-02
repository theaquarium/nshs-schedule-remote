import React, { ChangeEvent } from 'react';
import { IoChevronBack, IoChevronDown, IoTrash } from 'react-icons/io5';

import { LoginSettings, useSettings } from '../../state/SettingsContext';
import { LoginInfo } from './LoginInfo';

export function FlexSettingsCard({
    flexSettingId,
    isOpenDefault,
}: {
    flexSettingId: string;
    isOpenDefault?: boolean;
}) {
    const settings = useSettings();
    const setSettings = settings.setSettings;

    const [state, setState] = React.useState(
        settings.value.flexSettings[flexSettingId],
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
                    flexSettings: {
                        ...settings.flexSettings,
                        [flexSettingId]: state,
                    },
                };
            });
        }, 500);
    }, [state, setSettings, flexSettingId]);

    const deleteFlexMeeting = () => {
        setSettings((settings) => {
            const newFlexSettings = { ...settings.flexSettings };
            delete newFlexSettings[flexSettingId];

            return {
                ...settings,
                flexSettings: newFlexSettings,
            };
        });
    };

    const toggleAvailablity = (event: any) => {
        const target = event.target;
        if (!target) return;
        if (!(target instanceof HTMLElement)) return;

        const meetingNum = target.dataset.meeting;
        if (!meetingNum) return;

        const availability =
            state.availability !== undefined
                ? state.availability
                : {
                      flex1: true,
                      flex2: true,
                      flex3: true,
                  };

        availability[meetingNum] =
            availability[meetingNum] !== undefined
                ? !availability[meetingNum]
                : false;

        setState({
            ...state,
            availability,
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
                            Flex Meeting Name
                        </label>
                        <div className="control">
                            <input
                                className="input is-rounded is-normal"
                                type="text"
                                placeholder="e.x. History Flex, DECA, GSA, etc."
                                name="nickname"
                                onChange={handleChange}
                                value={state.nickname || ''}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="my-4">
                        <label className="label is-normal mb-2">
                            When does this Flex Meeting meet?
                        </label>
                        <span>Click on a day to activate it.</span>
                        <div className="my-4">
                            <span
                                className={
                                    'tag is-medium is-rounded mx-1 ' +
                                    ((
                                        state.availability?.flex1 === undefined
                                            ? true
                                            : state.availability?.flex1
                                    )
                                        ? 'is-link'
                                        : 'is-black')
                                }
                                onClick={toggleAvailablity}
                                style={{
                                    cursor: 'pointer',
                                }}
                                data-meeting="flex1"
                            >
                                Flex 1 (Tuesday)
                            </span>
                            <span
                                className={
                                    'tag is-medium is-rounded mx-1 ' +
                                    ((
                                        state.availability?.flex2 === undefined
                                            ? true
                                            : state.availability?.flex2
                                    )
                                        ? 'is-link'
                                        : 'is-black')
                                }
                                onClick={toggleAvailablity}
                                style={{
                                    cursor: 'pointer',
                                }}
                                data-meeting="flex2"
                            >
                                Flex 2 (Wednesday)
                            </span>
                            <span
                                className={
                                    'tag is-medium is-rounded mx-1 ' +
                                    ((
                                        state.availability?.flex3 === undefined
                                            ? true
                                            : state.availability?.flex3
                                    )
                                        ? 'is-link'
                                        : 'is-black')
                                }
                                onClick={toggleAvailablity}
                                style={{
                                    cursor: 'pointer',
                                }}
                                data-meeting="flex3"
                            >
                                Flex 3 (Friday)
                            </span>
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
                        onClick={deleteFlexMeeting}
                    >
                        <span className="icon mr-1">
                            <IoTrash />
                        </span>
                        Delete Flex Meeting
                    </button>
                </div>
            ) : null}
        </div>
    );
}
