import React from 'react';

import { useAppState } from '../../state/AppStateContext';

import { NoClassBanner } from './NoClassBanner';
import { LoadingBanner } from './LoadingBanner';
import { ClassBanner } from './ClassBanner';
import { EndOfDayBanner } from './EndOfDayBanner';
import { FlexBlockBanner } from './FlexBlockBanner';

import { FlexSettings, useSettings } from '../../state/SettingsContext';
import { getDay, getWeek } from '../../schedule';
import { weekdayNumToName } from '../../utils';

export function Banner() {
    const appState = useAppState();
    const settings = useSettings();

    if (!appState.value.ready) {
        return <LoadingBanner />;
    } else {
        const weekday = appState.value.weekday;
        const scheduleWeek = getWeek(appState.value.weekNum);
        const day = getDay(scheduleWeek, weekday);

        let currentBlock;
        let isNow;

        // If the current block is none but there's a block coming up, show it as next
        if (appState.value.activeBlock === 'none') {
            if (appState.value.nextBlock === 'none') {
                return (
                    <EndOfDayBanner
                        isWeekend={
                            appState.value.weekday === 5 ||
                            appState.value.weekday === 6 ||
                            appState.value.weekday === 0
                        }
                    />
                );
            }

            currentBlock = day?.find(
                (block) => block.blockType === appState.value.nextBlock,
            );
            isNow = false;
        } else {
            currentBlock = day?.find(
                (block) => block.blockType === appState.value.activeBlock,
            );
            isNow = true;
        }

        if (currentBlock === undefined) return <LoadingBanner />;

        // Get current block settings

        if (currentBlock.blockType !== 'flex') {
            let currentBlockSettings =
                settings.value.blockSettings[currentBlock.blockType];

            // If settings are corrupted
            if (currentBlockSettings === undefined)
                currentBlockSettings = {
                    hasClass: true,
                };

            if (!currentBlockSettings.hasClass) {
                let nextClass;
                let blockOffset = 1;
                while (!nextClass) {
                    const nextBlock =
                        day[day.indexOf(currentBlock) + blockOffset++];

                    if (nextBlock === undefined) continue;

                    if (nextBlock.blockType === 'flex') nextClass = nextBlock;

                    const nextBlockSettings =
                        settings.value.blockSettings[nextBlock.blockType];

                    // If settings are corrupt
                    if (nextBlockSettings === undefined) continue;

                    if (nextBlockSettings.hasClass) nextClass = nextBlock;
                }

                return (
                    <NoClassBanner
                        block={currentBlock}
                        isNow={isNow}
                        nextClassStart={nextClass?.startTime}
                    />
                );
            } else {
                const dayName = weekdayNumToName(appState.value.weekday);
                const inPerson =
                    settings.value.inPerson &&
                    appState.value.weekNum !== undefined &&
                    dayName !== undefined &&
                    settings.value.inPersonDays[appState.value.weekNum]?.[
                        dayName
                    ];
                return (
                    <ClassBanner
                        isNow={isNow}
                        block={currentBlock}
                        blockSettings={currentBlockSettings}
                        activeLunchBlock={appState.value.activeLunch}
                        inPerson={inPerson}
                    />
                );
            }
        } else {
            let flexSettings = settings.value.flexSettings;

            // If settings are corrupted
            if (flexSettings === undefined)
                flexSettings = {} as Record<string, FlexSettings>;

            const dayName = weekdayNumToName(appState.value.weekday);
            const inPerson =
                settings.value.inPerson &&
                appState.value.weekNum !== undefined &&
                dayName !== undefined &&
                settings.value.inPersonDays[appState.value.weekNum]?.[dayName];

            return (
                <FlexBlockBanner
                    isNow={isNow}
                    block={currentBlock}
                    flexSettings={flexSettings}
                    inPerson={inPerson}
                    flexBlockInPersonSettings={
                        settings.value.flexBlockInPersonSettings
                    }
                />
            );
        }
    }
}
