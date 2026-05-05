export function getTimeUntilDate(dateString) {
    const endDate = new Date(dateString);
    const now = new Date();

    const difference = endDate - now;

    if (difference <= 0) {
        return 'Ended';
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
}
