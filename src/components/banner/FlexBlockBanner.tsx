import { formatDistance } from 'date-fns';
import React from 'react';
import { Block } from '../../schedule';
import { useAppState } from '../../state/AppStateContext';
import {
    FlexBlockInPersonSettings,
    FlexSettings,
} from '../../state/SettingsContext';
import { todayFromTimeString } from '../../utils';
import { useDialog } from '../dialog/Dialog';
import { FlexBlockDialogCard } from '../dialog/FlexBlockDialogCard';

export function FlexBlockBanner({
    isNow,
    block,
    flexSettings,
    inPerson,
    flexBlockInPersonSettings,
}: {
    isNow: boolean;
    block: Block;
    flexSettings: Record<string, FlexSettings>;
    inPerson: boolean;
    flexBlockInPersonSettings?: FlexBlockInPersonSettings;
}) {
    const dialogState = useDialog();
    const appState = useAppState();

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

    const now = new Date(appState.value.lastUpdateTime || 0);

    const classStartTime =
        todayFromTimeString(now, block.startTime) || new Date(0);

    const differenceString = formatDistance(classStartTime, now, {
        addSuffix: true,
        includeSeconds: false,
    });

    // Get time to next block
    let remainingString;

    const blockEndTime = todayFromTimeString(now, block.endTime) || new Date(0);

    const timeToNextString = formatDistance(blockEndTime, now, {
        includeSeconds: false,
    });

    remainingString = `This block ends in ${timeToNextString}.`;

    return (
        <section className="hero is-medium is-bold is-primary">
            <div className="hero-head">
                <div className="pl-4 pt-3">
                    <h3 className="subtitle is-3 is-italic">
                        {isNow ? 'Now' : `Coming Up ${differenceString}`}
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
                            {isNow &&
                            remainingString &&
                            remainingString.length > 0 ? (
                                <h2 className="subtitle">{remainingString}</h2>
                            ) : null}
                            {inPerson &&
                            flexBlockInPersonSettings &&
                            flexBlockInPersonSettings.flexClassroomNumber &&
                            flexBlockInPersonSettings.flexClassroomNumber
                                .length > 0 ? (
                                <h2 className="subtitle">
                                    Room{' '}
                                    {
                                        flexBlockInPersonSettings.flexClassroomNumber
                                    }
                                </h2>
                            ) : null}
                        </div>
                    </div>
                    <div className="level-right is-flex is-flex-direction-column is-justify-content-center">
                        <button
                            type="button"
                            className="button is-black is-large is-rounded is-fullwidth"
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
