import React from 'react';
import { AppStateType, useAppState } from './AppStateContext';
import { getCurrentWeekNumber, isVacationDay } from '../NPSSchedule';

import { getDay, isBefore, isAfter, isWeekend } from 'date-fns';

import { useHistory, useLocation } from 'react-router-dom';

import {
    getWeek as getScheduleWeek,
    getDay as getScheduleDay,
    LunchBlocks,
} from '../schedule';
import { todayFromTimeString } from '../utils';

export function AppStateUpdater(props: any) {
    const setAppState = useAppState().setAppState;
    const history = useHistory();
    const location = useLocation();

    // Create updater effect
    React.useEffect(() => {
        // Update function
        const update = () => {
            let shouldUpdateURL = false;

            // Run the actual update
            setAppState((appState: AppStateType) => {
                // Update app state
                // const now = new Date(2021, 0, 25, 13, 25, 15);
                const now = new Date();

                const stateChanges: Partial<AppStateType> = {
                    ...appState,
                    ready: true,
                    lastUpdateTime: now.getTime(),
                };

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
                const scheduleWeek = getScheduleWeek(stateChanges.weekNum);
                const scheduleDay = getScheduleDay(
                    scheduleWeek,
                    stateChanges.weekday,
                );

                const currentBlock = scheduleDay.find((block) => {
                    const startTime = todayFromTimeString(now, block.startTime);
                    const endTime = todayFromTimeString(now, block.endTime);

                    // If either is malformed, skip
                    if (!startTime || !endTime) return false;

                    return isBefore(startTime, now) && isAfter(endTime, now);
                });

                if (currentBlock) {
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
                const activeLunchBlock = LunchBlocks.find((block) => {
                    const startTime = todayFromTimeString(now, block.startTime);
                    const endTime = todayFromTimeString(now, block.endTime);

                    // If either is malformed, skip
                    if (!startTime || !endTime) return false;

                    return isBefore(startTime, now) && isAfter(endTime, now);
                });
                const activeLunch =
                    activeLunchBlock === undefined
                        ? -1
                        : LunchBlocks.indexOf(activeLunchBlock);

                stateChanges.activeLunch = activeLunch;

                return stateChanges;
            });

            // Redirect to page if on homepage
            const goRegex = /^\/(?:(?:w1|w2)\/(?:monday|tuesday|wednesday|thursday|friday)\/?)?$/;

            if (shouldUpdateURL && goRegex.test(location.pathname)) {
                history.replace('/');
            }
        };

        // Initial update on load
        setTimeout(update, 1000);

        const interval = setInterval(update, 15 * 1000);

        return () => clearInterval(interval);
    }, [history, location, setAppState]);

    return <React.Fragment>{props.children}</React.Fragment>;
}
