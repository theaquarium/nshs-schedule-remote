import React from 'react';
import './Help.css';

import { SidebarLink } from './SidebarLink';

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
    const [activeElement, setActiveElement] = React.useState(
        'accessing-this-page',
    );
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

                setTimeout(() => {
                    // Scroll to menu item
                    const aside = document.getElementsByClassName(
                        'sticky-aside',
                    )[0];

                    const element = topElement
                        ? document.getElementById(`link-to-${topElement.id}`)
                        : null;

                    if (element && aside) {
                        aside.scrollTop = element.offsetTop;
                    }
                }, 500);
            }
        };

        // Run listener initially
        listener();

        window.addEventListener('scroll', listener);

        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, [elementList, setActiveElement]);

    return (
        <MenuContext.Provider value={contextValue}>
            <aside className="menu sticky-aside">
                <h1 className="title">Contents</h1>
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
                            <li>
                                <SidebarLink linkedId="joining-meetings">
                                    Joining Meetings
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
                        <SidebarLink linkedId="setting-up-hybrid">
                            Setting Up Hybrid
                        </SidebarLink>
                    </li>
                    <li>
                        <SidebarLink linkedId="configuring-flex-meetings">
                            Configuring Flex Meetings
                        </SidebarLink>
                    </li>
                    <li>
                        <SidebarLink linkedId="motivational-phrases">
                            Motivational Phrases
                        </SidebarLink>
                    </li>
                    <li>
                        <SidebarLink linkedId="download-upload-settings">
                            Download/Upload Settings
                        </SidebarLink>
                    </li>
                    <li>
                        <SidebarLink linkedId="resetting">
                            Resetting
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
