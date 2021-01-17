import React from 'react';
import './Help.css';

import { SidebarLink } from './SidebarLink';

// type MenuCallback = () => number | undefined;

type MenuContextType = {
    activeElement: string;
    addElement: (element: HTMLElement) => void;
    removeElement: (element: HTMLElement) => void;
};

const MenuContext = React.createContext<MenuContextType>({
    activeElement: '',
    addElement: () => {},
    removeElement: () => {},
});

export const useMenuContext = () => {
    return React.useContext(MenuContext);
};

export function SidebarMenu() {
    const [activeElement, setActiveElement] = React.useState('');
    const [elementList, setElementList] = React.useState<HTMLElement[]>([]);

    const addElement = React.useMemo(() => {
        return (element: HTMLElement) => {
            setElementList((list) => {
                return [...list, element];
            });
        };
    }, [setElementList]);

    const removeElement = React.useMemo(() => {
        return (element: HTMLElement) => {
            setElementList((list) => {
                const newList = [...list];

                const index = newList.indexOf(element);
                if (index > -1) {
                    newList.splice(index, 1);
                }

                return newList;
            });
        };
    }, [setElementList]);

    const contextValue = {
        activeElement,
        addElement,
        removeElement,
    };

    React.useEffect(() => {
        const listener = () => {
            let minHeight = Infinity;
            let topElement: HTMLElement | undefined;

            elementList.forEach((element) => {
                const bounds = element.getBoundingClientRect();

                if (bounds.top < 0) return;

                if (bounds.top < minHeight) {
                    minHeight = bounds.top;
                    topElement = element;
                }
            });

            if (topElement) {
                setActiveElement(topElement.id);
            }
        };

        window.addEventListener('scroll', listener);

        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, [elementList, setActiveElement]);

    return (
        <MenuContext.Provider value={contextValue}>
            <aside className="menu sticky-aside">
                <h1 className="title">Help Page</h1>
                <ul className="menu-list">
                    <li>
                        <SidebarLink linkedId="accessing-this-page">
                            Accessing This Page
                        </SidebarLink>
                    </li>
                </ul>
                <p className="menu-label">Schedule</p>
                <ul className="menu-list">
                    <li>
                        <SidebarLink linkedId="using-the-schedule">
                            Using the Schedule
                        </SidebarLink>
                        <ul>
                            <li>
                                <SidebarLink linkedId="week-buttons">
                                    Week Buttons
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink linkedId="schedule-banner">
                                    Schedule Banner
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink linkedId="block-schedule">
                                    Block Schedule
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink linkedId="lunches">
                                    Lunches
                                </SidebarLink>
                            </li>
                        </ul>
                    </li>
                </ul>
                <p className="menu-label">Settings</p>
                <ul className="menu-list">
                    <li>
                        <SidebarLink linkedId="settings-page">
                            Settings Page
                        </SidebarLink>
                    </li>
                    <li>
                        <SidebarLink linkedId="configuring-your-classes">
                            Configuring Your Classes
                        </SidebarLink>
                        <ul>
                            <li>
                                <SidebarLink linkedId="setting-class-info">
                                    Setting Class Info
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink linkedId="configuring-login-information">
                                    Configuring Login Information
                                </SidebarLink>
                                <ul>
                                    <li>
                                        <SidebarLink linkedId="no-login">
                                            No Login
                                        </SidebarLink>
                                    </li>
                                    <li>
                                        <SidebarLink linkedId="automatic-login-mode">
                                            Automatic Login Mode
                                        </SidebarLink>
                                    </li>
                                    <li>
                                        <SidebarLink linkedId="manual-login-mode">
                                            Manual Login Mode
                                        </SidebarLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <SidebarLink linkedId="configuring-flex-meetings">
                            Configuring Flex Meetings
                        </SidebarLink>
                        <SidebarLink linkedId="motivational-phrases">
                            Motivational Phrases
                        </SidebarLink>
                    </li>
                </ul>
                <p className="menu-label">Other Info</p>
                <ul className="menu-list">
                    <li>
                        <SidebarLink linkedId="contact-me">
                            Contact Me
                        </SidebarLink>
                    </li>
                </ul>
            </aside>
        </MenuContext.Provider>
    );
}
