import React from 'react';

// export interface AutomaticLogin {
//     meetingId: string;
//     password?: string;
//     inNewtonDomain: boolean;
//     customDomain?: string;
// }

// export interface ManualLogin {
//     link: string;
//     password?: string;
// }

export interface LoginSettings {
    storeLoginInfo: boolean;
    link: string;
    password: string;
}

export interface BlockSettings {
    nickname?: string;
    hasClass: boolean;
    // login?: {
    //     automatic?: AutomaticLogin;
    //     manual?: ManualLogin;
    // };
    newLogin?: LoginSettings;
    classroomNumber?: string;
    deskNumber?: string;
}

export interface FlexAvailability {
    [index: string]: boolean;
    flex1: boolean;
    flex2: boolean;
    flex3: boolean;
}

export interface FlexSettings {
    id: string;
    nickname: string;
    // login?: {
    //     automatic?: AutomaticLogin;
    //     manual?: ManualLogin;
    // };
    newLogin?: LoginSettings;
    availability?: FlexAvailability;
}

export interface AdditionalMeetingSettings {
    id: string;
    nickname: string;
    // login?: {
    //     automatic?: AutomaticLogin;
    //     manual?: ManualLogin;
    // };
    newLogin?: LoginSettings;
}

export interface FlexBlockInPersonSettings {
    flexClassroomNumber: string;
}

export interface SettingsType {
    ready: boolean;
    theme: 'dark' | 'light';
    userNickname: string;
    showQuotes: boolean;
    showClock: boolean;
    use24HourClock: boolean;
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
    inPerson: boolean;
    inPersonDays: {
        [index: string]: boolean;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
    }[];
    flexBlockInPersonSettings?: FlexBlockInPersonSettings;
    additionalMeetings: Record<string, AdditionalMeetingSettings>;
    notificationsEnabled: boolean;
    sendLunchNotifications: boolean;
    lunches: {
        [index: string]: number;
        b: number;
        f: number;
    };
    useHttpLinks: boolean;
}

export interface SettingsContextType {
    value: SettingsType;
    resetSettings: () => void;
    setSettingsDirect: (settingChanges: Partial<SettingsType>) => void;
    setSettings: (
        setterFunction: (settings: SettingsType) => Partial<SettingsType>,
    ) => void;
}

// Default settings

const isOnChromebook = /(CrOS)/.test(navigator.userAgent);
const isOnMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
);

export const defaultState: SettingsType = {
    ready: false,
    theme: 'dark',
    userNickname: '',
    showQuotes: true,
    showClock: true,
    use24HourClock: false,
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
    inPerson: false,
    inPersonDays: [
        {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
        },
        {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
        },
    ],
    additionalMeetings: {},
    notificationsEnabled: false,
    sendLunchNotifications: true,
    lunches: {
        b: -1,
        f: -1,
    },
    useHttpLinks: isOnChromebook || isOnMobile,
};

// Transform to new settings schema
export function settingsTransformer(oldSettings: any): SettingsType {
    console.log('Running settings transformer');

    // Declare utils functions
    function generateNormalLink(loginInfo: any): string {
        const domain = loginInfo.inNewtonDomain
            ? 'newton-k12-ma-us'
            : loginInfo.customDomain || '';

        return `https://${domain.length > 0 ? `${domain}.` : ''}zoom.us/j/${
            loginInfo.meetingId
        }`;
    }

    const newSettings = { ...oldSettings };

    Object.keys(newSettings.blockSettings).forEach((key) => {
        const blockSettings = newSettings.blockSettings[key];
        if ('login' in blockSettings) {
            console.log('Old login schema found. Transforming...');
            if ('automatic' in blockSettings.login) {
                const link = generateNormalLink(blockSettings.login.automatic);

                blockSettings.newLogin = {
                    storeLoginInfo: true,
                    link: link,
                    password: blockSettings.login.automatic.password,
                };
            } else if ('manual' in blockSettings.login) {
                blockSettings.newLogin = {
                    storeLoginInfo: true,
                    link: blockSettings.login.manual.link,
                    password: blockSettings.login.manual.password,
                };
            } else {
                blockSettings.newLogin = {
                    storeLoginInfo: false,
                    link: '',
                    password: '',
                };
            }

            delete blockSettings.login;
        }

        newSettings.blockSettings[key] = blockSettings;
    });

    Object.keys(newSettings.flexSettings).forEach((key) => {
        const flexSettings = newSettings.flexSettings[key];
        if ('login' in flexSettings) {
            console.log('Old login schema found. Transforming...');
            if ('automatic' in flexSettings.login) {
                const link = generateNormalLink(flexSettings.login.automatic);

                flexSettings.newLogin = {
                    storeLoginInfo: true,
                    link: link,
                    password: flexSettings.login.automatic.password,
                };
            } else if ('manual' in flexSettings.login) {
                flexSettings.newLogin = {
                    storeLoginInfo: true,
                    link: flexSettings.login.manual.link,
                    password: flexSettings.login.manual.password,
                };
            } else {
                flexSettings.newLogin = {
                    storeLoginInfo: false,
                    link: '',
                    password: '',
                };
            }

            delete flexSettings.login;
        }

        newSettings.flexSettings[key] = flexSettings;
    });

    Object.keys(newSettings.additionalMeetings).forEach((key) => {
        const additionalMeetings = newSettings.additionalMeetings[key];
        if ('login' in additionalMeetings) {
            console.log('Old login schema found. Transforming...');
            if ('automatic' in additionalMeetings.login) {
                const link = generateNormalLink(
                    additionalMeetings.login.automatic,
                );

                additionalMeetings.newLogin = {
                    storeLoginInfo: true,
                    link: link,
                    password: additionalMeetings.login.automatic.password,
                };
            } else if ('manual' in additionalMeetings.login) {
                additionalMeetings.newLogin = {
                    storeLoginInfo: true,
                    link: additionalMeetings.login.manual.link,
                    password: additionalMeetings.login.manual.password,
                };
            } else {
                additionalMeetings.newLogin = {
                    storeLoginInfo: false,
                    link: '',
                    password: '',
                };
            }

            delete additionalMeetings.login;
        }

        newSettings.additionalMeetings[key] = additionalMeetings;
    });

    return newSettings;
}

const SettingsContext = React.createContext<SettingsContextType>({
    value: defaultState,
    resetSettings: () => {},
    setSettingsDirect: () => {},
    setSettings: () => {},
});

export function SettingsProvider(props: any) {
    const [settings, setSettings] = React.useState<SettingsType>(defaultState);

    // Save and read state
    React.useEffect(() => {
        if (!settings.ready) {
            // Read state
            const savedSettingsString = window.localStorage.getItem('settings');
            if (savedSettingsString) {
                let savedSettings;

                try {
                    savedSettings = JSON.parse(savedSettingsString);

                    savedSettings = settingsTransformer(savedSettings);
                } catch (e) {
                    savedSettings = {};
                }

                setSettings({
                    ...defaultState,
                    ...savedSettings,
                    ready: true,
                });
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
            setSettings({
                ...defaultState,
                ready: true,
            });
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
