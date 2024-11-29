export default function diffDate( date ) {
    const second = 1000;
    const minute = 60*second;
    const hour = 60*minute;
    const day = 24*hour;
    const year = 365*day

    const diff = new Date() - new Date(date);

    if (diff > year) {
        return `${Math.trunc(diff/year)}y`;
    }

    if (diff > day) {
        return `${Math.trunc(diff/day)}d`;
    }

    if (diff > hour) {
        return `${Math.trunc(diff/hour)}h`;
    }

    if (diff > minute) {
        return `${Math.trunc(diff/minute)}m`;
    }

    if (diff > second) {
        return `${Math.trunc(diff/second)}s`;
    }

    return '0s';
}
