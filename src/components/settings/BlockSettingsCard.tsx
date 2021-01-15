import React, { ChangeEvent } from 'react';
import { IoChevronBack, IoChevronDown } from 'react-icons/io5';

import {
    AutomaticLogin,
    ManualLogin,
    useSettings,
} from '../../state/SettingsContext';

export function BlockSettingsCard({ blockType }: { blockType: string }) {
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

    const [isOpen, setIsOpen] = React.useState(false);

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

            // Strip non-numbers from meeting ID
            if (name === 'meetingId' && typeof value === 'string') {
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

        loginOptions = (
            <React.Fragment>
                <p className="my-2">
                    Automatic login mode will automatically generate you a Zoom
                    link with the password embedded. This is the recommended
                    method.
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
                <div className="field">
                    <label className="label is-normal">
                        Password (Optional)
                    </label>
                    <div className="control">
                        <input
                            className="input is-rounded is-normal"
                            type="password"
                            placeholder="Meeting Password (Optional)"
                            name="password"
                            onChange={handleLoginChange}
                            value={state.login?.automatic?.password || ''}
                        />
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
                        Is this a link for an NPS meeting?
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
                    special circumstances.
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
                <div className="field">
                    <label className="label is-normal">
                        Password (Optional)
                    </label>
                    <div className="control">
                        <input
                            className="input is-rounded is-normal"
                            type="password"
                            placeholder="Meeting Password (Optional)"
                            name="password"
                            onChange={handleLoginChange}
                            value={state.login?.manual?.password || ''}
                        />
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
                <p className="card-header-title">{blockName}</p>
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
                                        Automatic
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
                                        Manual
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
