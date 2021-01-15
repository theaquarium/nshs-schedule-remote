import React from 'react';
import { Block, LunchBlocks } from '../../schedule';
import { FlexSettings } from '../../state/SettingsContext';
import { copyTextToClipboard, generateZoomLink } from '../../utils';
import { useDialog } from '../dialog/Dialog';
import { FlexBlockDialogCard } from '../dialog/FlexBlockDialogCard';

export function FlexScheduleCard({
    block,
    flexSettings,
    isActive,
    isPast,
}: {
    block: Block;
    flexSettings: Record<string, FlexSettings>;
    isActive: boolean;
    isPast?: boolean;
}) {
    const dialogState = useDialog();

    const openLinksDialog = () => {
        const flexLinks = Object.values(flexSettings).map((setting) => {
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

    if (isActive) {
        cardColor = '#2a9fd6';
    } else if (isPast) {
        cardColor = '#2a2a2a';
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
                                Flex Block
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
                        </div>
                    </div>
                    <div className="level-right">
                        <button
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
