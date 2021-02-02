import { LoginSettings } from './state/SettingsContext';

// export function generateZoomLink(loginInfo: AutomaticLogin): string {
//     const domain = loginInfo.inNewtonDomain
//         ? 'newton-k12-ma-us'
//         : loginInfo.customDomain || '';

//     return `zoommtg://${
//         domain.length > 0 ? `${domain}.` : ''
//     }zoom.us/join?confno=${loginInfo.meetingId}${
//         loginInfo.password !== undefined && loginInfo.password.length > 0
//             ? `&pwd=${loginInfo.password}`
//             : ''
//     }`;
// }

// export function generateNormalLink(loginInfo: AutomaticLogin): string {
//     const domain = loginInfo.inNewtonDomain
//         ? 'newton-k12-ma-us'
//         : loginInfo.customDomain || '';

//     return `https://${domain.length > 0 ? `${domain}.` : ''}zoom.us/j/${
//         loginInfo.meetingId
//     }`;
// }

export function todayFromTimeString(
    now: Date,
    timeString: string,
): Date | undefined {
    const [hour, minute] = timeString.split(':');

    if (hour && minute) {
        let parsedHour = parseInt(hour, 10);
        const parsedMinute = parseInt(minute, 10);

        if (!Number.isNaN(parsedHour) && !Number.isNaN(parsedMinute)) {
            // Account for PM (there are no classes before 8 am or after 8 pm)
            if (parsedHour < 8) parsedHour += 12;

            const date = new Date(now);
            date.setHours(parsedHour);
            date.setMinutes(parsedMinute);
            date.setSeconds(0);

            return date;
        }
        return;
    }
    return;
}

export function weekdayNameToNum(weekday?: string): number | undefined {
    switch (weekday) {
        case 'sunday':
            return 0;
        case 'monday':
            return 1;
        case 'tuesday':
            return 2;
        case 'wednesday':
            return 3;
        case 'thursday':
            return 4;
        case 'friday':
            return 5;
        case 'saturday':
            return 6;
        default:
            return;
    }
}

export function weekdayNumToName(weekday?: number): string | undefined {
    switch (weekday) {
        case 0:
            return 'monday';
        case 1:
            return 'monday';
        case 2:
            return 'tuesday';
        case 3:
            return 'wednesday';
        case 4:
            return 'thursday';
        case 5:
            return 'friday';
        case 6:
            return 'monday';
        default:
            return;
    }
}

// https://stackoverflow.com/a/30810322/8005366
function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

export function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(
        () => {
            console.log('Async: Copying to clipboard was successful!');
        },
        (err) => {
            console.error('Async: Could not copy text: ', err);
        },
    );
}

export function blockTypeToName(blockType: string): string {
    switch (blockType) {
        case 'a':
            return 'A Block';
        case 'b':
            return 'B Block';
        case 'c':
            return 'C Block';
        case 'd':
            return 'D Block';
        case 'e':
            return 'E Block';
        case 'f':
            return 'F Block';
        case 'g':
            return 'G Block';
        case 'community':
            return 'Community';
        default:
            return '';
    }
}

export const ZoomLinkRegex = /^https:\/\/(?:(.*?)\.)?zoom.us\/j\/([\d]{9,11})\/?\??(?:(?:.*?&)*?(?:pwd=([A-Za-z0-9]*))?(?:&.*?)*)?(?:#.*)?$/;

export function generateLoginLink(
    loginSettings: LoginSettings,
    useHttpLink: boolean,
): string {
    const linkMatches = loginSettings.link.match(ZoomLinkRegex);

    if (linkMatches === null || linkMatches.length === 0) return '';

    const domain = linkMatches[1];
    const meetingId = linkMatches[2];
    const password = linkMatches[3];

    if (meetingId === undefined) return '';

    if (useHttpLink) {
        return `https://${
            domain && domain.length > 0 ? `${domain}.` : ''
        }zoom.us/j/${meetingId}${
            password && password.length > 0 ? `?pwd=${password}` : ''
        }`;
    }

    return `zoommtg://${
        domain && domain.length > 0 ? `${domain}.` : ''
    }zoom.us/join?confno=${meetingId}${
        password && password.length > 0
            ? `&pwd=${password}`
            : loginSettings.password && loginSettings.password.length > 0
            ? `&pwd=${loginSettings.password}`
            : ''
    }`;
}
