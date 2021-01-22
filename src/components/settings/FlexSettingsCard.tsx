import React, { ChangeEvent } from 'react';
import {
    IoChevronBack,
    IoChevronDown,
    IoEye,
    IoEyeOff,
    IoTrash,
} from 'react-icons/io5';

import {
    AutomaticLogin,
    ManualLogin,
    useSettings,
} from '../../state/SettingsContext';

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
    const [showPassword, setShowPassword] = React.useState(false);
    const [isAutomaticLinkOpen, setIsAutomaticLinkOpen] = React.useState(false);
    const [automaticLink, setAutomaticLink] = React.useState('');

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
                    flexSettings: {
                        ...settings.flexSettings,
                        [flexSettingId]: state,
                    },
                };
            });
        }, 500);
    }, [state, setSettings, flexSettingId]);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleAutomaticLinkOpen = () => {
        setIsAutomaticLinkOpen(!isAutomaticLinkOpen);
    };

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

    let loginType = 'none';

    if (state.login?.automatic !== undefined) {
        loginType = 'automatic';
    } else if (state.login?.manual !== undefined) {
        loginType = 'manual';
    }

    let loginOptions;

    if (loginType === 'automatic') {
        const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
            const target = event.target;

            let value =
                target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            const currentAutomaticLoginSettings: AutomaticLogin =
                state.login?.automatic !== undefined
                    ? state.login.automatic
                    : {
                          meetingId: '',
                          password: '',
                          inNewtonDomain: true,
                      };

            // Strip non-numbers from meeting ID or parse it if it's a link
            if (name === 'meetingId' && typeof value === 'string') {
                value = value.toLowerCase();

                setIsAutomaticLinkOpen(false);
                setAutomaticLink('');

                const linkRegex = /https:\/\/(?:(.*?)\.)?zoom.us\/j\/([\d]{9,11})/;

                if (linkRegex.test(value)) {
                    const matches = value.match(linkRegex);

                    if (matches !== null && matches.length > 0) {
                        const meetingId = matches[2];
                        if (meetingId) {
                            currentAutomaticLoginSettings.meetingId = meetingId;
                        }

                        const domain = matches[1];
                        if (domain) {
                            if (domain === 'newton-k12-ma-us') {
                                currentAutomaticLoginSettings.inNewtonDomain = true;
                                currentAutomaticLoginSettings.customDomain = '';
                            } else {
                                currentAutomaticLoginSettings.inNewtonDomain = false;
                                currentAutomaticLoginSettings.customDomain = domain;
                            }
                        } else {
                            currentAutomaticLoginSettings.inNewtonDomain = false;
                            currentAutomaticLoginSettings.customDomain = '';
                        }
                    }

                    setState({
                        ...state,
                        login: {
                            ...state.login,
                            automatic: currentAutomaticLoginSettings,
                        },
                    });
                    return;
                }

                value = value.replace(/\D/g, '');
            }

            if (typeof value === 'string') {
                value = value.trim();
            }

            setState({
                ...state,
                login: {
                    ...state.login,
                    automatic: {
                        ...currentAutomaticLoginSettings,
                        [name]: value,
                    },
                },
            });
        };

        const handleAutomaticLinkChange = (
            event: ChangeEvent<HTMLInputElement>,
        ) => {
            const target = event.target;

            let value = target.value;
            value = value.toLowerCase();

            setAutomaticLink(value);

            const automaticLoginSettings: AutomaticLogin =
                state.login?.automatic !== undefined
                    ? state.login.automatic
                    : {
                          meetingId: '',
                          password: '',
                          inNewtonDomain: true,
                      };

            const linkRegex = /https:\/\/(?:(.*?)\.)?zoom.us\/j\/([\d]{9,11})/;

            if (linkRegex.test(value)) {
                const matches = value.match(linkRegex);

                if (matches !== null && matches.length > 0) {
                    const meetingId = matches[2];
                    if (meetingId) {
                        automaticLoginSettings.meetingId = meetingId;
                    }

                    const domain = matches[1];
                    if (domain) {
                        if (domain === 'newton-k12-ma-us') {
                            automaticLoginSettings.inNewtonDomain = true;
                            automaticLoginSettings.customDomain = '';
                        } else {
                            automaticLoginSettings.inNewtonDomain = false;
                            automaticLoginSettings.customDomain = domain;
                        }
                    } else {
                        automaticLoginSettings.inNewtonDomain = false;
                        automaticLoginSettings.customDomain = '';
                    }
                }

                setState({
                    ...state,
                    login: {
                        ...state.login,
                        automatic: automaticLoginSettings,
                    },
                });
            }
        };

        loginOptions = (
            <React.Fragment>
                <p className="my-2">
                    Automatic login mode will automatically generate you a Zoom
                    link with the password embedded. This is the recommended
                    method.
                </p>
                <p className="my-2">
                    You can usually find your meeting ID in the email from your
                    teacher with the meeting information or by copying the 10 or
                    11 numbers at the end of a Zoom link.
                </p>
                <div className="field">
                    <label className="label is-normal">Meeting ID</label>
                    <div className="control">
                        <input
                            className="input is-rounded is-normal"
                            type="text"
                            placeholder="Meeting ID (e.g. 85934378935)"
                            name="meetingId"
                            onChange={handleLoginChange}
                            value={state.login?.automatic?.meetingId || ''}
                        />
                    </div>
                </div>

                <div className="px-5 mb-2">
                    <div className="has-text-left mb-2">
                        <button
                            type="button"
                            className="button is-text is-rounded p-2"
                            onClick={toggleAutomaticLinkOpen}
                        >
                            Need help?
                        </button>
                    </div>

                    {isAutomaticLinkOpen ? (
                        <div className="field">
                            <label className="label is-normal">
                                Enter your Zoom meeting link
                            </label>
                            <div className="control">
                                <input
                                    className="input is-rounded is-normal"
                                    type="text"
                                    placeholder="Meeting Link"
                                    name="automaticLink"
                                    onChange={handleAutomaticLinkChange}
                                    value={automaticLink}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>

                <label className="label is-normal">Password (Optional)</label>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input
                            className="input is-rounded is-normal"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Meeting Password (Optional)"
                            name="password"
                            onChange={handleLoginChange}
                            value={state.login?.automatic?.password || ''}
                        />
                    </div>
                    <div className="control">
                        <button
                            type="button"
                            className="button is-link is-rounded"
                            title="Show Password?"
                            onClick={toggleShowPassword}
                        >
                            <span className="icon">
                                {showPassword ? <IoEye /> : <IoEyeOff />}
                            </span>
                        </button>
                    </div>
                </div>
                <div className="field">
                    <input
                        id={flexSettingId + 'inNewtonDomainCheckbox'}
                        type="checkbox"
                        name="inNewtonDomain"
                        className="switch is-normal is-link is-rounded is-normal"
                        title="Do you have class this block?"
                        checked={state.login?.automatic?.inNewtonDomain}
                        onChange={handleLoginChange}
                    />
                    <label htmlFor={flexSettingId + 'inNewtonDomainCheckbox'}>
                        Is this an NPS meeting?
                    </label>
                </div>
                {!state.login?.automatic?.inNewtonDomain ? (
                    <div className="field">
                        <label className="label is-normal">
                            Custom Domain (Optional)
                        </label>
                        <div className="control">
                            <input
                                className="input is-rounded is-normal"
                                type="text"
                                placeholder="Custom Meeting Domain (Optional)"
                                name="customDomain"
                                onChange={handleLoginChange}
                                value={
                                    state.login?.automatic?.customDomain || ''
                                }
                            />
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        );
    } else if (loginType === 'manual') {
        const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
            const target = event.target;

            let value =
                target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            const currentManualLoginSettings: ManualLogin =
                state.login?.manual !== undefined
                    ? state.login.manual
                    : {
                          link: '',
                          password: '',
                      };

            if (typeof value === 'string') {
                value = value.trim();
            }

            setState({
                ...state,
                login: {
                    ...state.login,
                    manual: {
                        ...currentManualLoginSettings,
                        [name]: value,
                    },
                },
            });
        };

        loginOptions = (
            <React.Fragment>
                <p className="my-2">
                    Manual login mode lets you join a Zoom link you already
                    have. You should probably use Automatic mode except in
                    special circumstances or if you have issues with Automatic
                    mode.
                </p>
                <div className="field">
                    <label className="label is-normal">Link</label>
                    <div className="control">
                        <input
                            className="input is-rounded is-normal"
                            type="text"
                            placeholder="Zoom Link"
                            name="link"
                            onChange={handleLoginChange}
                            value={state.login?.manual?.link || ''}
                        />
                    </div>
                </div>
                <label className="label is-normal">Password (Optional)</label>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input
                            className="input is-rounded is-normal"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Meeting Password (Optional)"
                            name="password"
                            onChange={handleLoginChange}
                            value={state.login?.manual?.password || ''}
                        />
                    </div>
                    <div className="control">
                        <button
                            type="button"
                            className="button is-link is-rounded"
                            title="Show Password?"
                            onClick={toggleShowPassword}
                        >
                            <span className="icon">
                                {showPassword ? <IoEye /> : <IoEyeOff />}
                            </span>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

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
                    {
                        // login type selection buttons
                    }

                    <div className="divider">Login Info</div>
                    <div className="is-flex is-flex-wrap-wrap is-justify-content-start is-align-content-center is-align-items-center">
                        <label className="my-1 mr-3 label is-normal">
                            Login Type
                        </label>
                        <div className="my-1 buttons has-addons are-centered">
                            <button
                                type="button"
                                className={
                                    'button is-rounded is-normal my-0 ' +
                                    (loginType === 'none' ? 'is-link' : '')
                                }
                                onClick={() => {
                                    setState({
                                        ...state,
                                        login: {},
                                    });
                                }}
                            >
                                None
                            </button>
                            <button
                                type="button"
                                className={
                                    'button is-rounded is-normal my-0 ' +
                                    (loginType === 'automatic' ? 'is-link' : '')
                                }
                                onClick={() => {
                                    setState({
                                        ...state,
                                        login: {
                                            automatic: {
                                                meetingId: '',
                                                password: '',
                                                inNewtonDomain: true,
                                            },
                                        },
                                    });
                                }}
                            >
                                Automatic (Recommended)
                            </button>
                            <button
                                type="button"
                                className={
                                    'button is-rounded is-normal my-0 ' +
                                    (loginType === 'manual' ? 'is-link' : '')
                                }
                                onClick={() => {
                                    setState({
                                        ...state,
                                        login: {
                                            manual: {
                                                link: '',
                                                password: '',
                                            },
                                        },
                                    });
                                }}
                            >
                                Manual
                            </button>
                        </div>
                    </div>

                    <div>{loginOptions}</div>

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
