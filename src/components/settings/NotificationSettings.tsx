import React, { ChangeEvent } from 'react';

import { useSettings } from '../../state/SettingsContext';

export function NotificationSettings() {
    const settings = useSettings();
    const setSettings = settings.setSettings;

    const [state, setState] = React.useState({
        notificationsEnabled: settings.value.notificationsEnabled,
        sendLunchNotifications: settings.value.sendLunchNotifications,
    });

    const handleNotificationsEnabledChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const target = event.target;

        const value = target.checked;

        if (value !== true) {
            setState({
                ...state,
                notificationsEnabled: false,
            });
            return;
        }

        // Request permissions if activated
        const callback = () => {
            // Rerender component
            setState((state) => state);
        };

        try {
            Notification.requestPermission().then(callback);
        } catch (e) {
            Notification.requestPermission(callback);
        }

        setState({
            ...state,
            notificationsEnabled: true,
        });
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

    const requestPermissions = () => {
        const callback = () => {
            // Rerender component
            setState((state) => state);
        };

        try {
            Notification.requestPermission().then(callback);
        } catch (e) {
            Notification.requestPermission(callback);
        }
    };

    if (!window.Notification) return null;

    return (
        <div>
            <div className="field">
                <input
                    id="notificationsEnabledCheckbox"
                    type="checkbox"
                    name="notificationsEnabled"
                    className="switch is-normal is-link is-rounded is-medium"
                    title="Enable Class Notifications?"
                    checked={state.notificationsEnabled}
                    onChange={handleNotificationsEnabledChange}
                />
                <label htmlFor="notificationsEnabledCheckbox">
                    Enable Class Notifications?
                </label>
            </div>
            {state.notificationsEnabled ? (
                <div className="px-5 my-5 is-flex is-align-items-center">
                    <div className="field">
                        <input
                            id="sendLunchNotificationsCheckbox"
                            type="checkbox"
                            name="sendLunchNotifications"
                            className="switch is-normal is-link is-rounded is-medium"
                            title="Send Notifications for Lunch Block?"
                            checked={state.sendLunchNotifications}
                            onChange={handleChange}
                        />
                        <label htmlFor="sendLunchNotificationsCheckbox">
                            Send Notifications for Lunch Blocks?
                        </label>
                    </div>
                    {window.Notification.permission !== 'granted' ? (
                        <React.Fragment>
                            <span className="is-size-5 mr-3">
                                Notification permission has not been granted.
                            </span>
                            <button
                                className="button is-link is-normal is-rounded"
                                type="button"
                                onClick={requestPermissions}
                            >
                                Grant Permission
                            </button>
                        </React.Fragment>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
