import React from 'react';
import { AppStateType, useAppState } from './AppStateContext';
import { getCurrentWeekNumber, isVacationDay } from '../NPSSchedule';

import {
    getDay,
    isBefore,
    isAfter,
    isWeekend,
    isEqual,
    getWeek,
} from 'date-fns';

import { useHistory, useLocation } from 'react-router-dom';

import {
    getWeek as getScheduleWeek,
    getDay as getScheduleDay,
    LunchBlock,
    Block,
} from '../schedule';
import { todayFromTimeString } from '../utils';
import { useSettings } from './SettingsContext';
import { isMCASTime } from '../MCASSchedule';

export function AppStateUpdater(props: any) {
    const setAppState = useAppState().setAppState;
    const history = useHistory();
    const location = useLocation();
    const settings = useSettings();

    const debugStartTime = React.useRef(Date.now());

    // Create updater effect
    React.useEffect(() => {
        // Update function
        const update = () => {
            let shouldUpdateURL = false;
            let shouldNotify = false;
            let newBlock: Block | undefined;
            let shouldNotifyLunch = false;
            let newLunch: LunchBlock | undefined;
            let useAlternatingWeeks: boolean = true;

            // Run the actual update
            setAppState((appState: AppStateType) => {
                // Update app state
                let now: Date;

                // Debug mode allows you to start the clock at a certain time
                const debug = true;
                if (!debug) {
                    now = new Date();
                } else {
                    const startDate = new Date(
                        2021,
                        5,
                        7,
                        14,
                        50,
                        30,
                    ).getTime();

                    const timeSinceStart = Date.now() - debugStartTime.current;

                    now = new Date(startDate + timeSinceStart);

                    console.log(
                        `App state updating now with time: ${now.toString()}`,
                    );
                    console.log(`Current week is year week ${getWeek(now)}`);
                }

                const stateChanges: Partial<AppStateType> = {
                    ...appState,
                    ready: true,
                    lastUpdateTime: now.getTime(),
                };

                // MCAS
                const isMCAS = isMCASTime(now);
                if (isMCAS !== stateChanges.isMCASTime) {
                    stateChanges.isMCASTime = isMCAS;
                }

                // Special Schedules
                stateChanges.yearWeekNumber = getWeek(now);
                stateChanges.useAlternatingWeeks =
                    stateChanges.yearWeekNumber < 21; // New schedule doesn't have alternating weeks anymore
                useAlternatingWeeks = stateChanges.useAlternatingWeeks;

                // Update weekday
                const weekdayNum = getDay(now);

                // Update week number
                const weekNum = getCurrentWeekNumber(now);

                if (
                    weekdayNum !== stateChanges.weekday ||
                    weekNum !== stateChanges.weekNum
                ) {
                    stateChanges.weekday = weekdayNum;
                    stateChanges.weekNum = weekNum;

                    // Yeah, it's impure, I know
                    // Impurity is better than performance hit imo
                    shouldUpdateURL = true;
                }

                // Set if there's school today
                // If there's supposed to be or was school before
                const shouldBeSchool = (stateChanges.hasSchoolToday =
                    !isVacationDay(now) &&
                    !isWeekend(now) &&
                    stateChanges.weekNum !== -1);
                if (stateChanges.hasSchoolToday !== shouldBeSchool) {
                    stateChanges.hasSchoolToday = shouldBeSchool;

                    shouldUpdateURL = true;
                }

                // Old Manual Week Updating
                // const startLastUpdate = startOfWeek(lastUpdate);
                // const startNow = startOfWeek(now);
                // const weekDiff = differenceInWeeks(startNow, startLastUpdate);
                // if (stateChanges.weekNum === undefined) {
                //     // Set last update to 0 (1970), so it'll show as a guess
                //     stateChanges.lastWeekSetTime = 0;
                //     stateChanges.weekNum = 0;
                // } else {
                //     stateChanges.weekNum =
                //         (stateChanges.weekNum + weekDiff) % 2;
                // }

                // Update active block
                const scheduleWeek = getScheduleWeek(
                    stateChanges.weekNum,
                    stateChanges.isMCASTime,
                    stateChanges.yearWeekNumber,
                );
                const scheduleDay = getScheduleDay(
                    scheduleWeek,
                    stateChanges.weekday,
                );

                const currentBlock = scheduleDay.find((block) => {
                    const startTime = todayFromTimeString(now, block.startTime);
                    const endTime = todayFromTimeString(now, block.endTime);

                    // If either is malformed, skip
                    if (!startTime || !endTime) return false;

                    return (
                        (isBefore(startTime, now) || isEqual(startTime, now)) &&
                        isAfter(endTime, now)
                    );
                });

                if (currentBlock) {
                    // Send notification if new class block found
                    if (
                        stateChanges.hasSchoolToday &&
                        stateChanges.activeBlock !== currentBlock.blockType
                    ) {
                        shouldNotify = true;
                        newBlock = currentBlock;
                    }

                    stateChanges.activeBlock = currentBlock.blockType;
                } else {
                    stateChanges.activeBlock = 'none';
                }

                // Find next block
                let nextBlock = 'none';
                for (let i = 0; i < scheduleDay.length; i++) {
                    const block = scheduleDay[i];

                    const startTime = todayFromTimeString(now, block.startTime);
                    const endTime = todayFromTimeString(now, block.endTime);

                    // If either is malformed, skip
                    if (!startTime || !endTime) continue;

                    if (isAfter(startTime, now)) {
                        nextBlock = block.blockType;
                        break;
                    }
                }
                stateChanges.nextBlock = nextBlock;

                // Find active lunch block (or set to -1 if not lunch)
                const activeLunchBlock = currentBlock?.lunchBlocks?.find(
                    (block) => {
                        const startTime = todayFromTimeString(
                            now,
                            block.startTime,
                        );
                        const endTime = todayFromTimeString(now, block.endTime);

                        // If either is malformed, skip
                        if (!startTime || !endTime) return false;

                        return (
                            (isBefore(startTime, now) ||
                                isEqual(startTime, now)) &&
                            isAfter(endTime, now)
                        );
                    },
                );
                const activeLunch =
                    activeLunchBlock === undefined ||
                    currentBlock?.isLunch !== true
                        ? -1
                        : activeLunchBlock.lunchId;

                if (
                    stateChanges.hasSchoolToday &&
                    activeLunch !== -1 &&
                    activeLunchBlock &&
                    currentBlock &&
                    activeLunch !== stateChanges.activeLunch
                ) {
                    shouldNotifyLunch = true;
                    newLunch = activeLunchBlock;
                    newBlock = currentBlock;
                }

                stateChanges.activeLunch = activeLunch;

                return stateChanges;
            });

            if (settings.value.notificationsEnabled) {
                if (shouldNotify && newBlock) {
                    let lunchStr = '';

                    if (newBlock.isLunch) {
                        switch (settings.value.lunches[newBlock.blockType]) {
                            case 0:
                                lunchStr = '1st Lunch';
                                break;
                            case 1:
                                lunchStr = '2nd Lunch';
                                break;
                            case 2:
                                lunchStr = '3rd Lunch';
                                break;
                        }
                    }

                    new Notification(`${newBlock.name} Starting Now`, {
                        body: `(${newBlock.startTime}-${newBlock.endTime})${
                            lunchStr !== '' ? `\nYou have ${lunchStr}.` : ''
                        }`,
                        icon: '/favicons/notification-icon-192x192.png',
                    });
                } else if (
                    shouldNotifyLunch &&
                    newLunch &&
                    newBlock &&
                    settings.value.sendLunchNotifications
                ) {
                    new Notification(`${newLunch.name} Starting Now`, {
                        body: `(${newLunch.startTime}-${newLunch.endTime})${
                            settings.value.lunches[newBlock.blockType] ===
                            newLunch.lunchId
                                ? '\nThis is your lunch.'
                                : ''
                        }`,
                        icon: '/favicons/notification-icon-192x192.png',
                    });
                }
            }

            // Redirect to page if on homepage
            const goRegex = /^\/(?:(?:w1|w2)\/(?:monday|tuesday|wednesday|thursday|friday)\/?)?$/;
            const goRegexNoWeekNum = /^\/(?:(?:monday|tuesday|wednesday|thursday|friday)\/?)?$/;

            const isOnSchedulePage = useAlternatingWeeks
                ? goRegex.test(location.pathname)
                : goRegexNoWeekNum.test(location.pathname);

            if (shouldUpdateURL && isOnSchedulePage) {
                history.replace('/');
            }
        };

        // Initial update on load
        setTimeout(update, 1000);

        const interval = setInterval(update, 15 * 1000);

        return () => clearInterval(interval);
    }, [
        history,
        location,
        setAppState,
        settings.value.notificationsEnabled,
        settings.value.sendLunchNotifications,
        settings.value.lunches,
    ]);

    return <React.Fragment>{props.children}</React.Fragment>;
}
