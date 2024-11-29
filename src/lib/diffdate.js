export default function diffDate( date ) {
    const second = 1000;
    const minute = 60*second;
    const hour = 60*minute;
    const day = 24*hour;
    const year = 365*day

    const diff = new Date() - new Date(date) - 9*hour;

    if (diff > year) {
        return `${Math.trunc(diff/year)}y ago`;
    }

    if (diff > day) {
        return `${Math.trunc(diff/day)}d ago`;
    }

    if (diff > hour) {
        return `${Math.trunc(diff/hour)}h ago`;
    }

    if (diff > minute) {
        return `${Math.trunc(diff/minute)}m ago`;
    }

    return '1m ago';
}
