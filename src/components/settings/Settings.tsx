import React from 'react';
import { IoAdd, IoApps, IoSave } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { useAppState } from '../../state/AppStateContext';

import { useSettings } from '../../state/SettingsContext';
import { AdditionalMeetingsSettingsCard } from './AdditionalMeetingsSettingsCard';
import { BlockSettingsCard } from './BlockSettingsCard';
import { FlexBlockInPersonSettings } from './FlexBlockInPersonSettings';
import { FlexSettingsCard } from './FlexSettingsCard';
import { LunchButtons } from './LunchButtons';

import { MainSettings } from './MainSettings';
import { NotificationSettings } from './NotificationSettings';
import { ResetButtons } from './ResetButtons';
import { SerializationSettings } from './SerializationSettings';

export function Settings() {
    const settings = useSettings();
    const appState = useAppState();

    React.useEffect(() => {
        if (!appState.value.hasViewedSettings) {
            appState.setAppStateDirect({ hasViewedSettings: true });
        }
    }, [appState]);

    const newFlex = () => {
        const flexCount = Object.keys(settings.value.flexSettings).length;
        let id = uuidv4();

        // Create unique ID
        while (settings.value.flexSettings[id] !== undefined) {
            id = uuidv4();
        }

        settings.setSettings((settings) => {
            return {
                ...settings,
                flexSettings: {
                    ...settings.flexSettings,
                    [id]: {
                        id,
                        nickname: `Flex Meeting ${flexCount + 1}`,
                    },
                },
            };
        });
    };

    const newAdditionalMeeting = () => {
        const additionalMeetingsCount = Object.keys(
            settings.value.additionalMeetings,
        ).length;
        let id = uuidv4();

        // Create unique ID
        while (settings.value.additionalMeetings[id] !== undefined) {
            id = uuidv4();
        }

        settings.setSettings((settings) => {
            return {
                ...settings,
                additionalMeetings: {
                    ...settings.additionalMeetings,
                    [id]: {
                        id,
                        nickname: `Additional Meeting ${
                            additionalMeetingsCount + 1
                        }`,
                    },
                },
            };
        });
    };

    const flexMeetings = Object.keys(settings.value.flexSettings).map((id) => {
        return (
            <FlexSettingsCard flexSettingId={id} key={`flexmeeting-${id}`} />
        );
    });

    const additionalMeetings = Object.keys(
        settings.value.additionalMeetings,
    ).map((id) => {
        return (
            <AdditionalMeetingsSettingsCard
                additionalSettingId={id}
                key={`additionalmeeting-${id}`}
            />
        );
    });

    return (
        <div className="container px-3 my-3">
            {settings.value.ready ? (
                <React.Fragment>
                    <div className="level">
                        <div className="level-left">
                            <h1 className="title">Settings</h1>
                        </div>
                        <div className="level-right">
                            <Link
                                to="/"
                                className="button is-link is-rounded is-medium is-fullwidth"
                            >
                                <span className="icon mr-1">
                                    <IoSave className="is-size-4" />
                                </span>
                                Save Settings
                            </Link>
                        </div>
                    </div>

                    <MainSettings />
                    <br />
                    <NotificationSettings />

                    <div className="divider mb-2">Lunches</div>
                    <LunchButtons />

                    <div className="divider mb-2">Class Blocks</div>
                    <p className="is-size-5 px-3 mb-4">
                        Click on a class card to open it.
                    </p>
                    <BlockSettingsCard blockType="a" isOpenDefault />
                    <BlockSettingsCard blockType="b" />
                    <BlockSettingsCard blockType="c" />
                    <BlockSettingsCard blockType="d" />
                    <BlockSettingsCard blockType="e" />
                    <BlockSettingsCard blockType="f" />
                    <BlockSettingsCard blockType="g" />
                    <BlockSettingsCard blockType="community" />
                    <div className="divider">Flex Block</div>
                    {settings.value.inPerson ? (
                        <React.Fragment>
                            <FlexBlockInPersonSettings />
                            <br />
                        </React.Fragment>
                    ) : null}
                    {flexMeetings}
                    <button
                        type="button"
                        className="button is-fullwidth is-rounded is-link"
                        onClick={newFlex}
                    >
                        <span className="icon mr-1">
                            <IoAdd />
                        </span>
                        Add New Flex Meeting
                    </button>

                    <div className="divider">Additional Meetings</div>
                    <p className="is-size-5 px-3 mb-4">
                        Use Additional Meetings to keep track of your non-school
                        meetings.
                    </p>
                    <p className="is-size-5 px-3 mb-4">
                        Press the{' '}
                        <span className="icon">
                            <IoApps />
                        </span>{' '}
                        icon in the header in the header to view your Additional
                        Meetings.
                    </p>
                    {additionalMeetings}
                    <button
                        type="button"
                        className="button is-fullwidth is-rounded is-link"
                        onClick={newAdditionalMeeting}
                    >
                        <span className="icon mr-1">
                            <IoAdd />
                        </span>
                        Add New Additional Meeting
                    </button>

                    <div className="divider">Download/Upload Settings</div>
                    <SerializationSettings />
                    <div className="divider">Reset</div>
                    <ResetButtons />
                    <div className="divider">Save Settings</div>
                    <Link
                        to="/"
                        className="button is-link is-rounded is-medium is-fullwidth"
                    >
                        <span className="icon mr-1">
                            <IoSave className="is-size-4" />
                        </span>
                        Save Settings
                    </Link>
                </React.Fragment>
            ) : (
                <h1 className="has-text-centered">Loading...</h1>
            )}
        </div>
    );
}
