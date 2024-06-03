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

export default {
    getMonthName,
    getMonthFromDate,
    getMonthFromTimestamp
}
