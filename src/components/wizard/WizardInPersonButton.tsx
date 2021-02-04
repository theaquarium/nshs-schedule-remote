import React from 'react';

import { useSettings } from '../../state/SettingsContext';

export function WizardInPersonButton({
    weekNum,
    weekDay,
    children,
}: {
    weekNum: number;
    weekDay: string;
    children: any;
}) {
    const settings = useSettings();
    const setSettings = settings.setSettings;

    const initialVal =
        settings.value.inPersonDays?.[weekNum]?.[weekDay] || false;

    const [state, setState] = React.useState(initialVal);

    const handleChange = () => {
        setState(!state);
    };

    const saveTimeout = React.useRef<number>();

    React.useEffect(() => {
        window.clearTimeout(saveTimeout.current);

        saveTimeout.current = window.setTimeout(() => {
            setSettings((settings) => {
                const inPersonDays = settings.inPersonDays || [];

                if (inPersonDays[weekNum] === undefined) {
                    inPersonDays[weekNum] = {
                        monday: false,
                        tuesday: false,
                        wednesday: false,
                        thursday: false,
                        friday: false,
                    };
                }

                inPersonDays[weekNum][weekDay] = state;

                return {
                    ...settings,
                    inPersonDays,
                };
            });
        }, 500);
    }, [state, setSettings, weekDay, weekNum]);

    return (
        <span
            className={
                'tag is-medium is-rounded mx-1 ' +
                (state ? 'is-link' : 'is-dark')
            }
            onClick={handleChange}
            style={{
                cursor: 'pointer',
            }}
        >
            {children}
        </span>
    );
}
