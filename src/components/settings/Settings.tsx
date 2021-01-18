import React from 'react';
import { IoAdd } from 'react-icons/io5';

import { v4 as uuidv4 } from 'uuid';

import { useSettings } from '../../state/SettingsContext';
import { BlockSettingsCard } from './BlockSettingsCard';
import { FlexSettingsCard } from './FlexSettingsCard';

import { MainSettings } from './MainSettings';
import { ResetButtons } from './ResetButtons';
import { SerializationSettings } from './SerializationSettings';

export function Settings() {
    const settings = useSettings();

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

    const flexMeetings = Object.keys(settings.value.flexSettings).map((id) => {
        return (
            <FlexSettingsCard flexSettingId={id} key={`flexmeeting-${id}`} />
        );
    });

    return (
        <div className="container px-3 my-3">
            {settings.value.ready ? (
                <React.Fragment>
                    <h1 className="title">Settings</h1>
                    <MainSettings />
                    <div className="divider">Reset</div>
                    <ResetButtons />
                    <div className="divider">Save/Load Settings</div>
                    <SerializationSettings />
                    <div className="divider">Class Blocks</div>
                    <BlockSettingsCard blockType="a" />
                    <BlockSettingsCard blockType="b" />
                    <BlockSettingsCard blockType="c" />
                    <BlockSettingsCard blockType="d" />
                    <BlockSettingsCard blockType="e" />
                    <BlockSettingsCard blockType="f" />
                    <BlockSettingsCard blockType="g" />
                    <BlockSettingsCard blockType="community" />
                    <div className="divider">Flex Block</div>
                    {flexMeetings}
                    <button
                        className="button is-fullwidth is-rounded is-link"
                        onClick={newFlex}
                    >
                        <span className="icon mr-1">
                            <IoAdd />
                        </span>
                        Add New Flex Meeting
                    </button>
                </React.Fragment>
            ) : (
                <h1 className="has-text-centered">Loading...</h1>
            )}
        </div>
    );
}
