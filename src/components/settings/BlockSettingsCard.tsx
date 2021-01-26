import React, { ChangeEvent } from 'react';
import { IoChevronBack, IoChevronDown, IoEye, IoEyeOff } from 'react-icons/io5';

import {
    AutomaticLogin,
    ManualLogin,
    useSettings,
} from '../../state/SettingsContext';

export function BlockSettingsCard({
    blockType,
    isOpenDefault,
}: {
    blockType: string;
    isOpenDefault?: boolean;
}) {
    let blockName;

    switch (blockType) {
        case 'a':
            blockName = 'A Block';
            break;
        case 'b':
            blockName = 'B Block';
            break;
        case 'c':
            blockName = 'C Block';
            break;
        case 'd':
            blockName = 'D Block';
            break;
        case 'e':
            blockName = 'E Block';
            break;
        case 'f':
            blockName = 'F Block';
            break;
        case 'g':
            blockName = 'G Block';
            break;
        case 'community':
            blockName = 'Community';
            break;
    }

    const settings = useSettings();
    const setSettings = settings.setSettings;

    const [state, setState] = React.useState(
        settings.value.blockSettings[blockType],
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
                    blockSettings: {
                        ...settings.blockSettings,
                        [blockType]: state,
                    },
                };
            });
        }, 500);
    }, [state, setSettings, blockType]);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleAutomaticLinkOpen = () => {
        setIsAutomaticLinkOpen(!isAutomaticLinkOpen);
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
                    method. However, this may not work on Chromebooks. If you
                    experience any issues, you should use manual mode.
                </p>
                <div className="field">
                    <label className="label is-normal">
                        Meeting ID or Link
                    </label>
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
                        id={blockType + 'block-inNewtonDomainCheckbox'}
                        type="checkbox"
                        name="inNewtonDomain"
                        className="switch is-normal is-link is-rounded is-normal"
                        title="Do you have class this block?"
                        checked={state.login?.automatic?.inNewtonDomain}
                        onChange={handleLoginChange}
                    />
                    <label htmlFor={blockType + 'block-inNewtonDomainCheckbox'}>
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
                    have. Automatic mode is recommended because it will
                    automatically generate a link with the password embedded,
                    but it may not work on all devices.
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
    } else if (loginType === 'none') {
        loginOptions = (
            <React.Fragment>
                <p className="my-2 mt-4">
                    Configure your meeting login settings here.
                </p>
                <p className="my-2">
                    Choose None if you don't want to store login information for
                    this class in the schedule.
                    <br />
                    Automatic mode is the recommended method for adding login
                    information for your class.
                    <br />
                    You should choose Manual mode if you experience issues with
                    automatic mode (which may occur if on a Chromebook).
                </p>
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
                            <div className="is-flex is-flex-wrap-wrap is-justify-content-start is-align-content-center is-align-items-center">
                                <label className="my-1 mr-3 label is-normal">
                                    Login Type
                                </label>
                                <div className="my-1 buttons has-addons are-centered">
                                    <button
                                        type="button"
                                        className={
                                            'button is-rounded is-normal my-0 ' +
                                            (loginType === 'none'
                                                ? 'is-link'
                                                : '')
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
                                            (loginType === 'automatic'
                                                ? 'is-link'
                                                : '')
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
                                        Automatic (Recommended for most)
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            'button is-rounded is-normal my-0 ' +
                                            (loginType === 'manual'
                                                ? 'is-link'
                                                : '')
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
                                        Manual (Recommended for Chromebooks)
                                    </button>
                                </div>
                            </div>

                            <div>{loginOptions}</div>
                        </React.Fragment>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
