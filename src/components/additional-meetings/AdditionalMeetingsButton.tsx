import React from 'react';
import { IoApps } from 'react-icons/io5';

import { useSettings } from '../../state/SettingsContext';
import { useDialog } from '../dialog/Dialog';
import { AdditionalMeetingsDialogCard } from './AdditionalMeetingsDialogCard';
export function AdditionalMeetingsButton() {
    const settings = useSettings();
    const dialogState = useDialog();

    const openLinksDialog = () => {
        const additionalMeetings = Object.values(
            settings.value.additionalMeetings,
        ).map((setting) => {
            return (
                <AdditionalMeetingsDialogCard
                    key={setting.id}
                    setting={setting}
                />
            );
        });

        dialogState.open(
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Additional Meetings</p>
                    <button
                        type="button"
                        className="delete"
                        aria-label="close"
                        onClick={dialogState.close}
                    ></button>
                </header>
                <section className="modal-card-body">
                    {additionalMeetings.length === 0 ? (
                        <p>
                            No Additional Meetings set up yet.
                            <br />
                            <br />
                            You can use Additional Meetings to keep track of
                            non-school meetings in the schedule.
                            <br />
                            Add Additional Meetings in the Settings tab.
                        </p>
                    ) : (
                        additionalMeetings
                    )}
                </section>
                <footer className="modal-card-foot">
                    <button
                        type="button"
                        className="button is-rounded"
                        aria-label="close"
                        onClick={dialogState.close}
                    >
                        Close
                    </button>
                </footer>
            </div>,
        );
    };

    return (
        <button
            title="Additional Meetings"
            type="button"
            className="button is-link is-outlined is-rounded is-medium is-fullwidth"
            onClick={openLinksDialog}
        >
            <span className="icon">
                <IoApps className="is-size-4" />
            </span>
        </button>
    );
}
