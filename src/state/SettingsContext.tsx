import React from 'react';

export interface AutomaticLogin {
    meetingId: string;
    password?: string;
    inNewtonDomain: boolean;
    customDomain?: string;
}

export interface ManualLogin {
    link: string;
    password?: string;
}

export interface BlockSettings {
    nickname?: string;
    hasClass: boolean;
    login?: {
        automatic?: AutomaticLogin;
        manual?: ManualLogin;
    };
}

export interface FlexSettings {
    id: string;
    nickname: string;
    login?: {
        automatic?: AutomaticLogin;
        manual?: ManualLogin;
    };
}

export interface SettingsType {
    ready: boolean;
    userNickname: string;
    showQuotes: boolean;
    blockSettings: {
        [index: string]: BlockSettings;
        a: BlockSettings;
        b: BlockSettings;
        c: BlockSettings;
        d: BlockSettings;
        e: BlockSettings;
        f: BlockSettings;
        g: BlockSettings;
        community: BlockSettings;
    };
    flexSettings: Record<string, FlexSettings>;
}

export interface SettingsContextType {
    value: SettingsType;
    resetSettings: () => void;
    setSettingsDirect: (settingChanges: Partial<SettingsType>) => void;
    setSettings: (
        setterFunction: (settings: SettingsType) => Partial<SettingsType>,
    ) => void;
}

export const defaultState: SettingsType = {
    ready: false,
    userNickname: '',
    showQuotes: true,
    blockSettings: {
        a: {
            hasClass: true,
        },
        b: {
            hasClass: true,
        },
        c: {
            hasClass: true,
        },
        d: {
            hasClass: true,
        },
        e: {
            hasClass: true,
        },
        f: {
            hasClass: true,
        },
        g: {
            hasClass: true,
        },
        community: {
            hasClass: true,
        },
    },
    flexSettings: {},
};

const SettingsContext = React.createContext<SettingsContextType>({
    value: defaultState,
    resetSettings: () => {},
    setSettingsDirect: () => {},
    setSettings: () => {},
});

export function SettingsProvider(props: any) {
    const [settings, setSettings] = React.useState<SettingsType>(defaultState);

    // Save and read state
    const isInitialMount = React.useRef(true);

    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;

            // Read state
            const savedSettingsString = window.localStorage.getItem('settings');
            if (savedSettingsString) {
                const savedSettings = JSON.parse(savedSettingsString);
                setSettings({ ...defaultState, ...savedSettings, ready: true });
            } else {
                setSettings({
                    ...defaultState,
                    ready: true,
                });
            }
        } else {
            // Save state
            const settingsString = JSON.stringify(settings);
            window.localStorage.setItem('settings', settingsString);
        }
    }, [settings]);

    // Memoized just in case
    const resetSettings = React.useMemo(() => {
        return () => {
            setSettings(defaultState);
        };
    }, [setSettings]);

    const setSettingsDirect = React.useMemo(() => {
        return (settingChanges: Partial<SettingsType>) => {
            setSettings((settings: SettingsType) => {
                return {
                    ...settings,
                    ...settingChanges,
                };
            });
        };
    }, [setSettings]);

    const settingsProp = {
        value: settings,
        resetSettings,
        setSettingsDirect,
        setSettings,
    };

    return <SettingsContext.Provider {...props} value={settingsProp} />;
}

export function useSettings() {
    return React.useContext(SettingsContext);
}
