import React from 'react';
import { Block, LunchBlocks } from '../../schedule';
import { BlockSettings, useSettings } from '../../state/SettingsContext';
import { generateLoginLink } from '../../utils';
import { useDialog } from '../dialog/Dialog';
import { MeetingInfoDialog } from '../dialog/MeetingInfoDialog';

export function ScheduleCard({
    block,
    blockSettings,
    isActive,
    activeLunchBlock,
    isPast,
    inPerson,
}: {
    block: Block;
    blockSettings: BlockSettings;
    isActive: boolean;
    activeLunchBlock?: number;
    isPast?: boolean;
    inPerson: boolean;
}) {
    const dialogState = useDialog();
    const settings = useSettings();

    const loginInfo = blockSettings?.newLogin || {
        storeLoginInfo: false,
        link: '',
        password: '',
    };

    const loginLink = generateLoginLink(loginInfo, settings.value.useHttpLinks);

    const openPasswordDialog = () => {
        dialogState.open(<MeetingInfoDialog loginInfo={loginInfo} />);
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
                {blockSettings?.hasClass ? (
                    <React.Fragment>
                        <div className="level">
                            <div className="level-left">
                                <div className="is-flex is-flex-direction-column is-justify-content-center">
                                    <p
                                        className={`title ${
                                            isPast ? 'has-text-grey' : ''
                                        }`}
                                    >
                                        {block.name}
                                        {blockSettings.nickname ? (
                                            <span className="is-italic">
                                                &nbsp;(
                                                {blockSettings.nickname})
                                            </span>
                                        ) : null}
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
                                    blockSettings?.classroomNumber &&
                                    blockSettings.classroomNumber.length > 0 ? (
                                        <p
                                            className={`subtitle ${
                                                isPast ? 'has-text-grey' : ''
                                            }`}
                                        >
                                            Room {blockSettings.classroomNumber}
                                            {blockSettings.deskNumber ? (
                                                <span className="is-italic">
                                                    {' '}
                                                    - Desk{' '}
                                                    {blockSettings.deskNumber}
                                                </span>
                                            ) : null}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                            {loginInfo.storeLoginInfo &&
                            loginLink.length > 0 &&
                            !block.async ? (
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
                        {block.isLunch ? (
                            <div className="columns">
                                <div className="column">
                                    <div
                                        className="notification"
                                        style={{
                                            background:
                                                activeLunchBlock === 0
                                                    ? settings.value.theme ===
                                                      'dark'
                                                        ? '#237fa9'
                                                        : '#00ab90'
                                                    : cardColor,
                                        }}
                                    >
                                        <p className="has-text-weight-bold">
                                            {LunchBlocks[0].name}
                                        </p>
                                        <p>
                                            {LunchBlocks[0].startTime}-
                                            {LunchBlocks[0].endTime}
                                            <span className="is-italic">
                                                &nbsp;({LunchBlocks[0].length})
                                            </span>
                                        </p>
                                        {settings.value.lunches[
                                            block.blockType
                                        ] === 0 ? (
                                            <p>
                                                <br />
                                                This is your lunch.
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="column">
                                    <div
                                        className="notification"
                                        style={{
                                            background:
                                                activeLunchBlock === 1
                                                    ? settings.value.theme ===
                                                      'dark'
                                                        ? '#237fa9'
                                                        : '#00ab90'
                                                    : cardColor,
                                        }}
                                    >
                                        <p className="has-text-weight-bold">
                                            {LunchBlocks[1].name}
                                        </p>
                                        <p>
                                            {LunchBlocks[1].startTime}-
                                            {LunchBlocks[1].endTime}
                                            <span className="is-italic">
                                                &nbsp;({LunchBlocks[1].length})
                                            </span>
                                        </p>
                                        {settings.value.lunches[
                                            block.blockType
                                        ] === 1 ? (
                                            <p>
                                                <br />
                                                This is your lunch.
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="column">
                                    <div
                                        className="notification"
                                        style={{
                                            background:
                                                activeLunchBlock === 2
                                                    ? settings.value.theme ===
                                                      'dark'
                                                        ? '#237fa9'
                                                        : '#00ab90'
                                                    : cardColor,
                                        }}
                                    >
                                        <p className="has-text-weight-bold">
                                            {LunchBlocks[2].name}
                                        </p>
                                        <p>
                                            {LunchBlocks[2].startTime}-
                                            {LunchBlocks[2].endTime}
                                            <span className="is-italic">
                                                &nbsp;({LunchBlocks[2].length})
                                            </span>
                                        </p>
                                        {settings.value.lunches[
                                            block.blockType
                                        ] === 2 ? (
                                            <p>
                                                <br />
                                                This is your lunch.
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <p className={`title ${isPast ? 'has-text-grey' : ''}`}>
                            {block.name}
                            <span className="is-italic">&nbsp;(No Class)</span>
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
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
