import React, { ChangeEvent } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { LoginSettings } from '../../state/SettingsContext';

import { ZoomLinkRegex } from '../../utils';

export function WizardLoginInfo({
    currentLoginSettings,
    setLoginSettings,
}: {
    currentLoginSettings?: LoginSettings;
    setLoginSettings: (newLoginSettings: LoginSettings) => void;
}) {
    const [state, setState] = React.useState(
        currentLoginSettings || {
            storeLoginInfo: false,
            link: '',
            password: '',
        },
    );
    const isValidLink =
        state.link.length === 0 || ZoomLinkRegex.test(state.link);

    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // Save login info
        const newState = {
            ...state,
            [name]: value,
        };

        setState(newState);

        setLoginSettings(newState);
    };

    return (
        <React.Fragment>
            <div className="field">
                <input
                    id="storeLoginInfoCheckbox"
                    type="checkbox"
                    name="storeLoginInfo"
                    className="switch is-link is-rounded is-medium"
                    title="Store login info for this meeting?"
                    checked={state.storeLoginInfo}
                    onChange={handleChange}
                />
                <label htmlFor="storeLoginInfoCheckbox">
                    Store login info for this meeting?
                </label>
            </div>
            {state.storeLoginInfo ? (
                <React.Fragment>
                    <div className="field">
                        <label className="label is-medium">Meeting Link</label>
                        <div className="control">
                            <input
                                className={
                                    'input is-rounded is-medium ' +
                                    (!isValidLink ? 'is-danger' : '')
                                }
                                type="text"
                                placeholder="Zoom Link"
                                name="link"
                                onChange={handleChange}
                                value={state.link}
                            />
                        </div>
                        {!isValidLink ? (
                            <p className="help is-danger is-size-6">
                                This is not a valid Zoom link.
                            </p>
                        ) : null}
                    </div>
                    <label className="label is-medium">
                        Password (Optional)
                    </label>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input
                                className="input is-rounded is-medium"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Meeting Password (Optional)"
                                name="password"
                                onChange={handleChange}
                                value={state.password}
                            />
                        </div>
                        <div className="control">
                            <button
                                type="button"
                                className="button is-link is-rounded is-medium"
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
            ) : null}
        </React.Fragment>
    );
}
