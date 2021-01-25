import React from 'react';
import { Block, LunchBlocks } from '../../schedule';
import { BlockSettings, useSettings } from '../../state/SettingsContext';
import {
    copyTextToClipboard,
    generateNormalLink,
    generateZoomLink,
} from '../../utils';
import { useDialog } from '../dialog/Dialog';

export function ClassBanner({
    isNow,
    block,
    blockSettings,
    activeLunchBlock,
    inPerson,
}: {
    isNow: boolean;
    block: Block;
    blockSettings?: BlockSettings;
    activeLunchBlock?: number;
    inPerson: boolean;
}) {
    const dialogState = useDialog();
    const settings = useSettings();

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
        <section className="hero is-medium is-bold is-primary">
            <div className="hero-head">
                <div className="pl-4 pt-3">
                    <h3 className="subtitle is-3 is-italic">
                        {isNow ? 'Now' : 'Coming Up'}
                    </h3>
                </div>
            </div>
            <div
                className="hero-body"
                style={block.isLunch ? { paddingBottom: '3rem' } : {}}
            >
                <div className="container level">
                    <div className="level-left">
                        <div className="is-flex is-flex-direction-column is-justify-content-center">
                            <h1 className="title">
                                {block.name}
                                {block.async ? ' Async' : ''}
                                {blockSettings?.nickname ? (
                                    <span className="is-italic">
                                        &nbsp;({blockSettings.nickname})
                                    </span>
                                ) : null}
                            </h1>
                            <h2 className="subtitle">
                                {block.startTime}-{block.endTime}
                                <span className="is-italic">
                                    &nbsp;({block.length})
                                </span>
                            </h2>
                            {inPerson &&
                            blockSettings?.classroomNumber &&
                            blockSettings.classroomNumber.length > 0 ? (
                                <h2 className="subtitle">
                                    Room {blockSettings.classroomNumber}
                                    {blockSettings.deskNumber ? (
                                        <span className="is-italic">
                                            {' '}
                                            - Desk {blockSettings.deskNumber}
                                        </span>
                                    ) : null}
                                </h2>
                            ) : null}
                        </div>
                    </div>
                    {loginLink && !block.async ? (
                        <div className="level-right is-flex is-flex-direction-column is-justify-content-center">
                            <a
                                className="button is-black is-large is-rounded is-fullwidth my-1"
                                href={loginLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join
                            </a>
                            {password ? (
                                <button
                                    type="button"
                                    className="button is-link is-medium is-rounded is-fullwidth my-1"
                                    onClick={openPasswordDialog}
                                >
                                    Meeting Info
                                </button>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="hero-foot">
                {block.isLunch ? (
                    <div className="container mb-5 px-4">
                        <div className="columns is-vcentered">
                            <div className="column">
                                <div
                                    className={
                                        'notification' +
                                        (settings.value.theme === 'light'
                                            ? ' has-text-dark'
                                            : '')
                                    }
                                    style={
                                        activeLunchBlock === 0
                                            ? {
                                                  background:
                                                      settings.value.theme ===
                                                      'dark'
                                                          ? '#237fa9'
                                                          : '#00ab90',
                                              }
                                            : {}
                                    }
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
                                    className={
                                        'notification' +
                                        (settings.value.theme === 'light'
                                            ? ' has-text-dark'
                                            : '')
                                    }
                                    style={
                                        activeLunchBlock === 1
                                            ? {
                                                  background:
                                                      settings.value.theme ===
                                                      'dark'
                                                          ? '#237fa9'
                                                          : '#00ab90',
                                              }
                                            : {}
                                    }
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
                                    className={
                                        'notification' +
                                        (settings.value.theme === 'light'
                                            ? ' has-text-dark'
                                            : '')
                                    }
                                    style={
                                        activeLunchBlock === 2
                                            ? {
                                                  background:
                                                      settings.value.theme ===
                                                      'dark'
                                                          ? '#237fa9'
                                                          : '#00ab90',
                                              }
                                            : {}
                                    }
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
                    </div>
                ) : null}
            </div>
        </section>
    );
}
