import { getWeek, isSameDay, isSaturday } from 'date-fns';

console.log(
    'First week 1, Jan 4 2021 is Week #' + getWeek(new Date(2021, 0, 4)),
);

// 0: Week 1
// 1: Week 2
// -2: No School (Now used through VacationDays)

export const WeekNumbers: Record<number, Record<number, number>> = {
    2021: {
        2: 0, // Week of Jan 4th 2021
        3: 1,
        4: 0,
        5: 1,
        6: 0,
        7: 1,
        // 8: -2,
        9: 0,
        10: 1,
        11: 0,
        12: 1,
        13: 0,
        14: 1,
        15: 0,
        16: 1,
        17: 0,
        // 18: -2,
        19: 1,
        20: 0,
        21: 1,
        22: 0,
        23: 1,
        24: 0,
        25: 1,
        26: 0,
        27: 1,
        // 28: -2,
    },
};

export const VacationDays = [
    new Date(2021, 1, 15), // February Break
    new Date(2021, 1, 16),
    new Date(2021, 1, 17),
    new Date(2021, 1, 18),
    new Date(2021, 1, 19),
    new Date(2021, 2, 24),
    new Date(2021, 3, 2), // Good Friday
    new Date(2021, 3, 19), // April Break
    new Date(2021, 3, 20),
    new Date(2021, 3, 21),
    new Date(2021, 3, 22),
    new Date(2021, 3, 23),
    new Date(2021, 4, 31), // Memorial Day
    new Date(2021, 5, 21), // Final days of school (Remove as snow days happen)
    new Date(2021, 5, 22),
    new Date(2021, 5, 23),
    new Date(2021, 5, 24),
];

export function getCurrentWeekNumber(date: Date): number {
    const yearWeek = getWeek(date);
    const yearWeekList = WeekNumbers[date.getFullYear()];

    if (yearWeekList === undefined) return -1;

    const weekNum = isSaturday(date)
        ? yearWeekList[yearWeek + 1]
        : yearWeekList[yearWeek];
    if (weekNum === undefined) return -1;

    return weekNum;
}

export function isVacationDay(date: Date): boolean {
    return VacationDays.some((day) => isSameDay(day, date));
}
