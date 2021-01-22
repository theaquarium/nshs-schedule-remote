import React, { ChangeEvent } from 'react';

import { useSettings } from '../../state/SettingsContext';

export function FlexBlockInPersonSettings() {
    const settings = useSettings();
    const setSettings = settings.setSettings;

    const [state, setState] = React.useState(
        settings.value.flexBlockInPersonSettings || {
            flexClassroomNumber: '',
        },
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

    const saveTimeout = React.useRef<number>();

    React.useEffect(() => {
        window.clearTimeout(saveTimeout.current);

        saveTimeout.current = window.setTimeout(() => {
            setSettings((settings) => {
                return {
                    ...settings,
                    flexBlockInPersonSettings: state,
                };
            });
        }, 500);
    }, [state, setSettings]);

    return (
        <div>
            <div className="field">
                <label className="label is-normal">
                    Flex Classroom Number (Optional)
                </label>
                <div className="control">
                    <input
                        className="input is-rounded is-normal"
                        type="text"
                        placeholder="e.x. 5140, 7101"
                        name="flexClassroomNumber"
                        onChange={handleChange}
                        value={state.flexClassroomNumber}
                    />
                </div>
            </div>
        </div>
    );
}
