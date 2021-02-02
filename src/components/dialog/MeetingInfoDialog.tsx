import React from 'react';
import { LoginSettings } from '../../state/SettingsContext';
import { copyTextToClipboard } from '../../utils';
import { useDialog } from './Dialog';

export function MeetingInfoDialog({ loginInfo }: { loginInfo: LoginSettings }) {
    const dialogState = useDialog();

    return (
        <div className="modal-content">
            <div className="card">
                <div className="card-content">
                    {loginInfo.password && loginInfo.password.length > 0 ? (
                        <React.Fragment>
                            <label className="label">Password</label>
                            <div className="field has-addons">
                                <div className="control is-expanded">
                                    <input
                                        className="input is-rounded is-family-monospace"
                                        type="text"
                                        value={loginInfo.password}
                                        placeholder="Password"
                                        readOnly
                                    />
                                </div>
                                <div className="control">
                                    <button
                                        type="button"
                                        className="button is-link is-rounded"
                                        onClick={() => {
                                            copyTextToClipboard(
                                                loginInfo.password || '',
                                            );
                                            dialogState.close();
                                        }}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : null}

                    <label className="label">Zoom Link</label>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input
                                className="input is-rounded is-family-monospace"
                                type="text"
                                value={loginInfo.link}
                                placeholder="Zoom Link"
                                readOnly
                            />
                        </div>
                        <div className="control">
                            <a
                                className="button is-black is-rounded"
                                href={loginInfo.link}
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
                                    copyTextToClipboard(loginInfo.link || '');
                                    dialogState.close();
                                }}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
