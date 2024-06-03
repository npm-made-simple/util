/**
 * Pauses the current thread for a specified amount of time.
 * This is synchronous but will yield.
 * 
 * ```ts
 * import { thread } from "@made-simple/util";
 * thread.sleep(1000); // Sleep for 1 second
 * ```
 */
export function sleep(ms: number): number {
    const start = new Date().getTime();
    let completed = false;

    new Promise(resolve => setTimeout(resolve, ms)).finally(() => {
        completed = true;
    });

    while (!completed) continue;
    const end = new Date().getTime();
    return end - start;
}

/**
 * Pauses the current thread for a specified amount of time.
 * This is asynchronous and resolves a promise.
 * 
 * ```ts
 * import { thread } from "@made-simple/util";
 * await thread.sleepAsync(1000); // Sleep for 1 second
 * ```
 */
export function sleepAsync(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(() => resolve(ms), ms));
}

export default {
    sleep,
    sleepAsync
}
