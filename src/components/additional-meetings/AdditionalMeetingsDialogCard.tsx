import React from 'react';
import { AdditionalMeetingSettings } from '../../state/SettingsContext';
import {
    copyTextToClipboard,
    generateNormalLink,
    generateZoomLink,
} from '../../utils';
import { useDialog } from '../dialog/Dialog';

export function AdditionalMeetingsDialogCard({
    setting,
}: {
    setting: AdditionalMeetingSettings;
}) {
    const dialogState = useDialog();

    let loginLink: string | undefined;
    let password: string | undefined;
    let normalLink: string | undefined;

    if (
        setting.login?.automatic &&
        setting.login.automatic.meetingId.length > 0
    ) {
        loginLink = generateZoomLink(setting.login.automatic);
        password = setting.login.automatic.password;
        normalLink = generateNormalLink(setting.login.automatic);
    } else if (setting?.login?.manual) {
        loginLink = setting.login.manual.link;
        password = setting.login.manual.password;
        normalLink = setting.login.manual.link;
    }

    const openPasswordDialog = () => {
        dialogState.open(
            <div className="modal-content">
                <div className="card">
                    <div className="card-content">
                        <label className="label">Password</label>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input
                                    className="input is-rounded is-family-monospace"
                                    type="text"
                                    value={password}
                                    placeholder={'Password'}
                                    readOnly
                                />
                            </div>
                            <div className="control">
                                <button
                                    type="button"
                                    className="button is-link is-rounded"
                                    onClick={() => {
                                        copyTextToClipboard(password || '');
                                        dialogState.close();
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <label className="label">Zoom Link</label>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input
                                    className="input is-rounded is-family-monospace"
                                    type="text"
                                    value={normalLink}
                                    placeholder={'Zoom Link'}
                                    readOnly
                                />
                            </div>
                            <div className="control">
                                <a
                                    className="button is-black is-rounded"
                                    href={normalLink}
                                    onClick={() => {
                                        dialogState.close();
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Join
                                </a>
                            </div>
                            <div className="control">
                                <button
                                    type="button"
                                    className="button is-link is-rounded"
                                    onClick={() => {
                                        copyTextToClipboard(normalLink || '');
                                        dialogState.close();
                                    }}
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
        );
    };

    return (
        <div className="card my-4">
            <div className="card-content">
                <div className="level">
                    <div className="level-left">
                        <div className="is-flex is-flex-direction-column is-justify-content-center">
                            <p className="title">{setting.nickname}</p>
                        </div>
                    </div>
                    {loginLink ? (
                        <div className="level-right">
                            <div className="is-flex is-flex-direction-column is-justify-content-center">
                                <a
                                    className="button is-black is-medium is-rounded is-fullwidth my-1"
                                    href={loginLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Join
                                </a>
                                {password ? (
                                    <button
                                        type="button"
                                        className="button is-link is-normal is-rounded is-fullwidth my-1"
                                        onClick={openPasswordDialog}
                                    >
                                        Meeting Info
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}