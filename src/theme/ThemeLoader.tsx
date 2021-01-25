import React from 'react';
import { useSettings } from '../state/SettingsContext';

// import lightStyles from '../styles/bulma/bulma-light-theme.lazy.scss';
// import darkStyles from '../styles/bulma/bulma-dark-theme.lazy.scss';

import './ThemeLoader.css';

export function ThemeLoader({ children }: { children: any }) {
    const settings = useSettings();

    const [themeReady, setThemeReady] = React.useState(false);

    React.useEffect(() => {
        if (settings.value.ready) {
            if (settings.value.theme === 'light') {
                // lightStyles.use();
                import('../styles/bulma/bulma-light-theme.lazy.scss').then(
                    () => {
                        setThemeReady(true);
                        document.documentElement.setAttribute(
                            'data-theme',
                            'light',
                        );
                    },
                );
            } else {
                // darkStyles.use();
                import('../styles/bulma/bulma-dark-theme.lazy.scss').then(
                    () => {
                        setThemeReady(true);
                        document.documentElement.setAttribute(
                            'data-theme',
                            'dark',
                        );
                    },
                );
            }
        }
    }, [settings.value.ready, settings.value.theme]);

    if (themeReady) {
        return <React.Fragment>{children}</React.Fragment>;
    } else {
        return <div className="theme-loader" />;
    }
}
