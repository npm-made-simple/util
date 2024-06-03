import { Dirent, readdirSync } from "node:fs";

const activeRegex = /^[^_].+\.js$/;
const activeFolderRegex = /^[^_]/;

/**
 * Checks if a file is considered active based on its name.
 * This is used to filter out files that are not meant to be exported.
 * Files starting with an underscore are considered inactive.
 * 
 * ```ts
 * import { dirent } from "@made-simple/util";
 * dirent.isActive(new Dirent("example.js")); // ["example.js"]
 * dirent.isActive(new Dirent("_example.js")); // false
 * ```
 */
export function isActive(file: Dirent): false | RegExpMatchArray | null {
    return (file.isFile() && file.name.match(activeRegex)) || (file.isDirectory() && file.name.match(activeFolderRegex));
}

/**
 * Iterates over all files in a directory and its subdirectories recursively.
 * The callback function is called with the data from each file exported as default.
 * 
 * ```ts
 * import { dirent } from "@made-simple/util";
 * dirent.iterate(new URL("./example", import.meta.url), data => {
 *    console.log(data);
 * });
 * ```
 */
export function iterate<T>(url: URL, callback: (data: T) => void): void {
    const files = readdirSync(url, { withFileTypes: true });
    files.forEach(async file => {
        if (file.isDirectory() && isActive(file)) {
            const subURL = new URL(file.name, url);
            iterate(subURL, callback);
        } else if (file.isFile() && isActive(file)) {
            const data: T = (await import(`${url}/${file.name}`)).default;
            callback(data);
        }
    });
}

export default {
    iterate,
    isActive
}
