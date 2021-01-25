import React from 'react';

export interface AppStateType {
    isOnboarded: boolean;
    hasViewedSettings: boolean;
    ready: boolean;
    hasSchoolToday?: boolean;
    weekNum?: number;
    weekday?: number;
    lastUpdateTime?: number;
    activeBlock?: string;
    nextBlock?: string;
    activeLunch?: number;
    lastQuoteUpdate?: number;
    quoteIndex?: number;
}

export interface AppStateContextType {
    value: AppStateType;
    resetAppState: () => void;
    setAppStateDirect: (stateChanges: Partial<AppStateType>) => void;
    setAppState: (
        setterFunction: (state: AppStateType) => Partial<AppStateType>,
    ) => void;
}

const defaultState = {
    isOnboarded: true,
    hasViewedSettings: false,
    ready: false,
};

// Create Context
const AppStateContext = React.createContext<AppStateContextType>({
    value: defaultState,
    resetAppState: () => {},
    setAppStateDirect: () => {},
    setAppState: () => {},
});

// Provider component
export function AppStateProvider(props: any) {
    // Get component state
    const [appState, setAppState] = React.useState<AppStateType>(defaultState);

    // Save and read state
    const isInitialMount = React.useRef(true);

    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;

            // Read state
            const savedAppStateString = window.localStorage.getItem('appstate');
            if (savedAppStateString) {
                let savedState;

                try {
                    savedState = JSON.parse(savedAppStateString);
                } catch (e) {
                    savedState = {};
                }

                setAppState({
                    ...defaultState,
                    ...savedState,
                    ready: true,
                });
            } else {
                setAppState({
                    ...defaultState,
                    isOnboarded: false,
                });
            }
        } else {
            // Save state
            const appStateString = JSON.stringify(appState);
            window.localStorage.setItem('appstate', appStateString);
        }
    }, [appState]);

    // Memoized just in case
    const resetAppState = React.useMemo(() => {
        return () => {
            setAppState(defaultState);
        };
    }, [setAppState]);

    const setAppStateDirect = React.useMemo(() => {
        return (stateChanges: Partial<AppStateType>) => {
            setAppState((appState: AppStateType) => {
                return {
                    ...appState,
                    ...stateChanges,
                };
            });
        };
    }, [setAppState]);

    // const setAppStateWrapper = React.useMemo(() => {
    //     return (
    //         setterFunction: (state: AppStateType) => Partial<AppStateType>,
    //     ) => {
    //         setAppState((appState: AppStateType) => {
    //             const stateChanges = setterFunction(appState);

    //             return {
    //                 ...appState,
    //                 ...stateChanges,
    //             };
    //         });
    //     };
    // }, [setAppState]);

    const appStateProp = {
        value: appState,
        resetAppState,
        setAppStateDirect,
        setAppState,
    };

    return <AppStateContext.Provider {...props} value={appStateProp} />;
}

export function useAppState() {
    return React.useContext(AppStateContext);
}
