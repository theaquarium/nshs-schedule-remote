import React from 'react';

import { useRouteMatch } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { useSettings } from '../../state/SettingsContext';
import { ScheduleCard } from './ScheduleCard';

import { getWeek, getDay } from '../../schedule';
import { weekdayNameToNum, weekdayNumToName } from '../../utils';
import { FlexScheduleCard } from './FlexScheduleCard';

export function ScheduleCards() {
    const appState = useAppState();
    const settings = useSettings();

    const routeMatch = useRouteMatch<{ weeknum: string; weekday: string }>(
        '/:weeknum/:weekday',
    );

    const weeknum = routeMatch?.params?.weeknum === 'w1' ? 0 : 1;
    const weekday = weekdayNameToNum(routeMatch?.params?.weekday);
    const scheduleWeek = getWeek(weeknum);
    const day = getDay(scheduleWeek, weekday);

    if (!day) {
        return <h1 className="title has-text-centered">No classes today.</h1>;
    }

    // Don't render blocks as past if it's not on today's page
    let isPast =
        weekday === appState.value.weekday &&
        weeknum === appState.value.weekNum;

    const cards = day.map((block) => {
        let blockSettings = settings.value.blockSettings[block.blockType];

        // Set block settings to default just in case settings are corrupted
        if (blockSettings === undefined) blockSettings = { hasClass: true };

        if (
            block.blockType === appState.value.activeBlock ||
            block.blockType === appState.value.nextBlock
        ) {
            isPast = false;
        }

        const dayName = weekdayNumToName(weekday);
        const inPerson =
            settings.value.inPerson &&
            appState.value.weekNum !== undefined &&
            dayName !== undefined &&
            settings.value.inPersonDays[appState.value.weekNum]?.[dayName];

        if (block.blockType === 'flex') {
            return (
                <FlexScheduleCard
                    key={`${weekday}-${block.blockType}`}
                    block={block}
                    flexSettings={settings.value.flexSettings}
                    isActive={
                        block.blockType === appState.value.activeBlock &&
                        weeknum === appState.value.weekNum &&
                        weekday === appState.value.weekday
                    }
                    isPast={isPast}
                    inPerson={inPerson}
                    flexBlockInPersonSettings={
                        settings.value.flexBlockInPersonSettings
                    }
                />
            );
        }

        return (
            <ScheduleCard
                key={`${weekday}-${block.blockType}`}
                block={block}
                blockSettings={blockSettings}
                isActive={
                    block.blockType === appState.value.activeBlock &&
                    weeknum === appState.value.weekNum &&
                    weekday === appState.value.weekday
                }
                activeLunchBlock={
                    // Don't show active lunch block on other days
                    weekday === appState.value.weekday
                        ? appState.value.activeLunch
                        : -1
                }
                isPast={isPast}
                inPerson={inPerson}
            />
        );
    });

    return <React.Fragment>{cards}</React.Fragment>;
}
