//1080 -> 18:00


export function convertMinutesToHourString(minutesAmont: number) {
    const hours = Math.floor(minutesAmont / 60);
    const minutes = minutesAmont % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}