import React, { ChangeEvent } from 'react';
import { IoCloudDownload, IoCloudUpload } from 'react-icons/io5';
import { saveAs } from 'file-saver';

import {
    defaultState as defaultSettings,
    useSettings,
} from '../../state/SettingsContext';
import { useHistory } from 'react-router-dom';

export function SerializationSettings() {
    const settings = useSettings();

    const history = useHistory();

    const uploadSettings = async (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        const files = target.files;
        if (files === null) return;

        const file = files[0];
        if (file === undefined) return;

        const fileText = await file.text();
        try {
            const settingsJSON = JSON.parse(fileText);

            const result = window.confirm(
                'Are you sure you would like to overwrite your current settings with the ones in this file?',
            );
            if (result) {
                settings.setSettingsDirect({
                    ...defaultSettings,
                    ...settingsJSON,
                });
                history.replace('/');
            }
        } catch (err) {
            alert('An error occurred while reading the settings file.');
            console.error('Settings parse error:', err);
        }
    };

    const saveSettings = () => {
        const settingsString = JSON.stringify(settings.value);
        const settingsBlob = new Blob([settingsString], {
            type: 'application/json',
        });

        const now = new Date();

        saveAs(
            settingsBlob,
            `nshs-schedule-settings-${now.getFullYear()}-${
                now.getMonth() + 1
            }-${now.getDate()}.json`,
        );
    };

    return (
        <div>
            <p className="is-size-5 mb-5">
                Want to move your settings to a new device?
            </p>
            <div className="columns">
                <div className="column is-flex is-justify-content-center is-align-items-center">
                    <button
                        className="button is-link is-medium"
                        type="button"
                        onClick={saveSettings}
                    >
                        <span className="file-icon mr-2">
                            <IoCloudDownload />
                        </span>
                        Export Settings
                    </button>
                </div>
                <div className="column is-flex is-justify-content-center is-align-items-center">
                    <div
                        id="file-js-example"
                        className="file is-link is-medium"
                    >
                        <label className="file-label">
                            <input
                                className="file-input"
                                type="file"
                                name="resume"
                                onChange={uploadSettings}
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <IoCloudUpload />
                                </span>
                                <span className="file-label">
                                    Import Settings
                                </span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
