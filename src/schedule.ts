export interface Block {
    name: string;
    blockType:
        | 'a'
        | 'b'
        | 'c'
        | 'd'
        | 'e'
        | 'f'
        | 'g'
        | 'flex'
        | 'lunch'
        | 'community';
    startTime: string;
    endTime: string;
    isLunch: boolean;
    async: boolean;
    length: string;
    blockNumber: number;
}

export interface ScheduleWeek {
    monday: Block[];
    tuesday: Block[];
    wednesday: Block[];
    thursday: Block[];
    friday: Block[];
}

export interface LunchBlock {
    name: string;
    startTime: string;
    endTime: string;
    length: string;
}

export const LunchBlocks: LunchBlock[] = [
    {
        name: '1st Lunch',
        startTime: '10:45',
        endTime: '11:20',
        length: '35 minutes',
    },
    {
        name: '2nd Lunch',
        startTime: '11:30',
        endTime: '12:05',
        length: '35 minutes',
    },
    {
        name: '3rd Lunch',
        startTime: '12:20',
        endTime: '12:55',
        length: '35 minutes',
    },
];

export const Schedule: Record<string, ScheduleWeek> = {
    week1: {
        monday: [
            {
                name: 'A Block',
                blockType: 'a',
                startTime: '9:15',
                endTime: '10:35',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'B Block',
                blockType: 'b',
                startTime: '10:45',
                endTime: '12:55',
                isLunch: true,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'C Block',
                blockType: 'c',
                startTime: '1:05',
                endTime: '2:25',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'D Block',
                blockType: 'd',
                startTime: '2:35',
                endTime: '3:55',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
        ],
        tuesday: [
            {
                name: 'E Block',
                blockType: 'e',
                startTime: '9:15',
                endTime: '10:35',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'F Block',
                blockType: 'f',
                startTime: '10:45',
                endTime: '12:55',
                isLunch: true,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'G Block',
                blockType: 'g',
                startTime: '1:05',
                endTime: '2:25',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'Community',
                blockType: 'community',
                startTime: '2:35',
                endTime: '3:05',
                isLunch: false,
                async: false,
                length: '30 minutes',
                blockNumber: 1,
            },
            {
                name: 'Flex Block',
                blockType: 'flex',
                startTime: '3:10',
                endTime: '3:55',
                isLunch: false,
                async: false,
                length: '45 minutes',
                blockNumber: 1,
            },
        ],
        wednesday: [
            {
                name: 'A Block',
                blockType: 'a',
                startTime: '9:15',
                endTime: '9:50',
                isLunch: false,
                async: false,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'B Block',
                blockType: 'b',
                startTime: '9:55',
                endTime: '10:30',
                isLunch: false,
                async: false,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'C Block',
                blockType: 'c',
                startTime: '10:35',
                endTime: '11:10',
                isLunch: false,
                async: false,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'Flex',
                blockType: 'flex',
                startTime: '11:15',
                endTime: '12:05',
                isLunch: false,
                async: false,
                length: '50 minutes',
                blockNumber: 2,
            },
            {
                name: 'Lunch',
                blockType: 'lunch',
                startTime: '12:05',
                endTime: '12:40',
                isLunch: false,
                async: false,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'D Block',
                blockType: 'd',
                startTime: '12:40',
                endTime: '1:15',
                isLunch: false,
                async: true,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'E Block',
                blockType: 'e',
                startTime: '1:20',
                endTime: '1:55',
                isLunch: false,
                async: true,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'F Block',
                blockType: 'f',
                startTime: '2:00',
                endTime: '2:35',
                isLunch: false,
                async: true,
                length: '25 minutes',
                blockNumber: 2,
            },
            {
                name: 'G Block',
                blockType: 'g',
                startTime: '2:40',
                endTime: '3:15',
                isLunch: false,
                async: true,
                length: '35 minutes',
                blockNumber: 2,
            },
        ],
        thursday: [
            {
                name: 'A Block',
                blockType: 'a',
                startTime: '9:15',
                endTime: '10:35',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'B Block',
                blockType: 'b',
                startTime: '10:45',
                endTime: '12:55',
                isLunch: true,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'C Block',
                blockType: 'c',
                startTime: '1:05',
                endTime: '2:25',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'D Block',
                blockType: 'd',
                startTime: '2:35',
                endTime: '3:55',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
        ],
        friday: [
            {
                name: 'E Block',
                blockType: 'e',
                startTime: '9:15',
                endTime: '10:35',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'F Block',
                blockType: 'f',
                startTime: '10:45',
                endTime: '12:55',
                isLunch: true,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'G Block',
                blockType: 'g',
                startTime: '1:05',
                endTime: '2:25',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'Flex Block',
                blockType: 'flex',
                startTime: '2:35',
                endTime: '3:55',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
        ],
    },
    week2: {
        monday: [
            {
                name: 'A Block',
                blockType: 'a',
                startTime: '9:15',
                endTime: '10:35',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'B Block',
                blockType: 'b',
                startTime: '10:45',
                endTime: '12:55',
                isLunch: true,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'C Block',
                blockType: 'c',
                startTime: '1:05',
                endTime: '2:25',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'D Block',
                blockType: 'd',
                startTime: '2:35',
                endTime: '3:55',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
        ],
        tuesday: [
            {
                name: 'E Block',
                blockType: 'e',
                startTime: '9:15',
                endTime: '10:35',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'F Block',
                blockType: 'f',
                startTime: '10:45',
                endTime: '12:55',
                isLunch: true,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'G Block',
                blockType: 'g',
                startTime: '1:05',
                endTime: '2:25',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 1,
            },
            {
                name: 'Community',
                blockType: 'community',
                startTime: '2:35',
                endTime: '3:05',
                isLunch: false,
                async: false,
                length: '30 minutes',
                blockNumber: 1,
            },
            {
                name: 'Flex Block',
                blockType: 'flex',
                startTime: '3:10',
                endTime: '3:55',
                isLunch: false,
                async: false,
                length: '45 minutes',
                blockNumber: 1,
            },
        ],
        wednesday: [
            {
                name: 'A Block',
                blockType: 'a',
                startTime: '9:15',
                endTime: '9:50',
                isLunch: false,
                async: true,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'B Block',
                blockType: 'b',
                startTime: '9:55',
                endTime: '10:30',
                isLunch: false,
                async: true,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'C Block',
                blockType: 'c',
                startTime: '10:35',
                endTime: '11:10',
                isLunch: false,
                async: true,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'Flex',
                blockType: 'flex',
                startTime: '11:15',
                endTime: '12:05',
                isLunch: false,
                async: false,
                length: '50 minutes',
                blockNumber: 2,
            },
            {
                name: 'Lunch',
                blockType: 'lunch',
                startTime: '12:05',
                endTime: '12:40',
                isLunch: false,
                async: false,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'D Block',
                blockType: 'd',
                startTime: '12:40',
                endTime: '1:15',
                isLunch: false,
                async: false,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'E Block',
                blockType: 'e',
                startTime: '1:20',
                endTime: '1:55',
                isLunch: false,
                async: false,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'F Block',
                blockType: 'f',
                startTime: '2:00',
                endTime: '2:35',
                isLunch: false,
                async: false,
                length: '35 minutes',
                blockNumber: 2,
            },
            {
                name: 'G Block',
                blockType: 'g',
                startTime: '2:40',
                endTime: '3:15',
                isLunch: false,
                async: false,
                length: '35 minutes',
                blockNumber: 2,
            },
        ],
        thursday: [
            {
                name: 'A Block',
                blockType: 'a',
                startTime: '9:15',
                endTime: '10:35',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'B Block',
                blockType: 'b',
                startTime: '10:45',
                endTime: '12:55',
                isLunch: true,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'C Block',
                blockType: 'c',
                startTime: '1:05',
                endTime: '2:25',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'D Block',
                blockType: 'd',
                startTime: '2:35',
                endTime: '3:55',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
        ],
        friday: [
            {
                name: 'E Block',
                blockType: 'e',
                startTime: '9:15',
                endTime: '10:35',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'F Block',
                blockType: 'f',
                startTime: '10:45',
                endTime: '12:55',
                isLunch: true,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'G Block',
                blockType: 'g',
                startTime: '1:05',
                endTime: '2:25',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
            {
                name: 'Flex Block',
                blockType: 'flex',
                startTime: '2:35',
                endTime: '3:55',
                isLunch: false,
                async: false,
                length: '80 minutes',
                blockNumber: 3,
            },
        ],
    },
};

export function getWeek(weekNum?: number): ScheduleWeek {
    switch (weekNum) {
        case 0:
            return Schedule.week1;
        case 1:
            return Schedule.week2;
        default:
            return Schedule.week1;
    }
}

export function getDay(week?: ScheduleWeek, day?: number): Block[] {
    if (!week || !day) return [];

    switch (day) {
        case 0:
            return [];
        case 1:
            return week.monday;
        case 2:
            return week.tuesday;
        case 3:
            return week.wednesday;
        case 4:
            return week.thursday;
        case 5:
            return week.friday;
        case 6:
            return [];
        default:
            return [];
    }
}
