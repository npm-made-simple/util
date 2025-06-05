const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Get the name of the month from the month number.
 * 
 * ```ts
 * import { date } from "@made-simple/util";
 * console.log(date.getMonthName(2)); // February
 * ```
 */
export function getMonthName(month: number): string {
    return months[month];
}

/**
 * Get the name of the month from a date object.
 * Alias for `getMonthName(date.getMonth())`.
 * 
 * ```ts
 * import { date } from "@made-simple/util";
 * const date = new Date();
 * console.log(date.getMonthFromDate(date));
 * ```
 */
export function getMonthFromDate(date: Date): string {
    return getMonthName(date.getMonth());
}

/**
 * Get the name of the month from a timestamp.
 * Alias for `getMonthFromDate(new Date(timestamp))`.
 * 
 * ```ts
 * import { date } from "@made-simple/util";
 * const timestamp = Date.now();
 * console.log(date.getMonthFromTimestamp(timestamp));
 * ```
 */
export function getMonthFromTimestamp(timestamp: number): string {
    return getMonthFromDate(new Date(timestamp));
}

/**
 * Convert milliseconds to a human-readable string.
 * 
 * ```ts
 * import { date } from "@made-simple/util";
 * console.log(date.toString(1000)); // 1 second
 * console.log(date.toString(75 * 1000)) // 1 minute and 15 seconds
 * console.log(date.toString(3600 * 1000)); // 1 hour
 * console.log(date.toString(35824637 * 1000)) // 1 year and 1 month
 * console.log(date.toString(35824637 * 1000, 3)) // 1 year, 1 month, and 18 days
 * ```
 */
export function toString(ms: number, parts: number = 2): string {
    if (parts < 1) parts = 2;

    let second = Math.floor(ms / 1000);
    if (!second) return "0 seconds";

    const month = Math.floor(second / 2592000);
    second -= month * 2592000;

    const day = Math.floor(second / 86400);
    second -= day * 86400;

    const hour = Math.floor(second / 3600);
    second -= hour * 3600;

    const minute = Math.floor(second / 60);
    second -= minute * 60;

    let usedParts = 0;
    const storedParts: string[] = [];
    for (const [unit, value] of Object.entries({ month, day, hour, minute, second })) {
        if (value === 0 && usedParts === 0) continue;
        if (usedParts === parts) break;
        usedParts++;

        storedParts.push(`${value} ${unit}${value === 1 ? "" : "s"}`);
    }

    if (parts === 1) return storedParts[0];
    else if (parts === 2) return `${storedParts[0]}${storedParts[1] ? ` and ${storedParts[1]}` : ""}`;
    else return `${storedParts.slice(0, -1).join(", ")}, and ${storedParts.slice(-1)}`;
}

export default {
    getMonthName,
    getMonthFromDate,
    getMonthFromTimestamp,
    toString
}
