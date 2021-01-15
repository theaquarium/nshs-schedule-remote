import React from 'react';
import { Block } from '../../schedule';
import { FlexSettings } from '../../state/SettingsContext';
import { useDialog } from '../dialog/Dialog';
import { FlexBlockDialogCard } from '../dialog/FlexBlockDialogCard';

export function FlexBlockBanner({
    isNow,
    block,
    flexSettings,
}: {
    isNow: boolean;
    block: Block;
    flexSettings: Record<string, FlexSettings>;
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
                        ? 'No Flex Block links set up yet.'
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

    return (
        <section className="hero is-medium is-bold is-primary">
            <div className="hero-head">
                <div className="pl-4 pt-3">
                    <h3 className="subtitle is-3 is-italic">
                        {isNow ? 'Now' : 'Coming Up'}
                    </h3>
                </div>
            </div>
            <div className="hero-body">
                <div className="container level">
                    <div className="level-left">
                        <div className="is-flex is-flex-direction-column is-justify-content-center">
                            <h1 className="title">{block.name}</h1>
                            <h2 className="subtitle">
                                {block.startTime}-{block.endTime}
                                <span className="is-italic">
                                    &nbsp;({block.length})
                                </span>
                            </h2>
                        </div>
                    </div>
                    <div className="level-right is-flex is-flex-direction-column is-justify-content-center">
                        <button
                            className="button is-link is-large is-rounded is-fullwidth"
                            onClick={openLinksDialog}
                        >
                            Show Links
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
