import React from 'react';
import {
    AdditionalMeetingSettings,
    useSettings,
} from '../../state/SettingsContext';
import { generateLoginLink } from '../../utils';
import { useDialog } from './Dialog';
import { MeetingInfoDialog } from './MeetingInfoDialog';

export function AdditionalMeetingsDialogCard({
    setting,
}: {
    setting: AdditionalMeetingSettings;
}) {
    const dialogState = useDialog();
    const settings = useSettings();

    const loginInfo = setting.newLogin || {
        storeLoginInfo: false,
        link: '',
        password: '',
    };

    const loginLink = generateLoginLink(loginInfo, settings.value.useHttpLinks);

    const openPasswordDialog = () => {
        dialogState.open(<MeetingInfoDialog loginInfo={loginInfo} />);
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
                    {loginInfo.storeLoginInfo && loginLink.length > 0 ? (
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
                                <button
                                    type="button"
                                    className="button is-link is-normal is-rounded is-fullwidth my-1"
                                    onClick={openPasswordDialog}
                                >
                                    Meeting Info
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
