import React from 'react';
import { Block, LunchBlocks } from '../../schedule';
import { BlockSettings } from '../../state/SettingsContext';
import {
    copyTextToClipboard,
    generateNormalLink,
    generateZoomLink,
} from '../../utils';
import { useDialog } from '../dialog/Dialog';

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

    let loginLink: string | undefined;
    let password: string | undefined;
    let normalLink: string | undefined;

    if (
        blockSettings?.login?.automatic &&
        blockSettings.login.automatic.meetingId.length > 0
    ) {
        loginLink = generateZoomLink(blockSettings.login.automatic);
        password = blockSettings.login.automatic.password;
        normalLink = generateNormalLink(blockSettings.login.automatic);
    } else if (blockSettings?.login?.manual) {
        loginLink = blockSettings.login.manual.link;
        password = blockSettings.login.manual.password;
        normalLink = blockSettings.login.manual.link;
    }

    let cardColor;

    if (isActive) {
        cardColor = '#2a9fd6';
    } else if (isPast) {
        cardColor = '#2a2a2a';
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
                                        {block.async ? ' Async' : ''}
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
                            {loginLink && !block.async ? (
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
                        {block.isLunch ? (
                            <div className="columns is-vcentered">
                                <div className="column">
                                    <div
                                        className="notification"
                                        style={{
                                            background:
                                                activeLunchBlock === 0
                                                    ? '#237fa9'
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
                                    </div>
                                </div>
                                <div className="column">
                                    <div
                                        className="notification"
                                        style={{
                                            background:
                                                activeLunchBlock === 1
                                                    ? '#237fa9'
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
                                    </div>
                                </div>
                                <div className="column">
                                    <div
                                        className="notification"
                                        style={{
                                            background:
                                                activeLunchBlock === 2
                                                    ? '#237fa9'
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
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <p className={`title ${isPast ? 'has-text-grey' : ''}`}>
                            {block.name}
                            {block.async ? ' Async' : ''}
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
