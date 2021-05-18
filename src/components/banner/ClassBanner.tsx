import React from 'react';
import { Block, getDay, getWeek, LunchBlock } from '../../schedule';
import { BlockSettings, useSettings } from '../../state/SettingsContext';
import { generateLoginLink, todayFromTimeString } from '../../utils';
import { useDialog } from '../dialog/Dialog';

import { formatDistance } from 'date-fns';
import { useAppState } from '../../state/AppStateContext';
import { MeetingInfoDialog } from '../dialog/MeetingInfoDialog';

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
    const appState = useAppState();

    const loginInfo = blockSettings?.newLogin || {
        storeLoginInfo: false,
        link: '',
        password: '',
    };

    const loginLink = generateLoginLink(loginInfo, settings.value.useHttpLinks);

    const openPasswordDialog = () => {
        dialogState.open(<MeetingInfoDialog loginInfo={loginInfo} />);
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

    if (block.blockType === 'lunch') {
        if (appState.value.nextBlock && appState.value.nextBlock !== 'none') {
            const weekday = appState.value.weekday;
            const scheduleWeek = getWeek(
                appState.value.weekNum,
                appState.value.isMCASTime,
                appState.value.yearWeekNumber,
            );
            const day = getDay(scheduleWeek, weekday);

            const nextBlock = day?.find(
                (block) => block.blockType === appState.value.nextBlock,
            );

            if (nextBlock) {
                const nextClassStartTime =
                    todayFromTimeString(now, nextBlock.startTime) ||
                    new Date(0);

                const timeToNextString = formatDistance(
                    nextClassStartTime,
                    now,
                    {
                        includeSeconds: false,
                    },
                );

                remainingString = `Your next block starts in ${timeToNextString}.`;
            }
        }
    } else if (block.isLunch && block.lunchBlocks) {
        // Check that it's lunch and lunch blocks are configured properly
        const blockLunchSetting = settings.value.lunches[block.blockType];

        const calcRemaining = (block: Block | LunchBlock): string => {
            const nextClassStartTime =
                todayFromTimeString(now, block.endTime) || new Date(0);

            return formatDistance(nextClassStartTime, now, {
                includeSeconds: false,
            });
        };

        if (blockLunchSetting !== -1) {
            if (blockLunchSetting === 0) {
                if (activeLunchBlock === 0) {
                    remainingString = `Your lunch ends in ${calcRemaining(
                        block.lunchBlocks?.[0],
                    )}.`;
                } else {
                    remainingString = `This block ends in ${calcRemaining(
                        block,
                    )}.`;
                }
            } else if (blockLunchSetting === 1) {
                if (activeLunchBlock === 0) {
                    remainingString = `You have lunch in ${calcRemaining(
                        block.lunchBlocks?.[0],
                    )}.`;
                } else if (activeLunchBlock === 1) {
                    remainingString = `Your lunch ends in ${calcRemaining(
                        block.lunchBlocks?.[1],
                    )}.`;
                } else {
                    remainingString = `This block ends in ${calcRemaining(
                        block,
                    )}.`;
                }
            } else if (blockLunchSetting === 2) {
                if (activeLunchBlock === 2) {
                    remainingString = `Your lunch ends in ${calcRemaining(
                        block,
                    )}.`;
                } else {
                    remainingString = `You have lunch in ${calcRemaining(
                        block.lunchBlocks?.[1],
                    )}.`;
                }
            }
        } else {
            remainingString = `This block ends in ${calcRemaining(block)}.`;
        }
    } else {
        const blockEndTime =
            todayFromTimeString(now, block.endTime) || new Date(0);

        const timeToNextString = formatDistance(blockEndTime, now, {
            includeSeconds: false,
        });

        remainingString = `This block ends in ${timeToNextString}.`;
    }

    return (
        <section className="hero is-medium is-bold is-primary">
            <div className="hero-head">
                <div className="pl-4 pt-3">
                    <h3 className="subtitle is-3 is-italic">
                        {isNow ? 'Now' : `Coming Up ${differenceString}`}
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
                            {isNow &&
                            remainingString &&
                            remainingString.length > 0 ? (
                                <h2 className="subtitle">{remainingString}</h2>
                            ) : null}
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
                    {loginInfo.storeLoginInfo &&
                    loginLink.length > 0 &&
                    !block.async ? (
                        <div className="level-right is-flex is-flex-direction-column is-justify-content-center">
                            <a
                                className="button is-black is-large is-rounded is-fullwidth my-1"
                                href={loginLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Join
                            </a>
                            <button
                                type="button"
                                className="button is-link is-medium is-rounded is-fullwidth my-1"
                                onClick={openPasswordDialog}
                            >
                                Meeting Info
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="hero-foot">
                {block.isLunch ? (
                    <div className="container mb-5 px-4">
                        <div className="columns">
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
                                        {block.lunchBlocks?.[0].name}
                                    </p>
                                    <p>
                                        {block.lunchBlocks?.[0].startTime}-
                                        {block.lunchBlocks?.[0].endTime}
                                        <span className="is-italic">
                                            &nbsp;(
                                            {block.lunchBlocks?.[0].length})
                                        </span>
                                    </p>
                                    {settings.value.lunches[block.blockType] ===
                                    0 ? (
                                        <p>
                                            <br />
                                            This is your lunch.
                                        </p>
                                    ) : null}
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
                                        {block.lunchBlocks?.[1].name}
                                    </p>
                                    <p>
                                        {block.lunchBlocks?.[1].startTime}-
                                        {block.lunchBlocks?.[1].endTime}
                                        <span className="is-italic">
                                            &nbsp;(
                                            {block.lunchBlocks?.[1].length})
                                        </span>
                                    </p>
                                    {settings.value.lunches[block.blockType] ===
                                    1 ? (
                                        <p>
                                            <br />
                                            This is your lunch.
                                        </p>
                                    ) : null}
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
                                        {block.lunchBlocks?.[2].name}
                                    </p>
                                    <p>
                                        {block.lunchBlocks?.[2].startTime}-
                                        {block.lunchBlocks?.[2].endTime}
                                        <span className="is-italic">
                                            &nbsp;(
                                            {block.lunchBlocks?.[2].length})
                                        </span>
                                    </p>
                                    {settings.value.lunches[block.blockType] ===
                                    2 ? (
                                        <p>
                                            <br />
                                            This is your lunch.
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
