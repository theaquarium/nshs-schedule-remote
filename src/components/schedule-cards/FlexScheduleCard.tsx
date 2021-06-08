import React from 'react';
import { Block } from '../../schedule';
import {
    FlexBlockInPersonSettings,
    FlexSettings,
    useSettings,
} from '../../state/SettingsContext';
import { useDialog } from '../dialog/Dialog';
import { FlexBlockDialogCard } from '../dialog/FlexBlockDialogCard';

export function FlexScheduleCard({
    block,
    flexSettings,
    isActive,
    isPast,
    inPerson,
    flexBlockInPersonSettings,
}: {
    block: Block;
    flexSettings: Record<string, FlexSettings>;
    isActive: boolean;
    isPast?: boolean;
    inPerson: boolean;
    flexBlockInPersonSettings?: FlexBlockInPersonSettings;
}) {
    const dialogState = useDialog();
    const settings = useSettings();

    const openLinksDialog = () => {
        const flexLinks = Object.values(flexSettings).map((setting) => {
            let availableThisBlock;

            switch (block.blockNumber) {
                case 1:
                    availableThisBlock =
                        setting.availability?.flex1 !== undefined
                            ? setting.availability.flex1
                            : true;
                    break;
                case 2:
                    availableThisBlock =
                        setting.availability?.flex2 !== undefined
                            ? setting.availability.flex2
                            : true;
                    break;
                case 3:
                    availableThisBlock =
                        setting.availability?.flex3 !== undefined
                            ? setting.availability.flex3
                            : true;
                    break;
                default:
                    availableThisBlock = true;
                    break;
            }

            if (!availableThisBlock)
                return (
                    <div className="card my-4" key={setting.id}>
                        <div className="card-content">
                            <div className="level">
                                <div className="level-left">
                                    <div className="is-flex is-flex-direction-column is-justify-content-center">
                                        <p className="title">
                                            {setting.nickname}
                                        </p>
                                        <p className="subtitle">
                                            Does not meet today.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            return <FlexBlockDialogCard key={setting.id} setting={setting} />;
        });

        dialogState.open(
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Flex Block Links</p>
                    <button
                        type="button"
                        className="delete"
                        aria-label="close"
                        onClick={dialogState.close}
                    ></button>
                </header>
                <section className="modal-card-body">
                    {flexLinks.length === 0
                        ? 'No Flex Block links set up yet. You can add Flex meetings in the Settings tab.'
                        : flexLinks}
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

    let cardColor;

    if (settings.value.theme === 'dark') {
        if (isActive) {
            cardColor = '#2a9fd6';
        } else if (isPast) {
            cardColor = '#2a2a2a';
        }
    } else {
        if (isActive) {
            cardColor = '#00D1B2';
        } else if (isPast) {
            cardColor = '#d7d7d7';
        }
    }

    return (
        <div
            className={`card my-4 ${isPast ? 'has-text-grey' : ''}`}
            style={{ background: cardColor }}
        >
            <div className="card-content">
                <div className="level">
                    <div className="level-left">
                        <div className="is-flex is-flex-direction-column is-justify-content-center">
                            <p
                                className={`title ${
                                    isPast ? 'has-text-grey' : ''
                                }`}
                            >
                                {block.name}
                            </p>
                            <p
                                className={`subtitle ${
                                    isPast ? 'has-text-grey' : ''
                                }`}
                            >
                                {block.startTime}-{block.endTime}
                                <span className="is-italic">
                                    &nbsp;({block.length})
                                </span>
                            </p>
                            {inPerson &&
                            flexBlockInPersonSettings?.flexClassroomNumber &&
                            flexBlockInPersonSettings.flexClassroomNumber
                                .length > 0 ? (
                                <p
                                    className={`subtitle ${
                                        isPast ? 'has-text-grey' : ''
                                    }`}
                                >
                                    Room{' '}
                                    {
                                        flexBlockInPersonSettings.flexClassroomNumber
                                    }
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="level-right">
                        <button
                            type="button"
                            className="button is-black is-medium is-rounded is-fullwidth"
                            onClick={openLinksDialog}
                        >
                            Show Links
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
